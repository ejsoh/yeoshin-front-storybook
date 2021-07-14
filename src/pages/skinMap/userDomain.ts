import { HOSPITAL_DISLIKE, HOSPITAL_LIKE } from "constantDatas/api";
import { useInjection } from "hooks";
import { HOSPITAL_LIKE_LIST } from "./../../constantDatas/api";
import { mapper } from "models/RootStore";
import {
	deleteMethod,
	getMethod,
	postMethod,
	useApiData,
} from "hooks/apiMethod";
import { AUTH_TOKEN } from "services/utils/requestConfig";

export const UserDomain = () => {
	const { userInfoStore, fetchStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	const hospitalLikeList = () => {
		return getMethod({
			url: HOSPITAL_LIKE_LIST,
			success: res => {
				const success = typeof res.results !== "string";
				success && userInfoStore.setUserLikeList(res.results);
			},
			fail: err => fetchStore.setState("errorDone"),
		});
	};

	const hospitalAddLike = (id: string) => {
		const like = postMethod({
			body: {
				shopId: id,
			},
			url: HOSPITAL_LIKE,
			success: res => {
				userInfoStore.setLike(id);
			},
			fail: err =>
				interactionStore.setIsAlert("해당 서비스를 이용할 수 없습니다."),
		});

		AUTH_TOKEN && setApiCall({ call: [like], stateAlwaysPending: true });
	};
	const hospitalDisLike = (id: string) => {
		const dislike = deleteMethod({
			url: `${HOSPITAL_DISLIKE}?shopId=${id}`,
			success: res => {
				userInfoStore.disLike(id);
			},
			fail: err =>
				interactionStore.setIsAlert("해당 서비스를 이용할 수 없습니다."),
		});
		AUTH_TOKEN && setApiCall({ call: [dislike], stateAlwaysPending: true });
	};

	return { hospitalLikeList, hospitalAddLike, hospitalDisLike };
};
