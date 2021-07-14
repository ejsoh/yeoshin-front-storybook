import { ACCOUNT_HOSPITAL_LIKE, FIND_HOSPITALS_LIST } from "constantDatas/api";
import { Seo, queryParams, removeDuplicateItemsByKey } from "helper";

import { FindHospitalContents } from "components/organisms/mypage";
import React from "react";
import { SubPageTemplate } from "components/templates";
import { deleteMethod } from "hooks/apiMethod/deleteMethod";
import { findHospitalMapper } from "services/mapper/subPageMapper/myHospitalsMapper";
import { getMethod } from "hooks/apiMethod/getMethod";
import { mapper } from "models/RootStore";
import { postMethod } from "hooks/apiMethod/postMethod";
import { useApiData } from "hooks/apiMethod/useApiData";
import { useAuth } from "hooks";
import { useInjection } from "hooks";

export const FindHospitals = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const auth = useAuth();
	const { setApiCall } = useApiData();

	const hospitalLikeList = () => {
		return getMethod({
			url: ACCOUNT_HOSPITAL_LIKE,
			fail: err => console.log(err),
			chainingExcute: res => hospitalList(res.results),
		});
	};

	const hospitalList = (likeList: string[]) => {
		return getMethod({
			url: queryParams(FIND_HOSPITALS_LIST, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "40"],
			]),
			success: res => {
				fetchStore.setState("done");
				fetchStore.setResponse(findHospitalMapper(res, likeList));
			},
			fail: err => {
				fetchStore.setResponse({ data: false });
			},
		});
	};

	const isUser = auth.user()
		? { call: [hospitalLikeList()], stateAlwaysPending: true }
		: { call: [hospitalList([])] };
	React.useEffect(() => {
		setApiCall(isUser);
	}, []);

	return (
		<SubPageTemplate
			header={"병원목록"}
			seo={<Seo title="병원목록" />}
			contents={<FindHospitalContents />}
			isHelper={true}
		/>
	);
};

export const FindHospitalDomain = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	const getPaging = (index: number) => {
		interactionStore.setCurrentPageIndex(index);
		const getPage = getMethod({
			url: queryParams(FIND_HOSPITALS_LIST, [
				["pageNum", index.toString()],
				["listMaxCount", "40"],
			]),
			success: res => {
				const data = findHospitalMapper(res, fetchStore.fetchStore().likeList);
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					findHospital: removeDuplicateItemsByKey(
						[...fetchStore.fetchStore().findHospital, ...data.findHospital],
						"key"
					),
				});
			},
			fail: () => {
				fetchStore.setResponse({ data: false });
			},
		});
		setApiCall({ call: [getPage], inlinePending: true });
	};

	const hospitalLike = (id: string) => {
		const like = postMethod({
			url: ACCOUNT_HOSPITAL_LIKE,
			body: { shopId: id },
			fail: () => {
				console.log("fail");
			},
		});
		setApiCall({ call: [like], inlinePending: true });
	};

	const hospitalDislike = (id: string, excute?: () => void) => {
		const disLike = deleteMethod({
			url: `${ACCOUNT_HOSPITAL_LIKE}?shopId=${id}`,
			fail: () => console.log("fail"),
			success: () => excute && excute(),
		});
		setApiCall({ call: [disLike], inlinePending: true });
	};

	return { getPaging, hospitalLike, hospitalDislike };
};
