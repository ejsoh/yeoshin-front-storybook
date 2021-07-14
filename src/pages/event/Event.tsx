import { EventDomain } from "./EventDomain";
import { getQueryParams, Seo, timer } from "helper";
import React from "react";
import { login } from "services/utils/login";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { updateUserInfo } from "services/utils/checkUserInfoEntity";
import { useApiData } from "hooks/apiMethod";
import { useAuth } from "hooks/useAuth";
import { useInjection } from "hooks";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";
import EventTemplate from "components/templates/EventTemplate";
import { EventHeader } from "components/organisms/header/EventHeader";
import { Icon } from "components/atoms";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import { EventContents } from "components/organisms/event/EventContents";
import { SearchContents } from "components/organisms/search/SearchContents";
import { useEffect } from "react";
import { EventFilterBottomSheet } from "components/organisms/event/eventComponents/EventFilterBottomSheet";

export const Event = observer(() => {
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

	// NOTE : 이벤트 관련된 api 셋팅
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
			seo={<Seo title="이벤트" />}
			header={
				<EventHeader
					searchIcon={<Icon event={getSearch} icon="search" size={24} />}
				/>
			}
			contents={<EventContents />}
			search={
				<React.Suspense fallback={null}>
					<SearchContents />
				</React.Suspense>
			}
		/>
	);
});
