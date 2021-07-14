import { getStorage, setStorage } from "services/utils/localStorage";
import { postMethod, useApiData } from "hooks/apiMethod";
import { useHistory, useParams } from "react-router-dom";

import { AUTH_TOKEN } from "services/utils/requestConfig";
import { AxiosResponse } from "axios";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";
import { ModifyUserInfoDomain } from "pages/mypage/ModifyUserInfo";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import React from "react";
import { SNS_LOGIN_URL } from "constantDatas/api";
import { deviceInfo } from "services/utils/checkUserInfoEntity";
import { getQueryParam } from "helper";
import jwt_decode from "jwt-decode";
import { mapper } from "models/RootStore";
import { naverConnectHelper } from "helper/snsHelper/naverLogin";
import { naverLoginHelper } from "helper/snsHelper";
import styled from "@emotion/styled/macro";
import { useAuth } from "hooks/useAuth";
import { useInjection } from "hooks";

const Naver = styled.div`
	visibility: hidden;
	height: 0;
`;
export const EmptyLogin = () => {
	const history = useHistory();
	const auth = useAuth();
	const { snsConnect } = ModifyUserInfoDomain();
	const device = deviceInfo();

	React.useEffect(() => {
		AUTH_TOKEN
			? naverConnectHelper((id, type) => snsConnect(id, type))
			: naverLoginHelper(history, auth, "loading");
	}, [auth, history]);
	return (
		<>
			<Naver id="naverIdLogin"></Naver>
			<OnlyTruthyShow condition={!(device.isInapp && device.isApple)}>
				<EllipsisLoading />
			</OnlyTruthyShow>
		</>
	);
};

export const AppleLogin = () => {
	const { fetchStore } = useInjection(mapper);
	const device = deviceInfo();

	const { setApiCall } = useApiData();
	const auth = useAuth();
	const getId = (jwt_decode(
		window.location.hash.split("&id_token=")[1]
	) as AxiosResponse["data"]).sub;
	const { snsConnect } = ModifyUserInfoDomain();

	const uuid = device.isInapp && { uuid: device.appInfo().uuid };

	const login = postMethod({
		success: res => {
			fetchStore.setState("pending");
			setStorage("snsType", "apple");
			auth.signIn(() => {
				window.location.replace("/");
			}, true);
		},
		fail: () => {
			setStorage("userInfo", JSON.stringify({ id: getId, snsType: "apple" }));
			window.location.replace("/snsJoin");
		},
		body: {
			snsType: "apple",
			encId: getId,
			ipAddress: getStorage("ip") || "",
			...uuid,
		},
		url: SNS_LOGIN_URL(device.deviceType),
	});

	React.useEffect(() => {
		getId !== "" &&
			getId &&
			(AUTH_TOKEN ? snsConnect(getId, "apple") : setApiCall({ call: [login] }));
	}, []);
	return (
		<OnlyTruthyShow condition={!device.isInapp && !device.isApple}>
			<EllipsisLoading />
		</OnlyTruthyShow>
	);
};

export const SnSAppLoading = () => {
	const { setApiCall } = useApiData();
	const { fetchStore } = useInjection(mapper);
	const device = deviceInfo();
	const { id } = useParams<{ id: string }>();
	const auth = useAuth();
	const getId = getQueryParam("id");
	const { snsConnect } = ModifyUserInfoDomain();
	const uuid = device.isInapp && { uuid: device.appInfo().uuid };

	React.useEffect(() => {
		getId !== "" &&
			(device.isInapp && AUTH_TOKEN ? snsConnect(getId, id) : appLogin());
	}, []);

	const appLogin = () => {
		const login = postMethod({
			success: res => {
				fetchStore.setState("pending");
				auth.signIn(() => {
					window.location.replace("/");
				}, true);
			},
			fail: () => {
				setStorage("userInfo", JSON.stringify({ id: getId, snsType: id }));
				window.location.replace("/snsJoin");
			},
			body: {
				snsType: id,
				encId: getId,
				ipAddress: getStorage("ip") || "",
				...uuid,
			},
			url: SNS_LOGIN_URL(device.appInfo().device),
		});
		setApiCall({ call: [login] });
	};

	return (
		<OnlyTruthyShow condition={!device.isInapp && !device.isApple}>
			<EllipsisLoading />
		</OnlyTruthyShow>
	);
};
