import { NoResults, ToggleEvent } from "components/molecules";

import { AxiosResponse } from "axios";
import { Column } from "components/atoms/Grid";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";
import { MyHospitalDomain } from "pages/mypage/MyHospitals";
import React from "react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { HospitalListItems } from "./HospitalListItem";

export const MyHospitalsContents = observer(() => {
	const { fetchStore } = useInjection(mapper);
	const { getPaging } = MyHospitalDomain();

	const hospitalEvent = (key: string) => () => {
		const result = fetchStore
			.fetchStore()
			.data.filter((item: AxiosResponse["data"]) => key !== item.key);

		fetchStore.setResponse({
			...fetchStore.fetchStore(),
			data: result,
		});
	};
	const setPage = (index: number) => getPaging(index);

	return (
		<ToggleEvent
			condition={
				fetchStore.fetchStore().data && fetchStore.fetchStore().totalCount > 0
			}
		>
			<Column>
				{fetchStore.fetchStore().data &&
					fetchStore
						.fetchStore()
						.data.map((item: AxiosResponse["data"]) => (
							<HospitalListItems
								totalCount={fetchStore.fetchStore().totalCount}
								getPaging={setPage}
								key={item.key ?? "find"}
								item={item}
								lastItem={
									fetchStore.fetchStore().data[
										fetchStore.fetchStore().data.length - 1
									].key
								}
								excute={hospitalEvent(item.key)}
							/>
						))}
				{fetchStore.getState() === "inlinePending" && <EllipsisLoading />}
			</Column>
			<NoResults text="등록된 단골병원이 없습니다." />
		</ToggleEvent>
	);
});
