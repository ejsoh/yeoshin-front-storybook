import { Column } from "components/atoms/Grid";
import { useInjection } from "hooks";
import { AxiosResponse } from "axios";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";
import { FindHospitalDomain } from "pages/mypage/FindHospitals";
import React from "react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { HospitalListItems } from "./HospitalListItem";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

export const FindHospitalContents = observer(() => {
	const { fetchStore } = useInjection(mapper);
	const { getPaging } = FindHospitalDomain();
	const setPage = (index: number) => getPaging(index);

	return (
		<Column>
			{fetchStore.fetchStore().findHospital &&
				fetchStore
					.fetchStore()
					.findHospital.map((item: AxiosResponse["data"]) => (
						<HospitalListItems
							key={item.key ?? "find"}
							totalCount={fetchStore.fetchStore().totalCount}
							item={item}
							getPaging={setPage}
							lastItem={
								fetchStore.fetchStore().findHospital[
									fetchStore.fetchStore().findHospital.length - 20
								].key
							}
						/>
					))}
			<OnlyTruthyShow condition={fetchStore.getState() === "inlinePending"}>
				<EllipsisLoading />
			</OnlyTruthyShow>
		</Column>
	);
});
