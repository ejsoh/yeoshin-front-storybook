import { getMethod, postMethod, useApiData } from "hooks/apiMethod";
import { BOARD_COMMENTS } from "constantDatas/api";
import { boardCommentsMapper } from "services/mapper/subPageMapper/boardCommentsMapper";
import { mapper } from "models/RootStore";
import { queryParams } from "helper";
import { useInjection } from "hooks";

export const PaginationDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const url = interactionStore.getPageInfo().url;
		const mapper = interactionStore.getPageInfo().mapper;

		const paging = getMethod({
			url: queryParams(url, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				window.scrollTo(0, 0);
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					data: mapper(res).data,
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

export const ReviewDomain = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	const getList = (index: number, isReset?: boolean) => {
		const pageInfo = interactionStore.getPageInfo();
		interactionStore.setCurrentPageIndex(index);

		return getMethod({
			url: queryParams(BOARD_COMMENTS, [
				["boardNo", pageInfo.no],
				["pageNum", index.toString()],
				["listMaxCount", "50"],
			]),
			success: res => {
				isReset
					? fetchStore.setResponse({
							...fetchStore.fetchStore(),
							data: [...boardCommentsMapper(res).data],
					  })
					: fetchStore.setResponse({
							...fetchStore.fetchStore(),
							data: [
								...fetchStore.fetchStore().data,
								...boardCommentsMapper(res).data,
							],
					  });
			},
			fail: err => {
				fetchStore.setResponse({ data: false });
			},
		});
	};

	const getPaging = (index: number, isReset?: boolean) => {
		setApiCall({ call: [getList(index)], stateAlwaysDone: true });
		return index;
	};

	const setReview = (no: string, comment: string, isSecret: string) => {
		const goReview = postMethod({
			url: BOARD_COMMENTS,
			success: res => {
				interactionStore.setIsAlert("등록되었습니다.");
			},
			body: {
				boardNo: no,
				comment: comment,
				secretYn: isSecret,
			},
			fail: err => {
				fetchStore.setResponse({ data: false });
			},
			chainingExcute: () => getList(1, true),
		});
		return setApiCall({ call: [goReview] });
	};

	return { getPaging, setReview };
};
