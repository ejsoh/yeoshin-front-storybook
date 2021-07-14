import axiosConfig, { AUTH_TOKEN } from "services/utils/requestConfig";

import { AxiosResponse } from "axios";
import { rootStore } from "models/RootStore";

// url정보와 서버로 보낼 body 타입 정의
type GetData = {
	status?: boolean;
	isToken?: boolean;
	url: string;
	success?: (res: AxiosResponse["data"]) => void;
	fail: (err: AxiosResponse["data"]) => void;
	infinitePending?: boolean;
	every?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
	chainingExcute?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
};

export const getMethod = (initialData?: GetData) => {
	const instance = axiosConfig;
	const store = rootStore;
	const apiHeader = {
		accessToken: AUTH_TOKEN ?? store.userInfoStore.getUserToken(),
		"Cache-Control": "no-cache",
		"Access-Control-Allow-Origin": "*",
	};
	const response = (ip?: string) => {
		return {
			instance: instance({
				method: "get",
				url: `${initialData?.url}`,
				headers: { ...apiHeader, remoteIp: ip },
			}),
			url: `${initialData?.url}`,
			infinitePending: initialData?.infinitePending,
			success: initialData?.success,
			fail: initialData?.fail,
			everyExecute: initialData?.every,
			chainingExcute: initialData?.chainingExcute,
		};
	};
	return response;
};
