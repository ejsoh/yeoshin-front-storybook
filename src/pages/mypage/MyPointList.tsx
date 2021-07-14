import { EXCHANGE_POINT, MYPOINT_LIST } from "constantDatas/api";
import { Seo, queryParams } from "helper";
import { getMethod, postMethod, useApiData } from "hooks/apiMethod";

import { MyPointListContents } from "components/organisms/mypage";
import React from "react";
import { SubPageTemplate } from "components/templates";
import {
	checkUserInfoEntity,
	updateUserInfo,
} from "services/utils/checkUserInfoEntity";
import { mapper } from "models/RootStore";
import { myPointListMapper } from "services/mapper/subPageMapper/myPointListMapper";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { userInfoStore } from "models/stores";

export const MyPointList = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPoint = getMethod({
		url: queryParams(MYPOINT_LIST, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(myPointListMapper(res));
		},
		fail: () => {
			fetchStore.setResponse({ data: false });
		},
	});

	useApiData({ call: [getPoint] });
	React.useEffect(() => {
		checkUserInfoEntity();
	}, []);

	return (
		<SubPageTemplate
			header={"참여점수"}
			seo={<Seo title="참여점수" />}
			contents={<MyPointListContents />}
		/>
	);
});

export const MyPointListDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const paging = getMethod({
			url: queryParams(MYPOINT_LIST, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse(myPointListMapper(res));
			},
			fail: () => {
				fetchStore.setResponse({ data: false });
			},
		});
		setApiCall({ call: [paging] });
	};

	const exchangePoint = (point: string) => {
		const exchange = postMethod({
			url: EXCHANGE_POINT,
			success: res => {
				userInfoStore.setUserInfo({
					point: (
						parseInt(userInfoStore.getUserInfo().point) - parseInt(point)
					).toString(),
				});
				interactionStore.setValidationMessage({});
				interactionStore.setIsAlert("전환되었습니다.");
			},
			fail: err => interactionStore.setValidationMessage({ point: err.msg }),
			body: { point: point },
			chainingExcute: () => updateUserInfo().cacheSync,
		});

		setApiCall({ call: [exchange], stateAlwaysDone: true });
	};

	return { getPaging, exchangePoint };
};
