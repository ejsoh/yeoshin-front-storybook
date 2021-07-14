import { loginFail, loginSuccess } from "services/mapper/loginMapper";
import { useInjection } from "hooks";

import { Header } from "components/organisms/header/Header";
import { LOGIN_URL } from "constantDatas/api";
import LoginContents from "components/organisms/login";
import { LoginTemplate } from "components/templates";
import React from "react";
import { Seo } from "helper";
import { fetchStore } from "models/stores";
import { setCookie } from "services";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { deviceInfo } from "services/utils/checkUserInfoEntity";
import { postMethod, useApiData } from "hooks/apiMethod";

const Login = () => {
	const { setApiCall } = useApiData();
	const { loginStore, userInfoStore } = useInjection(mapper);
	const device = deviceInfo();
	React.useEffect(() => {
		fetchStore.setState("done");
	}, [userInfoStore]);

	const login = (ip: string) => {
		userInfoStore.setUserIp(ip);

		const body = {
			memberId: loginStore.userInfo().id,
			memberPw: loginStore.userInfo().password,
			ipAddress: ip,
		};
		const uuid = device.isInapp && { uuid: device.appInfo().uuid };

		userInfoStore.setUserInfoSpecific("id", loginStore.userInfo().id);

		setCookie("AuthShopCOOKIEID", loginStore.userInfo().id);

		const login = postMethod({
			url: LOGIN_URL(device.deviceType),
			body: { ...body, ...uuid },
			success: loginSuccess,
			fail: loginFail,
			infinitePending: true,
		});
		setApiCall({ call: [login], stateAlwaysPending: true });
	};

	return (
		<LoginTemplate
			seo={<Seo title="로그인 및 회원가입" />}
			header={<Header text="로그인 및 회원가입" location="/myPage" />}
			contents={<LoginContents loginEvent={login} />}
		/>
	);
};

export default observer(Login);
