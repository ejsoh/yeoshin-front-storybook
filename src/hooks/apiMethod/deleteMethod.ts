import axiosConfig from "services/utils/requestConfig";

import { AxiosResponse } from "axios";
import { apiHeader } from "./useApiData";

// url정보와 서버로 보낼 body 타입 정의
type DeleteData = {
	status?: boolean;
	isToken?: boolean;
	url: string;
	success?: (res: AxiosResponse["data"]) => void;
	fail: (err: AxiosResponse["data"]) => void;
	infinitePending?: boolean;
	every?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
	chainingExcute?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
};

export const deleteMethod = (initialData?: DeleteData) => {
	const instance = axiosConfig;

	const response = (ip?: string) => {
		return {
			instance: instance({
				method: "delete",
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
