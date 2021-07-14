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
import { eventTracking } from "services/utils/analystics/amplitude";
import { mapper } from "models/RootStore";
import { queryParams } from "helper";
import { searchLinkUrl } from "constantDatas/linkUrls";
import { aceUserInfo } from "services/utils/analystics/aceCounter";
import { pixelTracking } from "services/utils/analystics/pixel";
import { AUTH_TOKEN } from "services/utils/requestConfig";
import { fetchStore } from "models/stores";

export const EventDomain = () => {
	const { eventStore } = useInjection(mapper);

	const recommendEvent = useCallback(() => {
		return getMethod({
			url: MAIN_RECOMMEND_LIST,
			success: res => {
				eventStore.setEvent(eventMapper(res.results.recommendProducts));
				eventStore.setFilteredEvent(eventMapper(res.results.recommendProducts));
				eventStore.setEventCount(res.results.recommendProducts.length);
			},
			fail: e => console.log(e),
		});
	}, [eventStore.getData().recommendEvent]);

	const getRecommendKeyowrd = useCallback(() => {
		return (
			!fetchStore.fetchStore().recommendKeyword &&
			getMethod({
				url: SEARCH_RECOMMEND_LIST,
				success: res => {
					fetchStore.setResponse({
						...fetchStore.fetchStore(),
						...receommendKeyowrd(res),
					});
				},
				fail: () => console.log("fail"),
			})
		);
	}, [fetchStore.fetchStore().recommendKeyword]);

	return [recommendEvent(), getRecommendKeyowrd()].filter(Boolean);
};
