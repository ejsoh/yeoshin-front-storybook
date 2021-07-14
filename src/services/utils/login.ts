import { removeCookies, setCookie } from "..";
import { isIOS } from "react-device-detect";
import { LOGOUT_URL } from "constantDatas";
import { getActionFetcher } from "helper/getActionFetcher";
import { getCookie } from "./cookies";
import { removeStorage } from "services/utils/localStorage";
import { rootStore } from "models/RootStore";
import { AUTH_TOKEN } from "./requestConfig";
import { aceUserInfo } from "./analystics/aceCounter";
import { pixelTracking } from "./analystics/pixel";

export const login = (loginData: { [key: string]: string }) => {
	const store = rootStore;

	pixelTracking({
		event: "Login",
		value: store.loginStore.userInfo().id,
	});

	aceUserInfo(`var _id = '${store.loginStore.userInfo().id}'`);

	return (
		loginData.accessToken !== "" &&
		!AUTH_TOKEN &&
		setCookie("accessToken", loginData.accessToken)
	);
};

export const logout = () => {
	const store = rootStore;
	store.fetchStore.setState("pending");
	const token = getCookie("accessToken");
	const useragent = window.navigator.userAgent;
	const isInapp = /yeoshin_/.test(useragent);
	const deviceType = isIOS ? "ios" : "aos";
	const url = isInapp ? LOGOUT_URL(deviceType) : LOGOUT_URL("web");
	removeStorage([
		"com.naver.nid.access_token",
		"com.naver.nid.oauth.state_token",
		"kakao_b271285ae9c184d3b376ac1aabb33366",
	]);
	store.userInfoStore.setUserToken("");
	removeCookies(["accessToken"]);

	const absolutelyExcuted = () => {
		window.location.replace(window.location.pathname);
	};
	token &&
		getActionFetcher({
			success: () => {
				absolutelyExcuted();
			},
			fail: () => {
				absolutelyExcuted();
			},
			url: url,
		});
};
