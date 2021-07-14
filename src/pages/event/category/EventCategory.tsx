import { EventDomain } from "../EventDomain";
import { getQueryParams, Seo, timer } from "helper";
import React from "react";
import { login } from "services/utils/login";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { updateUserInfo } from "services/utils/checkUserInfoEntity";
import { useApiData } from "hooks/apiMethod";
import { useAuth } from "hooks/useAuth";
import { useInjection } from "hooks";
import EventTemplate from "components/templates/EventTemplate";
import { Icon } from "components/atoms";
import { SearchContents } from "components/organisms/search/SearchContents";
import { useEffect } from "react";
import { EventCategoryHeader } from "components/organisms/header/EventCategoryHeader";

export const EventCategory = observer(() => {
	const domain = EventDomain();

	const { interactionStore, userInfoStore, fetchStore } = useInjection(mapper);

	const { setApiCall } = useApiData();
	const userInfo = updateUserInfo();
	const auth = useAuth();

	const setToken = () => {
		const getToken = getQueryParams(["access_token"], { access_token: "" })
			.access_token;

		const beTokenExcute = () => {
			userInfoStore.setUserToken(getToken);

			login({
				accessToken: getToken,
			});
		};
		const beToken = getToken !== "";
		return { getToken, beToken, beTokenExcute };
	};

	// NOTE : 이벤트 관련된 api 호출
	const getEvent = () => {
		const callList = auth.user() ? [...domain, userInfo.cacheSync] : domain;
		setApiCall({ call: callList });
	};

	// NOTE : 검색창 등장과 검색어 초기화
	const getSearch = () => {
		interactionStore.setPopUpEventShow(true);
		interactionStore.setInputValue({ keyword: "" });
	};

	// NOTE : 이벤트 api 불러오기
	useEffect(() => {
		interactionStore.setPopUpEventShow(false);
		interactionStore.setInputValue({ keyword: "" });
		setToken().beToken && setToken().beTokenExcute();
		fetchStore.setState("done");

		timer({ timerTime: 5000, time: 5000 }).start;
		getEvent();
		return () => {
			timer({}).stop();
		};
	}, []);
	return (
		<EventTemplate
			seo={<Seo title="이벤트 피부" />}
			header={
				<EventCategoryHeader
					searchIcon={<Icon event={getSearch} icon="search" size={24} />}
				/>
			}
			contents={<div />}
			search={
				<React.Suspense fallback={null}>
					<SearchContents />
				</React.Suspense>
			}
		/>
	);
});
