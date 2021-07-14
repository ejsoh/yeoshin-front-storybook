import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { CONSULTATIONLIST } from "constantDatas/api";
import { MyConsultContents } from "components/organisms/mypage/MypageSub/MyConsultContents";
import React from "react";
import { SubPageTemplate } from "components/templates";
import { consultMapper } from "services/mapper/subPageMapper/consultMapper";
import { mapper } from "models/RootStore";
import { useInjection } from "hooks";

export const MyConsultList = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const consultList = getMethod({
		url: queryParams(CONSULTATIONLIST, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(consultMapper(res));
		},
		fail: err => fetchStore.setResponse({ data: false }),
	});

	useApiData({ call: [consultList] });

	return (
		<SubPageTemplate
			header={"1:1상담내역"}
			seo={<Seo title="1:1상담내역" />}
			contents={<MyConsultContents />}
		/>
	);
};

export const ConsultDomain = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const call = getMethod({
			url: queryParams(CONSULTATIONLIST, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse(consultMapper(res));
			},
			fail: () => fetchStore.setResponse({ data: false }),
		});
		setApiCall({ call: [call] });
	};
	return { getPaging };
};
