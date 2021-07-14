import { SNS_LOGIN_URL } from "constantDatas/api";
import { snsFail, snsSuccess } from "./snsFetchHelper";

/* eslint-disable @typescript-eslint/no-explicit-any */
// 글로벌 네이버 객체는 any로 처리 할 수 밖에 없음
import { NAVER_ID } from "constantDatas/snsLoginInfo";
import { RouteComponentProps } from "react-router-dom";
import { getStorage, setStorage } from "services/utils/localStorage";
import { postActionFetcher } from "helper/postActionFetcher";
import { removeStorage } from "../../services/utils/localStorage";
import { setCookie } from "services";
import { deviceInfo } from "services/utils/checkUserInfoEntity";

declare global {
	interface Window {
		naver: any;
	}
}

export const naverInit = () => {
	const naver = new window.naver.LoginWithNaverId({
		clientId: NAVER_ID,
		callbackUrl: window.location.origin + "/loading",
		callbackHandle: true,
		isPopup: false,
		loginButton: { color: "green", type: 1, height: 55 },
	});

	naver.init();
};

export const naverLoginHelper = (
	history: RouteComponentProps["history"],
	auth: {
		user: () => any;
		signIn: (auth: () => void, check: boolean) => void;
	},
	location: string
) => {
	const device = deviceInfo();
	const uuid = device.isInapp && { uuid: device.appInfo().uuid };
	const naver = new window.naver.LoginWithNaverId({
		clientId: NAVER_ID,
		callbackUrl: window.location.origin + "/loading",
		callbackHandle: true,
		isPopup: false,
		loginButton: { color: "green", type: 1, height: 55 },
	});

	naver.init();

	naver.getLoginStatus((status: any) => {
		if (status) {
			const email = naver.user.getEmail() || "";
			const name = naver.user.getNickName() || "";
			const uniqId = naver.user.getId();
			const userInfo = {
				name: name,
				email: email,
				id: uniqId,
				snsType: "naver",
			};
			setStorage("snsType", "naver");
			setCookie("AuthShopCOOKIEID", naver.user.getId());
			removeStorage(["com.naver.nid.oauth.state_token"]);
			const success = snsSuccess(auth);

			const fail = snsFail({
				userInfo: userInfo,
				func: naver.repromt,
				history: history,
			});

			location === "loading" &&
				postActionFetcher({
					success: success,
					fail: fail,
					data: {
						snsType: userInfo.snsType,
						encId: userInfo.id,
						ipAddress: getStorage("ip") || "",
						...uuid,
					},
					url: SNS_LOGIN_URL("web"),
				});
		} else {
			removeStorage(["userInfo"]);
		}
	});
};

export const naverInitial = () => {
	const naver = new window.naver.LoginWithNaverId({
		clientId: NAVER_ID,
		callbackUrl: window.location.origin + "/loading",
		// callbackHandle: true,
		isPopup: false,
		loginButton: { color: "green", type: 1, height: 55 },
	});

	naver.init();
	return { naver };
};

export const naverConnectHelper = (
	getId?: (id: string, type: string) => void
) => {
	const naver = naverInitial().naver;

	naver.getLoginStatus((status: any) => {
		if (status) {
			const email = naver.user.getEmail() || "";
			const name = naver.user.getNickName() || "";
			const uniqId = naver.user.getId();

			const userInfo = {
				name: name,
				email: email,
				id: uniqId,
				snsType: "naver",
			};

			getId && getId(userInfo.id, "naver");
		} else {
			removeStorage(["userInfo"]);
		}
	});
};
