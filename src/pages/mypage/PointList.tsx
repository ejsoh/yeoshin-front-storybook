import { queryParams, Seo } from "helper";
import React from "react";
import { useInjection } from "hooks";
import { mapper } from "models/RootStore";
import { SubPageTemplate } from "components/templates";
import { PointListContents } from "components/organisms/mypage/MypageSub/PointListContents";
import { GET_POINT_LIST } from "constantDatas/api";
import { pointListMapper } from "services/mapper/subPageMapper/myPointListMapper";
import { getMethod, useApiData } from "hooks/apiMethod";

export const PointList = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const list = getMethod({
		url: queryParams(
			GET_POINT_LIST,

			[
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]
		),
		success: res => {
			fetchStore.setResponse(pointListMapper(res));
		},
		fail: err => {
			fetchStore.setResponse({ result: false });
		},
	});
	useApiData({ call: [list] });

	return (
		<SubPageTemplate
			header={"포인트내역"}
			seo={<Seo title={"포인트내역"} />}
			contents={<PointListContents />}
		/>
	);
};

export const PointListDomain = () => {
	const { setApiCall } = useApiData();

	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const paging = getMethod({
			url: queryParams(GET_POINT_LIST, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse(pointListMapper(res));
			},
			fail: err => {
				fetchStore.setResponse({ result: false });
			},
		});
		setApiCall({ call: [paging] });
	};

	return { getPaging };
};
