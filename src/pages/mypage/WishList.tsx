import { Seo, queryParams } from "helper";
import { deleteMethod, getMethod, useApiData } from "hooks/apiMethod";

import React from "react";
import { RootStoreModel } from "models/RootStore";
import { SubPageTemplate } from "components/templates";
import { WISH_LIST } from "constantDatas/api";
import { WishListContents } from "components/organisms/mypage/MypageSub/WishListContents";
import { findIndex } from "helper/removeDuplicateItem";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { wishListMapper } from "services/mapper/subPageMapper/wishListMapper";
import { interactionStore } from "models/stores";
import { PaginationDomain } from "./CommonDomain";

const mapper = ({ fetchStore, interactionStore }: RootStoreModel) => ({
	fetchStore,
	interactionStore,
});

export const WishList = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const list = getMethod({
		url: queryParams(WISH_LIST, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(wishListMapper(res));
			interactionStore.setPageInfo({ url: WISH_LIST, mapper: wishListMapper });
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});

	useApiData({ call: [list] });
	return (
		<SubPageTemplate
			header={"찜한 이벤트"}
			seo={<Seo title="찜한 이벤트" />}
			contents={<WishListContents />}
		/>
	);
});

export const WishDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore } = useInjection(mapper);
	const { getPaging } = PaginationDomain();
	const wishDelete = (eventCode: string) => {
		const index = findIndex(fetchStore.fetchStore().data, eventCode);
		const copied = [...fetchStore.fetchStore().data];

		delete copied[index];

		const geDelete = deleteMethod({
			url: `${WISH_LIST}/${eventCode}`,
			success: () => {
				interactionStore.setIsAlert("삭제되었습니다.");
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					totalCount: fetchStore.fetchStore().totalCount - 1,
					data: copied.filter(() => true),
				});
				copied.filter(() => true).length <= 0 &&
					interactionStore.getCurrentPageIndex() !== 1 &&
					getPaging(interactionStore.getCurrentPageIndex() - 1);
				interactionStore.getCurrentPageIndex() === 1 &&
					getPaging(interactionStore.getCurrentPageIndex());
			},
			fail: () => interactionStore.setIsAlert("잠시 후 다시 시도해 주세요."),
		});
		setApiCall({ call: [geDelete], stateAlwaysDone: true });
	};
	return { wishDelete };
};
