import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { DetailPageTemplate } from "components/templates/MyPages/DetailPageTemplate";
import { FAQ } from "constantDatas/api";
import { OftenQuestionContents } from "components/organisms/mypage/MypageSub/OftenQuestionContents";
import React from "react";
import { faqMapper } from "services/mapper/subPageMapper/noticeMapper";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const OftenQuestions = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getList = getMethod({
		url: queryParams(FAQ, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(faqMapper(res));
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});
	useApiData({ call: [getList] });

	return (
		<DetailPageTemplate
			location={""}
			header={"자주묻는질문"}
			seo={<Seo title="자주묻는질문" />}
			contents={<OftenQuestionContents />}
		/>
	);
});

export const OftenQuestionsDomain = () => {
	const { setApiCall } = useApiData();

	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const paging = getMethod({
			url: queryParams(FAQ, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse(faqMapper(res));
			},
			fail: () => {
				fetchStore.setResponse({ data: false });
			},
		});
		setApiCall({ call: [paging] });
	};

	return { getPaging };
};
