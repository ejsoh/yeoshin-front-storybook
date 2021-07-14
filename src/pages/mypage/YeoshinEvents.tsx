import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import React from "react";
import { SubPageTemplate } from "components/templates";
import { YEOSHING_EVENTS } from "constantDatas/api";
import { YeoshinEventContents } from "components/organisms/mypage/MypageSub/YeoshinEventContents";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { yeoshinEventMapper } from "services/mapper/subPageMapper/yeoshinEventsMapper";

export const YeoshinEvents = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getList = getMethod({
		url: queryParams(YEOSHING_EVENTS, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(yeoshinEventMapper(res));
		},
		fail: err => {
			fetchStore.setResponse({ data: false });
		},
	});
	useApiData({ call: [getList] });

	return (
		<SubPageTemplate
			header={"이벤트"}
			seo={<Seo title="이벤트" />}
			contents={<YeoshinEventContents />}
			isHelper={true}
		/>
	);
});

export const YeoshinEventDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const paging = getMethod({
			url: queryParams(YEOSHING_EVENTS, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					data: [
						...fetchStore.fetchStore().data,
						...yeoshinEventMapper(res).data,
					],
				});
			},
			fail: err => {
				fetchStore.setResponse({ data: false });
			},
		});
		setApiCall({ call: [paging], stateAlwaysDone: true });
	};

	return { getPaging };
};
