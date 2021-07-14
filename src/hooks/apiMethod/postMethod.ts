import { AxiosResponse } from "axios";
import { axiosConfig } from "../../services";
import qs from "qs";
import { apiHeader } from "./useApiData";

// url정보와 서버로 보낼 body 타입 정의
export type PostMethodInfo = {
	url: string;
	isToken?: boolean;
	hasCustomHeader?: { [key: string]: string };
	body: { [key: string]: string } | FormData | string;
	success?: (res: AxiosResponse["data"]) => void;
	fail: (err: { errorName: string; msg: string }) => void;
	infinitePending?: boolean;
	every?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
	chainingExcute?: (res: AxiosResponse["data"]) => void;
	isEmptyHeader?: boolean;
	isFormData?: boolean;
};

export const postMethod = (initialData?: PostMethodInfo) => {
	const instance = axiosConfig;

	const header = () => {
		switch (true) {
			case initialData?.isEmptyHeader:
				return {};
			case initialData?.isFormData:
				return { ...apiHeader, "content-type": "multipart/form-data" };

			default:
				return {
					...apiHeader,
					"content-type": "application/x-www-form-urlencoded",
				};
		}
	};

	const response = (ip?: string) => {
		const headerSetting = initialData?.isEmptyHeader
			? header()
			: { ...header(), remoteIp: ip };
		return {
			instance: instance({
				method: "post",
				url: `${initialData?.url}`,
				data: initialData?.isFormData
					? initialData?.body
					: qs.stringify(initialData?.body),
				headers: headerSetting,
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
