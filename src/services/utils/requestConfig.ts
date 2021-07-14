import axios, { AxiosResponse } from "axios";
import { login, logout } from "./login";

import dotenv from "dotenv";
import { getCookie } from "./cookies";
import { getStorage } from "./localStorage";
import { rootStore } from "models/RootStore";

dotenv.config();

export const AUTH_TOKEN = getCookie("accessToken");
export const REMOTE_IP = getStorage("ip");

const axiosConfig = axios.create({});

// 응답 예외 처리
const handleResponseException = (
	response: AxiosResponse["data"],
	type: string
) => {
	switch (type) {
		case "expiredToken":
			return (() => {
				logout();
				return response;
			})();
		case "isResponseError":
			return (() => {
				throw {
					invalid: {
						invalid: "unexpected",
						status: response.data.serverCode,
						msg: response.data.serverMsg,
					},
				};
			})();
		case "login":
			return (() => {
				rootStore.userInfoStore.setUserToken(response.data.results.accessToken);
				login(response.data.results);
				return response;
			})();
		default:
			return response;
	}
};

axiosConfig.interceptors.response.use(
	response => {
		// 응답 상태 분기
		const responseState = () => {
			const url = response.config.url;
			let responseState = "";

			switch (true) {
				case response.data.serverCode.indexOf("0029") >= 0:
					return (responseState = "isResponseError");
				case response.data.serverCode.indexOf("002") >= 0:
					return (responseState = "expiredToken");
				case response.data.serverCode.indexOf("119") >= 0:
					return (responseState = "expiredToken");
				case response.data.serverCode.indexOf("111") >= 0:
					return (responseState = "expiredToken");
				case (url?.indexOf("logout") || "") >= 0:
					return (responseState = "logout");
				case response.data.serverCode !== "200":
					return (responseState = "isResponseError");
				case response.data.serverCode.indexOf("ERR") >= 0:
					return (responseState = "isResponseError");
				case (url?.indexOf("login") || "") >= 0:
					return (responseState = "login");
			}
			return responseState;
		};

		return handleResponseException(response, responseState());
	},
	error => {
		return Promise.reject(error);
	}
);

export default axiosConfig;
