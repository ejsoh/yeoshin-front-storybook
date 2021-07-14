import { AxiosResponse } from "axios";
import { db } from "services/utils/indexedDbInitConfig";
import { hospitalMapping } from "services/mapper/skinMapMapper";
import { mapper } from "models/RootStore";
import { removeDuplicateItemsByKey } from "helper";
import { useInjection } from "hooks";

export const SkinMapDb = () => {
	const { skinMapStore, fetchStore } = useInjection(mapper);

	const getDb = ({
		id,
		productIndex,
		hospitalIndex,
		productSize,
		product,
		excute,
	}: {
		id: number;
		productIndex?: number;
		hospitalIndex?: number;
		productSize: number;
		product?: AxiosResponse["data"];
		excute?: (response: AxiosResponse["data"]) => void | undefined;
	}) => {
		db.transaction("rw", db.table("skinMapEvents"), async () => {
			try {
				const sizeCall = await db.table("skinMapEvents").get(id);
				const sizeResponse = await sizeCall.items;

				const hospitalSize = sizeResponse.hospitalSize;

				const hospital =
					hospitalIndex !== undefined &&
					hospitalIndex < Math.ceil(hospitalSize / 5)
						? [
								...skinMapStore.getSkinMapRestuls().hospital,
								...hospitalMapping(sizeResponse.hospital[hospitalIndex]),
						  ]
						: skinMapStore.getSkinMapRestuls().hospital;

				skinMapStore.setStoreCount({
					event: productSize,
					hospital: hospitalSize,
				});

				excute && excute(sizeResponse);

				productIndex === 0 && hospitalIndex === 0
					? skinMapStore.setSkinMapResults({
							...skinMapStore.getSkinMapRestuls(),
							hospital:
								hospitalSize > 0
									? hospitalMapping(sizeResponse.hospital[hospitalIndex])
									: [],
							product: productSize > 0 ? product : [],
					  })
					: skinMapStore.setSkinMapResults({
							...skinMapStore.getSkinMapRestuls(),
							hospital: removeDuplicateItemsByKey(hospital, "key"),
							product: product,
					  });

				return fetchStore.setState("complete");
			} catch (e) {
				return fetchStore.setState("complete");
			}
		});
	};

	const dbUpdate = async ({
		deleteId,
		updateId,
		// product,
		productSize,
		hospital,
		hasLocation = true,
		excute,
		groupLen = 5,
	}: {
		deleteId: number;
		updateId: number;
		productSize: number;
		// product: AxiosResponse["data"];
		hospital: AxiosResponse["data"];
		hasLocation?: boolean;
		excute: () => void;
		groupLen?: number;
	}) => {
		try {
			// await deleteRecord(deleteId);
			let index, len;
			const hospitalList = [],
				groupLength = groupLen;

			// productList = [],
			// for (index = 0, len = productSize; index < len; index += groupLength) {
			// 	productList.push(product.slice(index, index + groupLength));
			// }
			for (
				index = 0, len = hospital.length;
				index < len;
				index += groupLength
			) {
				hospitalList.push(hospital.slice(index, index + groupLength));
			}
			const isExist = await db.table("skinMapEvents").get(1);

			hasLocation && isExist
				? await db.table("skinMapEvents").update(1, {
						name: "hospitalEvent",
						items: { hospital: hospital },
				  })
				: await db.table("skinMapEvents").put({
						id: 1,
						items: { hospital: hospital },
				  });
			const isExistSec = await db.table("skinMapEvents").get(updateId);
			isExistSec
				? await db.table("skinMapEvents").update(updateId, {
						items: {
							hospital: hospitalList,
							productSize: productSize,
							hospitalSize: hospital.length,
						},
				  })
				: await db.table("skinMapEvents").put({
						id: updateId,
						items: {
							hospital: hospitalList,
							productSize: productSize,
							hospitalSize: hospital.length,
						},
				  });
			return excute();
		} catch (e) {
			return;
		}
	};

	const getHospitalLocationDb = async (
		success: (item: AxiosResponse["data"]) => void,
		noResult: () => void
	) => {
		try {
			const response = await db.table("skinMapEvents").get(1);
			const result = await response;
			const hospital = result.items.hospital;
			const hospitalLength = result.items.hospital.length > 0;

			hospitalLength ? success(hospital) : noResult();
			return fetchStore.setState("complete");
		} catch (e) {
			console.log(e);
		}
	};
	const isResult = (res: AxiosResponse["data"]) => {
		const productLength = res.results.productOne.length;
		const hospitalLength = res.results.hospitals.length;
		const location = res.results.hospitals[0].location.split(",");

		switch (true) {
			case productLength > 0:
				return {
					lat: res.results.productOne[0].latitude,
					lng: res.results.productOne[0].longitude,
				};
			case hospitalLength > 0:
				return {
					lat: location[0],
					lng: location[1],
				};
			default:
				return {
					lat: "",
					lng: "",
				};
		}
	};

	const dbClear = () => console.log("");

	return {
		dbUpdate,
		getHospitalLocationDb,
		isResult,
		dbClear,
		getDb,
	};
};
