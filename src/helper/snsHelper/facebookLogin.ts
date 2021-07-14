import { snsFail, snsSuccess } from "./snsFetchHelper";

/* eslint-disable @typescript-eslint/no-explicit-any */
//페이스북 글로벌 객체는 any로 처리 할 수 밖에 없음
import { FACEBOOK_ID } from "constantDatas/snsLoginInfo";
import { RouteComponentProps } from "react-router-dom";
import { SNS_LOGIN_URL } from "constantDatas/api";
import { getStorage, setStorage } from "services/utils/localStorage";
import { postActionFetcher } from "helper/postActionFetcher";
import { loginPath } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";
import { setCookie } from "services";

declare global {
	interface Window {
		FB: any;
		fbAsyncInit: any;
	}
}
export const faceBookInit = () => {
	window.fbAsyncInit = () => {
		window.FB.init({
			appId: FACEBOOK_ID,
			cookie: true,
			xfbml: true,
			version: "v9.0",
			status: true,
		});
	};
};

export const faceBookLoginHelper = (
	history: RouteComponentProps["history"],
	auth: {
		user: () => any;
		signIn: (auth: () => void, check: boolean) => void;
	},
	getId?: (id: string, type: string) => void
) => {
	const statusChangeCallback = (res: { [key: string]: string }) => {
		if (res.status === "connected") {
			window.FB.api("/me", function (response: { [key: string]: string }) {
				const userInfo = {
					name: response.name || "",
					email: "",
					id: response.id,
					snsType: "facebook",
				};
				setCookie("AuthShopCOOKIEID", response.id);
				setStorage("snsType", "facebook");
				const success = snsSuccess(auth);
				const fail = snsFail({ userInfo: userInfo, history: history });

				return getId
					? getId(response.id, "facebook")
					: postActionFetcher({
							success: success,
							fail: fail,
							data: {
								snsType: userInfo.snsType,
								encId: userInfo.id,
								ipAddress: getStorage("ip") || "",
							},
							url: SNS_LOGIN_URL("web"),
					  });
			});
		}
	};

	const getStatus = () => {
		if (JSON.stringify(window.FB.getLoginStatus) === undefined) {
			window.FB.init({
				appId: FACEBOOK_ID,
				cookie: true,
				xfbml: true,
				version: "v9.0",
				status: true,
			});
		}

		window.FB.getLoginStatus(function (response: { [key: string]: string }) {
			if (response.status === "connected") {
				eventTracking("페이스북 로그인");
				loginPath("페이스북 로그인");
				statusChangeCallback(response);
			} else {
				window.FB.login(function (response: any) {
					statusChangeCallback(response);
				});
			}
		});
	};
	return { getStatus, statusChangeCallback };
};
