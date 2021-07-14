import {
	MAIN_BANNER,
	MAIN_NEW_LIST,
	MAIN_RECOMMEND_LIST,
	PRODUCT_TAG,
	RECENTLY_KEYWORD,
	SEARCH_RECOMMEND_LIST,
	SET_USER_SEARCH_KEYWORD,
	USER_SELECTED_HOSPITAL_LIST,
	WISH_CREATE,
	YEOSHIN_TV,
} from "constantDatas/api";
import { MY_POPUP, POPUP_LATER_CLOSE } from "constantDatas/api/products";
import {
	bannerMapper,
	eventMapper,
	myHospitalEventMapper,
	myPopupMapper,
	receommendKeyowrd,
	tagMapper,
	yeoshinTvMapper,
} from "services/mapper/mainMapper";
import {
	deleteMethod,
	getMethod,
	postMethod,
	useApiData,
} from "hooks/apiMethod";
import { useInjection } from "hooks";
import { useCallback } from "react";

import { MainDb } from "./MainDb";
import { eventTracking } from "services/utils/analystics/amplitude";
import { mapper } from "models/RootStore";
import { queryParams } from "helper";
import { searchLinkUrl } from "constantDatas/linkUrls";
import { aceUserInfo } from "services/utils/analystics/aceCounter";
import { pixelTracking } from "services/utils/analystics/pixel";
import { AUTH_TOKEN } from "services/utils/requestConfig";

export const MainDomain = () => {
	const { mainStore } = useInjection(mapper);

	const {
		recommendDbUpdate,
		getRecommendEvent,
		myHospitalEventUpdate,
	} = MainDb();

	const banner = useCallback(() => {
		return getMethod({
			url: MAIN_BANNER,
			success: res =>
				mainStore.setResponse({
					...mainStore.getData(),
					...bannerMapper(res),
				}),
			fail: () => console.log("fail"),
		});
	}, [mainStore.getData().banner]);

	const yeoshinTv = useCallback(() => {
		return getMethod({
			url: YEOSHIN_TV,
			success: res =>
				mainStore.setResponse({
					...mainStore.getData(),
					...yeoshinTvMapper(res),
				}),
			fail: () => console.log("fail"),
		});
	}, [mainStore.getData().tv]);

	const categoryTag = useCallback(() => {
		return getMethod({
			url: PRODUCT_TAG,
			success: res =>
				mainStore.setResponse({
					...mainStore.getData(),
					...tagMapper(res),
				}),
			fail: () => console.log("fail"),
		});
	}, [mainStore.getData().tag]);

	const recommendEvent = () => {
		return getMethod({
			url: MAIN_RECOMMEND_LIST,
			success: res => {
				recommendDbUpdate({
					data: eventMapper(res.results.recommendProducts),
					excute: () => getRecommendEvent({ index: 0 }),
				});
			},
			fail: e => console.log(e),
			chainingExcute: res => newEvent(res.results.productList),
		});
	};

	const newEvent = (productList: string) => {
		return getMethod({
			url: `${MAIN_NEW_LIST}?productCodes=${productList}`,
			success: res => {
				mainStore.setResponse({
					...mainStore.getData(),
					...{
						newEvent: eventMapper(res.results.newProducts),
					},
				});
			},
			fail: e => console.log(e),
		});
	};
	const myHospital = () => {
		return (
			AUTH_TOKEN &&
			getMethod({
				url: USER_SELECTED_HOSPITAL_LIST,
				success: res =>
					myHospitalEventUpdate({
						data: myHospitalEventMapper(res),
					}),
				fail: e => console.log(e),
			})
		);
	};
	const myPopup = useCallback(() => {
		return (
			AUTH_TOKEN &&
			getMethod({
				url: MY_POPUP,
				success: res => {
					mainStore.setResponse({
						...mainStore.getData(),
						...myPopupMapper(res),
					});
				},
				fail: err => console.log(err),
			})
		);
	}, [mainStore.getData().myPopup]);

	return [
		banner(),
		yeoshinTv(),
		categoryTag(),
		myPopup(),
		recommendEvent(),
		myHospital(),
	].filter(Boolean);
};

export const SearchDomain = () => {
	const { fetchStore, mainStore } = useInjection(mapper);
	const { setApiCall } = useApiData();
	const getKeyword = useCallback(() => {
		return getMethod({
			url: RECENTLY_KEYWORD,
			success: res => {
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					...{ recentlyKeyword: res.results },
				});
			},
			fail: () => console.log("fail"),
		});
	}, [fetchStore.fetchStore().recentlyKeyword]);

	const likeEvent = (code: string) => {
		const event = postMethod({
			url: WISH_CREATE,
			body: { productCode: code },
			fail: () => console.log("fail"),
		});
		setApiCall({ call: [event], stateAlwaysDone: true });
	};

	const disLikeEvent = (code: string) => {
		const event = deleteMethod({
			url: `${WISH_CREATE}/${code}`,
			fail: () => console.log("fail"),
		});
		setApiCall({ call: [event], stateAlwaysDone: true });
	};

	const getRecommendKeyowrd = useCallback(() => {
		return getMethod({
			url: SEARCH_RECOMMEND_LIST,
			success: res => {
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					...receommendKeyowrd(res),
				});
			},
			fail: () => console.log("fail"),
		});
	}, [fetchStore.fetchStore().recommendKeyword]);

	const setSearchKeyword = (keyword: string) => {
		aceUserInfo(`var _skey = '${keyword}'`);
		pixelTracking({ event: "Search", value: keyword });
		eventTracking("메인 키워드검색", {
			keyword: keyword,
		});

		const event = postMethod({
			url: SET_USER_SEARCH_KEYWORD,
			success: res => (window.location.href = searchLinkUrl(keyword)),

			fail: e => (window.location.href = searchLinkUrl(keyword)),
			body: { keyword: keyword },
		});
		setApiCall({ call: [event], stateAlwaysPending: true });
	};

	const deleteKeyword = (keyword?: string) => {
		const getKeyword = keyword
			? keyword
			: fetchStore.fetchStore().recentlyKeyword.toString();

		const event = deleteMethod({
			url: queryParams(RECENTLY_KEYWORD, [["keyword", getKeyword]]),

			success: res => {
				const find = fetchStore.fetchStore().recentlyKeyword.indexOf(keyword);
				const list = keyword
					? [...fetchStore.fetchStore().recentlyKeyword]
					: [];
				list.splice(find, 1);
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					...{
						recentlyKeyword: list,
					},
				});
			},
			fail: e => console.log(e),
		});
		setApiCall({ call: [event], stateAlwaysDone: true });
	};

	const writeLater = () => {
		mainStore.setResponse({
			...mainStore.getData(),
			...{ myPopup: [] },
		});
		const close = getMethod({
			url: POPUP_LATER_CLOSE,
			success: res => console.log(res),
			fail: e => console.log(e),
		});
		setApiCall({ call: [close] });
	};
	return {
		getKeyword,
		setSearchKeyword,
		getRecommendKeyowrd,
		likeEvent,
		disLikeEvent,
		deleteKeyword,
		writeLater,
	};
};
