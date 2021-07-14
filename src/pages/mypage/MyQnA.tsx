import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { CONSULTATIONLIST } from "constantDatas/api";
import { MyQnAContents } from "components/organisms/mypage";
import React from "react";
import { SubPageTemplate } from "components/templates";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const MyQnA = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const qnaList = getMethod({
		url: queryParams(CONSULTATIONLIST, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			// fetchStore.setResponse(myPointListMapper(res));
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});
	useApiData({ call: [qnaList] });
	return (
		<SubPageTemplate
			header={"나의 글 모음"}
			seo={<Seo title="나의 글 모음" />}
			contents={<MyQnAContents />}
		/>
	);
});
