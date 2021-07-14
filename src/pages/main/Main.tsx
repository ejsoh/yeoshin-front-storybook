import { MainDomain } from "./MainDomain";
import { getQueryParams, timer } from "helper";
import React from "react";
import { login } from "services/utils/login";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { updateUserInfo } from "services/utils/checkUserInfoEntity";
import { useApiData } from "hooks/apiMethod";
import { useAuth } from "hooks/useAuth";
import { useInjection } from "hooks";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";

export const Main = observer(() => {
	const domain = MainDomain();

	// const { getKeyword, getRecommendKeyowrd } = SearchDomain();
	const { interactionStore, userInfoStore } = useInjection(mapper);

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

	const getMain = () => {
		const callList = auth.user() ? [...domain, userInfo.cacheSync] : domain;
		setApiCall({ call: callList });
	};

	React.useEffect(() => {
		window.location.replace("https://yeoshin.co.kr/");
		interactionStore.setPopUpEventShow(false);
		interactionStore.setInputValue({ keyword: "" });

		setToken().beToken && setToken().beTokenExcute();

		timer({ timerTime: 5000, time: 5000 }).start;
		getMain();
		return () => {
			timer({}).stop();
		};
	}, []);

	// const getSearch = React.useCallback(() => {
	// 	interactionStore.setPopUpEventShow(true);
	// 	interactionStore.setInputValue({ keyword: "" });

	// 	auth.user()
	// 		? setApiCall({
	// 				call: [getKeyword(), getRecommendKeyowrd()],
	// 				stateAlwaysDone: true,
	// 		  })
	// 		: setApiCall({ call: [getRecommendKeyowrd()], stateAlwaysDone: true });
	// }, [
	// 	fetchStore.fetchStore().recentlyKeyword,
	// 	fetchStore.fetchStore().recommendKeyword,
	// ]);

	return (
		// <MainTemplate
		// 	seo={<Seo title="여신티켓" />}
		// 	header={
		// 		<MainHeader icon={<Icon event={getSearch} icon="search" size={24} />} />
		// 	}
		// 	contents={<MainContents />}
		// 	search={<SearchContents />}
		// 	popup={
		// 		<OnlyTruthyShow
		// 			condition={
		// 				mainStore.getData().myPopup &&
		// 				mainStore.getData().myPopup.length &&
		// 				auth.user()
		// 			}
		// 		>
		// 			<EventPopUp />
		// 		</OnlyTruthyShow>
		// 	}
		// />
		<EllipsisLoading />
	);
});
