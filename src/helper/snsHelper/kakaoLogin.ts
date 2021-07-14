/* eslint-disable @typescript-eslint/no-explicit-any */
// 글로벌 카카오 객체는 any로 처리 할 수 밖에 없음
import { snsFail, snsSuccess } from "./snsFetchHelper";

import { KAKAOTALK_ID } from "constantDatas/snsLoginInfo";
import { RouteComponentProps } from "react-router-dom";
import { SNS_LOGIN_URL } from "constantDatas/api";
import { getStorage, setStorage } from "services/utils/localStorage";
import { postActionFetcher } from "helper/postActionFetcher";
import { loginPath } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";
import { setCookie } from "services";

declare global {
	interface Window {
		Kakao: any;
	}
}

export const kakaoLoginHelper = (
	history: RouteComponentProps["history"],
	auth: {
		user: () => any;
		signIn: (auth: () => void, check: boolean) => void;
	},
	getId?: (id: string, type: string) => void
) => {
	const kakao = window.Kakao;

	if (!kakao.isInitialized()) {
		window.Kakao.init(KAKAOTALK_ID);
		window.Kakao.isInitialized();
	}

	kakao.Auth.login({
		success: function (response: any) {
			kakao.API.request({
				url: "/v2/user/me",
				success: function (res: any) {
					const userInfo = {
						name: "",
						email: res.kakao_account.email || "",
						id: res.id.toString(),
						snsType: "kakao",
					};
					setCookie("AuthShopCOOKIEID", res.id.toString());
					const success = snsSuccess(auth);
					const fail = snsFail({ userInfo: userInfo, history: history });
					eventTracking("카카오톡 로그인");
					loginPath("카카오톡 로그인");
					setStorage("snsType", "kakao");
					return getId
						? getId(res.id.toString(), "kakao")
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
				},
				fail: function (error: any) {
					console.log(JSON.stringify(error));
				},
			});
		},
		fail: function (error: any) {
			console.log("err" + JSON.stringify(error));
		},
	});
};
