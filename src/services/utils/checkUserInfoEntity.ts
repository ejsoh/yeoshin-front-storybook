import { logout } from "services";
import { isIOS, isAndroid, isChrome } from "react-device-detect";
import { CACHE_SYNC, MEMBER_CACHE_DATA } from "../../constantDatas/api";
import { fetchData } from "hooks/apiMethod/useApiData";
import { getCookie } from "services/utils/cookies";
import { getMethod } from "hooks/apiMethod";
import { rootStore } from "models/RootStore";
import { getUserInfo, userMyPageInfo } from "services/mapper/userInfoMapper";
import { setStorage } from "./localStorage";
import { getIpAction } from "./getIp";

export const checkUserInfoEntity = (excute?: () => void) => {
	const store = rootStore;
	const AUTH_TOKEN = getCookie("accessToken");
	const isEmptyUserName = store.userInfoStore.getUserInfo().id === "";
	const isToken = AUTH_TOKEN !== undefined && AUTH_TOKEN !== "";

	const getUserData = (ip: string) => {
		return fetchData(
			getMethod({
				url: MEMBER_CACHE_DATA,
				success: res => {
					store.userInfoStore.setUserInfo(getUserInfo(res));
				},
				fail: err => logout(),
			})(ip)
		);
	};

	isToken && isEmptyUserName && getIpAction(getUserData);

	const setExcute = excute ? [excute] : [];

	return Promise.all([...setExcute].map(item => item()));
};

export const updateUserInfo = () => {
	const store = rootStore;
	const cacheSync = getMethod({
		url: CACHE_SYNC,
		fail: () => console.log("fail"),
		chainingExcute: () => memberCache,
	});

	const memberCache = getMethod({
		url: MEMBER_CACHE_DATA,
		success: res => {
			store.userInfoStore.setUserMyPageInfo(userMyPageInfo(res));
			store.userInfoStore.setUserInfo(getUserInfo(res));
		},
		fail: err => logout(),
	});
	return { cacheSync };
};

export const deviceInfo = () => {
	const useragent = window.navigator.userAgent;
	const isInapp = /yeoshin_/.test(useragent);
	const isAos = isAndroid;
	const isChr = isChrome;
	const isApple = isIOS;

	const deviceType = isInapp ? (isIOS ? "ios" : "aos") : "web";
	const appInfo = () => {
		const isUuid = /uuid_/.test(useragent);
		const getUuid = isUuid
			? useragent.split("token_")[1].split("uuid_")[1]
			: "";

		const infos = {
			uuid: getUuid,
			device: deviceType,
		};
		setStorage("uuid", infos.uuid);
		setStorage("device", infos.device);
		return infos;
	};

	return { appInfo, isInapp, deviceType, isAos, isChr, isApple };
};
