import { AxiosResponse } from "axios";
import { db } from "services/utils/indexedDbInitConfig";
import { mapper } from "models/RootStore";
import { useInjection } from "hooks";

export const MainDb = () => {
	const { mainStore } = useInjection(mapper);
	const dbName = "mainEvents";
	const commonUpdate = async (
		id: number,
		name: string,
		data: AxiosResponse["data"],
		groupLen: number
	) => {
		let index, len;
		const eventList = [],
			groupLength = groupLen;

		for (index = 0, len = data.length; index < len; index += groupLength) {
			eventList.push(data.slice(index, index + groupLength));
		}
		const isExist = await db.table(dbName).get(id);
		const groupBy = {
			name: name,
			items: { data: eventList, eventSize: Math.ceil(data.length / groupLen) },
		};

		const results = isExist
			? db.table(dbName).update(id, groupBy)
			: db.table(dbName).add({
					id: id,
					...groupBy,
			  });
		return await results;
	};

	const getRecommendEvent = ({ index }: { index: number }) => {
		db.transaction("rw", db.table(dbName), async () => {
			try {
				const call = await db.table(dbName).get(1);
				const response = await call.items;
				const currentIndexMoreThanTotalSize = index >= response.eventSize - 1;
				const indexMoreThanZero =
					mainStore.getData().recommendEvent && index > 0;

				return currentIndexMoreThanTotalSize
					? (mainStore.setMainIndex(0),
					  mainStore.setState("complete"),
					  getMyHospitalEvent({ index: 0 }),
					  mainStore.setShowMyHospitalEvent(true))
					: (() => {
							const originData = indexMoreThanZero
								? [...mainStore.getData().recommendEvent]
								: [];
							const result = [...originData, ...response.data[index]];

							mainStore.setResponse({
								...mainStore.getData(),
								...{
									recommendEvent: result,
								},
							});
					  })();
			} catch (e) {
				return mainStore.setState("complete");
			}
		});
	};

	const getMyHospitalEvent = ({ index }: { index: number }) => {
		db.transaction("rw", db.table(dbName), async () => {
			try {
				const call = await db.table(dbName).get(3);
				const response = await call.items;
				const originData = mainStore.getData().myHospitalEvent
					? [...mainStore.getData().myHospitalEvent]
					: [];
				const currentIndexLessThanTotalSize = index <= response.eventSize - 1;
				currentIndexLessThanTotalSize &&
					(() => {
						const result = [...originData, ...response.data[index]];

						mainStore.setResponse({
							...mainStore.getData(),
							...{
								myHospitalEvent: result,
							},
						});

						return mainStore.setState("complete");
					})();
			} catch (e) {
				mainStore.setState("complete");
			}
		});
	};
	//추천이벤트 업데이트
	const recommendDbUpdate = async ({
		data,
		excute,
		groupLen = 10,
	}: {
		data: AxiosResponse["data"];
		excute: () => void;
		groupLen?: number;
	}) => {
		try {
			await commonUpdate(1, "recommendEvent", data, groupLen);
			return await excute();
		} catch (e) {
			console.log(e);
		}
	};

	//단골병원이벤트 업데이트
	const myHospitalEventUpdate = async ({
		data,
		groupLen = 5,
	}: {
		data: AxiosResponse["data"];
		groupLen?: number;
	}) => {
		try {
			const results = await commonUpdate(3, "myHospitalEvent", data, groupLen);
			return results;
		} catch (e) {
			console.log(e);
		}
	};

	return {
		recommendDbUpdate,
		getRecommendEvent,
		myHospitalEventUpdate,
		getMyHospitalEvent,
	};
};
