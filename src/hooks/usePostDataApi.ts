/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosConfig, errorHandler } from "../services";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import qs from "qs";
import { rootStore } from "../models/RootStore";

// url정보와 서버로 보낼 body 타입 정의
export type PostMethodInfo<R> = {
	url: string;
	isToken?: boolean;
	hasCustomHeader?: { [key: string]: string };

	body: { [key: string]: string } | FormData | string;
	success: (res: AxiosResponse["data"]) => void;
	fail: (err: { errorName: string; msg: string }) => R;
	isPending?: boolean;
	infinitePending?: boolean;
	isForm?: boolean;
};

type InitialData<R> = {
	status?: boolean;
	isToken?: boolean;
	method?: any;
	hasCustomHeader?: { [key: string]: string };
	isForm?: any;
	initialData?: {
		url: string;
		body: { [key: string]: string } | FormData | string;
		success: (res: AxiosResponse["data"]) => void;
		fail: (err: { errorName: string; msg: string }) => R;
		isPending?: true;
		infinitePending?: false;
	};
};

export const usePostDataApi = <R>({
	status = true,
	initialData,
}: InitialData<R>) => {
	const [dataInfo, setPostData] = useState<PostMethodInfo<R> | undefined>(
		initialData
	);

	// 스토어를 가져온다.
	const store = rootStore;
	useEffect(() => {
		dataInfo?.url && fetchData();
	}, [
		dataInfo?.url,
		dataInfo?.body,
		status,
		// store.fetchStore,
		// store.userInfoStore.getUserIp(),
		// store.userInfoStore.getUserId(),
	]);

	const fetchData = async () => {
		const instance = axiosConfig;

		dataInfo?.body instanceof FormData &&
			Object.assign(instance.defaults.headers, {
				"content-type": "multipart/form-data",
			});

		const isPending =
			dataInfo?.isPending === undefined ? true : dataInfo?.isPending;

		isPending && store.fetchStore.setState("pending");

		try {
			const response = await instance({
				method: "post",
				url: `${dataInfo?.url}`,
				data:
					dataInfo?.body instanceof FormData
						? dataInfo?.body
						: qs.stringify(dataInfo?.body),
			});

			// 서버 response 결과
			const result = await response;

			const excuteSuccess = () => dataInfo?.success(result.data);

			const excuteSetState = () =>
				store.fetchStore.setState(
					dataInfo?.infinitePending ? "pending" : "done"
				);

			await Promise.all([excuteSuccess(), excuteSetState()]);
		} catch (error) {
			const err = await error;
			const errorResult = errorHandler(err);
			dataInfo?.fail(errorResult);
			store.fetchStore.setErrorData(errorResult);
			store.fetchStore.setState(status ? "errorDone" : "error");
		}
	};
	return { setPostData, initialData };
};
