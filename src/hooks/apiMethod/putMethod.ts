import { AxiosResponse } from "axios";
import { axiosConfig } from "../../services";
import { apiHeader } from "./useApiData";

// url정보와 서버로 보낼 body 타입 정의
export type PutMethodData = {
	url: string;
	isToken?: boolean;
	hasCustomHeader?: { [key: string]: string };
	body: { [key: string]: string } | FormData | string;
	success?: (res: AxiosResponse["data"]) => void;
	fail: (err: { errorName: string; msg: string }) => void;
	infinitePending?: boolean;
	every?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
	chainingExcute?: (res: AxiosResponse["data"]) => void;
};

export const putMethod = (initialData: PutMethodData) => {
	const instance = axiosConfig;

	const header =
		initialData?.body instanceof FormData
			? {
					...apiHeader,
					"content-type": "multipart/form-data",
			  }
			: initialData?.hasCustomHeader
			? { ...apiHeader, ...initialData?.hasCustomHeader }
			: { ...apiHeader, "content-type": "application/json" };

	const response = (ip?: string) => {
		return {
			instance: instance({
				method: "put",
				url: `${initialData?.url}`,
				data: initialData?.body,
				headers: { ...header, remoteIp: ip },
			}),
			infinitePending: initialData?.infinitePending,
			success: initialData?.success,
			fail: initialData?.fail,
			everyExecute: initialData?.every,
			chainingExcute: initialData?.chainingExcute,
		};
	};
	return response;
};
