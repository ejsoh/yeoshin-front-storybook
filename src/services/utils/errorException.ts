import {
	authErrorMessage,
	networkConnectErrorMessage,
	serverErrorMessage,
	timeOutErrorMessage,
} from "constantDatas";

import { AxiosResponse } from "axios";

// response status 에러 핸들러
const responseError = (err: { [key: string]: string | number | boolean }) => {
	const isAuthError = err.status === 401;
	const authErrorInfo = {
		code: err.status,
		msg: authErrorMessage,
		errorName: "authError",
	};

	const isServerError = err.status === 500;
	const serverErrorInfo = {
		code: err.status,
		msg: serverErrorMessage,
		errorName: "serverError",
	};

	return (
		(isAuthError && authErrorInfo) ||
		(isServerError && serverErrorInfo) ||
		unexpectedError(err)
	);
};

// request 에러 핸들러
const requestError = (err: { [key: string]: string | number | boolean }) => {
	const isNetworkConnected = navigator.onLine;
	const networkConnectErrorInfo = {
		msg: networkConnectErrorMessage,
		errorName: "networkConnectError",
	};

	const isTimeout = err.code === "ECONNABORTED";
	const timeOutErrorInfo = {
		msg: timeOutErrorMessage,
		errorName: "timeout",
	};

	return (
		(isNetworkConnected && networkConnectErrorInfo) ||
		(isTimeout && timeOutErrorInfo) ||
		unexpectedError(err)
	);
};

// 서버 메세지 에러 핸들러
const invalidError = (err: { [key: string]: string | number | boolean }) => ({
	errorName: "invalidError",
	code: err.status,
	msg: err.msg,
});

// 알수 없는 에러 핸들러

const unexpectedError = (err: AxiosResponse["data"]) => {
	return {
		errorName: "unexpectedError",
		msg: err.msg,
	};
};

export const errorHandler = (err: AxiosResponse["data"]) => {
	const isResponseError = err.response !== undefined;
	const isRequestError = err.request !== undefined;
	const isInvalidError = err.invalid !== undefined;

	return (
		(isResponseError && responseError(err.response)) ||
		(isRequestError && requestError(err.request)) ||
		(isInvalidError && invalidError(err.invalid)) ||
		unexpectedError(err)
	);
};
