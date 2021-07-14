/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { errorHandler } from "services";
import { rootStore } from "models/RootStore";
import { runInAction } from "mobx";
import { getStorage } from "services/utils/localStorage";
import { AUTH_TOKEN } from "services/utils/requestConfig";
import { getIpAction } from "services/utils/getIp";

type Data = {
	call: any[];
	stateAlwaysDone?: boolean;
	stateAlwaysPending?: boolean;
	inlinePending?: boolean;
};

export const useApiData = (data?: Data) => {
	const store = rootStore;
	const [callInfo, setApiCall] = React.useState<Data | undefined>(data);
	const initIp = getStorage("ip") || store.userInfoStore.getUserInfo().ip;

	const [ip, setIp] = React.useState(initIp);

	React.useEffect(() => {
		ip !== "" && (data || callInfo?.call.length) && promiseAll();
	}, [callInfo?.call.length, callInfo, ip]);

	const settingIp = (ip: string) => {
		setIp(ip);
	};
	ip || getIpAction(settingIp);

	const promiseAll = () => {
		const isPending = callInfo?.stateAlwaysDone
			? "done"
			: callInfo?.inlinePending
			? "inlinePending"
			: "pending";

		store.fetchStore.setState(isPending);

		callInfo &&
			Promise.all(
				callInfo?.call.map((item: any) => {
					return fetchData(item(ip));
				})
			).then(res => {
				const isError =
					res.filter(item => Object.keys(item).find(key => key === "invalid"))
						.length > 0;

				const state =
					callInfo?.stateAlwaysPending && !isError ? "pending" : "done";

				store.fetchStore.setState(state);
			});
	};

	return { setApiCall };
};

export const fetchData = async (fetch: { [key: string]: any }) => {
	const store = rootStore;

	try {
		const response = await fetch.instance;

		const excuteSuccess = () => {
			runInAction(() => {
				fetch.success && fetch.success(response.data);
			});
		};

		const excuteSetState = () => {
			store.fetchStore.setState(
				fetch.infinitePending ? "pending" : store.fetchStore.getState()
			);
		};
		const chainingExcuted = () => {
			fetch.chainingExcute &&
				fetchData(
					fetch.chainingExcute(response.data)(
						store.userInfoStore.getUserInfo().ip
					)
				);
		};

		// 항상 실행 (옵셔널)
		fetch.everyExecute && fetch.everyExecute(response.data);

		return Promise.all([excuteSuccess(), excuteSetState(), chainingExcuted()]);
	} catch (error) {
		const err = await error;
		const errorResult = errorHandler(err);

		store.fetchStore.setErrorData(errorResult);

		store.fetchStore.setState("errorDone");

		fetch.fail(errorResult);

		// 항상 실행 (옵셔널)
		fetch.everyExecute && fetch.everyExecute(err);
		return err;
	}
};
const token = AUTH_TOKEN ? { accessToken: AUTH_TOKEN } : {};
export const apiHeader = {
	...token,
	"Cache-Control": "no-cache",
	"Access-Control-Allow-Origin": "*",
};
