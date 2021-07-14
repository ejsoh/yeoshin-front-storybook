import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { BOARD_COMMENTS } from "constantDatas/api";
import { PointBenefitContents } from "components/organisms/mypage/MypageSub/PointBenefitContents";
import React from "react";
import { SubPageTemplate } from "components/templates";
import { boardCommentsMapper } from "services/mapper/subPageMapper/boardCommentsMapper";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const PointBenefit = observer(() => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);
	const point = getMethod({
		url: queryParams(BOARD_COMMENTS, [
			["boardNo", "361"],
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(boardCommentsMapper(res));
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});
	React.useEffect(() => {
		setApiCall({ call: [point] });
		interactionStore.setPageInfo({ no: "361" });
	}, []);
	return (
		<SubPageTemplate
			header={"이벤트"}
			seo={<Seo title="이벤트" />}
			contents={<PointBenefitContents />}
			isHelper={true}
		/>
	);
});
