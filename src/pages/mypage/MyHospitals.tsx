import { MY_HOSPITALS } from "constantDatas/api";
import { Seo, queryParams } from "helper";
import { MyHospitalsContents } from "components/organisms/mypage";
import React from "react";
import { mapper } from "models/RootStore";
import { SubPageTemplate } from "components/templates";

import { myHospitalsMapper } from "services/mapper/subPageMapper/myHospitalsMapper";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { getMethod, useApiData } from "hooks/apiMethod";

export const MyHospitals = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getMyHospital = getMethod({
		url: queryParams(MY_HOSPITALS, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(myHospitalsMapper(res));
			interactionStore.setPageInfo({
				url: MY_HOSPITALS,
				mapper: myHospitalsMapper,
			});
		},
		fail: err => {
			fetchStore.setResponse({ data: false });
		},
	});
	useApiData({ call: [getMyHospital] });
	return (
		<SubPageTemplate
			header={"단골병원"}
			seo={<Seo title="단골병원" />}
			contents={<MyHospitalsContents />}
		/>
	);
});

export const MyHospitalDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);

		const getPage = getMethod({
			url: queryParams(MY_HOSPITALS, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					data: [
						...fetchStore.fetchStore().data,
						...myHospitalsMapper(res).data,
					],
				});
			},
			fail: () => {
				fetchStore.setResponse({ data: false });
			},
		});
		setApiCall({ call: [getPage], inlinePending: true });
	};

	return { getPaging };
};
