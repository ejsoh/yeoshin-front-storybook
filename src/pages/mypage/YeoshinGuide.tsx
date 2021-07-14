import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { BOARD_COMMENTS } from "constantDatas/api";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { SubPageTemplate } from "components/templates";
import { YeoshinGuideContents } from "components/organisms/mypage/MypageSub/YeoshinGuideContents";
import { boardCommentsMapper } from "services/mapper/subPageMapper/boardCommentsMapper";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

const mapper = ({ fetchStore, interactionStore }: RootStoreModel) => ({
	fetchStore,
	interactionStore,
});

export const YeoshinGuide = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	const list = getMethod({
		url: queryParams(BOARD_COMMENTS, [
			["boardNo", "526"],
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "50"],
		]),
		success: res => {
			fetchStore.setResponse(boardCommentsMapper(res));
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});

	React.useEffect(() => {
		setApiCall({ call: [list] });
		interactionStore.setPageInfo({ no: "526" });
	}, []);

	return (
		<SubPageTemplate
			header={"이벤트"}
			seo={<Seo title="이벤트" />}
			contents={<YeoshinGuideContents />}
			isHelper={true}
		/>
	);
});
