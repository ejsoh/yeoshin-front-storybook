import { GRADE_INFO } from "constantDatas/api";
import { MyPageLoggedIn } from "components/organisms";
import {
	MyPageLoggedInTemplate,
	MyPageNotLoggedInTemplate,
} from "components/templates/MyPages/MypageTemplate";
import { getMethod, useApiData } from "hooks/apiMethod";
import { gradeMapper } from "services/mapper/userInfoMapper";
import { useInjection } from "hooks";

import { AxiosResponse } from "axios";
import { MypageContents } from "components/organisms/mypage/MypageMain/MypageContents";
import { MypageNotLoggedIn } from "components/organisms/mypage/MypageMain/MypageNotLoggedIn";
import React from "react";
import { Seo } from "helper";
import { SpaceContainer } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";

import { logout } from "services";
import { mapper } from "models/RootStore";
import { updateUserInfo } from "services/utils/checkUserInfoEntity";
import { observer } from "mobx-react-lite";
import { MyPageHeader } from "components/organisms/header/Header";

export const LoggedInMyPage = observer(() => {
	const { interactionStore, fetchStore } = useInjection(mapper);
	useApiData({ call: [updateUserInfo().cacheSync], stateAlwaysDone: true });
	React.useEffect(() => {
		fetchStore.setState("done");

		return () => {
			fetchStore.setResponse({});
			interactionStore.setCurrentPageIndex(1);
			interactionStore.setValidationMessage({});
		};
	}, []);

	return (
		<MyPageLoggedInTemplate
			header={<MyPageHeader text="마이페이지" />}
			seo={<Seo title="마이페이지" />}
			userInfo={<MyPageLoggedIn />}
			contents={<MypageContents />}
			logout={
				<SpaceContainer columns={[32, 28]} rows={[24, 24]}>
					<Text lightgray left inline borderBottom={"#A8A8A8"} onClick={logout}>
						로그아웃
					</Text>
				</SpaceContainer>
			}
		/>
	);
});

export const NotLoggedInMyPage = () => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	React.useEffect(() => {
		fetchStore.setState("done");
		return () => {
			fetchStore.setResponse({});
			interactionStore.setCurrentPageIndex(1);
		};
	}, [fetchStore]);

	return (
		<MyPageNotLoggedInTemplate
			header={<MyPageHeader text="마이페이지" />}
			seo={<Seo title="마이페이지" />}
			needLogin={<MypageNotLoggedIn />}
			contents={<MypageContents />}
		/>
	);
};

export const MyPageDomain = () => {
	const { userInfoStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	const grade = userInfoStore.getUserGrade();
	const setGrade = userInfoStore.setUserGrade;

	const closeGrade = () => {
		setGrade({
			...grade,
			isShow: false,
		});
	};

	const getGrade = () => {
		const getGrade = getMethod({
			url: GRADE_INFO,
			success: (res: AxiosResponse["data"]) => {
				setGrade({
					isShow: true,
					grade: gradeMapper(res),
				});
			},
			fail: (err: { [key: string]: string }) => console.log(err),
		});
		userInfoStore.getUserGrade().grade[0].name === ""
			? setApiCall({ call: [getGrade], stateAlwaysDone: true })
			: setGrade({
					...grade,
					isShow: true,
			  });
	};

	return { getGrade, closeGrade };
};
