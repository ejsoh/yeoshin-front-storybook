/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosConfig, errorHandler } from "../services";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { rootStore } from "./../models/RootStore";
import { runInAction } from "mobx";

// url정보와 서버로 보낼 body 타입 정의
type GetData<R> = {
	status?: boolean;
	isToken?: boolean;
	url: string;

	success: (res: AxiosResponse["data"]) => void;
	fail: (err: { errorName: string; msg: string }) => R;
	isPending?: boolean;
	infinitePending?: boolean;
	every?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
};

type InitialData<R> = {
	status?: boolean;
	isToken?: boolean;
	method?: any;
	initialData?: {
		url: string;
		success: (res: AxiosResponse["data"]) => void;
		fail: (err: { errorName: string; msg: string }) => R;
		isPending?: true;
		infinitePending?: boolean;
		every?: (res: AxiosResponse["data"]) => void; // 항상 실행 (옵셔널)
	};
};
const useGetDataApi = <R>({ status = true, initialData }: InitialData<R>) => {
	const [dataInfo, setGetData] = useState<GetData<R> | undefined>(initialData);

	// 스토어를 가져온다.
	const store = rootStore;

	useEffect(() => {
		// 서버 통신 상태 업데이트

		const fetchData = async () => {
			const isPending =
				dataInfo?.isPending === undefined ? true : dataInfo?.isPending;

			isPending && store.fetchStore.setState("pending");
			const instance = axiosConfig;

			try {
				const response = await instance({
					method: "get",
					url: `${dataInfo?.url}`,
				});
				// 서버 response 결과
				const result = await response;

				const excuteSuccess = () => {
					runInAction(() => {
						dataInfo?.success(result.data);
					});
				};

				const excuteSetState = () => {
					store.fetchStore.setState(
						dataInfo?.infinitePending ? "pending" : "done"
					);
				};

				await Promise.all([excuteSuccess(), excuteSetState()]);

				// 항상 실행 (옵셔널)
				dataInfo?.every && dataInfo?.every(result.data);
			} catch (error) {
				const err = await error;

				const errorResult = errorHandler(err);

				const excuteFail = () => {
					runInAction(() => {
						dataInfo?.fail(errorResult);
						store.fetchStore.setErrorData(errorResult);
					});
				};

				const excuteSetFailState = () => {
					dataInfo?.infinitePending
						? store.fetchStore.setState("error")
						: store.fetchStore.setState(status ? "errorDone" : "error");
				};

				await Promise.all([excuteFail(), excuteSetFailState()]);

				// 항상 실행 (옵셔널)
				dataInfo?.every && dataInfo?.every(error);
			}
		};
		if (dataInfo) {
			fetchData();
		}
	}, [dataInfo?.url]);

	return { setGetData };
};

export default useGetDataApi;
