import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { BOARD_COMMENTS } from "constantDatas/api";
import React from "react";
import { SubPageTemplate } from "components/templates";
import { boardCommentsMapper } from "services/mapper/subPageMapper/boardCommentsMapper";
import { mapper } from "models/RootStore";
import { useInjection } from "hooks";

export const MyReview = () => {
	const { fetchStore, interactionStore, userInfoStore } = useInjection(mapper);

	const getReview = getMethod({
		url: queryParams(BOARD_COMMENTS, [
			["boardNo", "526"],
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
			["memberId", userInfoStore.getUserId()],
		]),
		success: res => {
			fetchStore.setResponse(boardCommentsMapper(res));
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});

	useApiData({ call: [getReview] });
	return (
		<SubPageTemplate
			header={"내가쓴후기"}
			seo={<Seo title={"내가쓴후기"} />}
			contents={<div />}
		/>
	);
};
