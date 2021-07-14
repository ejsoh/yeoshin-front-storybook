import dotenv from "dotenv";
import { checkEmptyHelper } from "./checkEmptyHelper";
dotenv.config();

export const queryParams = (url: string, param: string[][]) => {
	const parsingUrl = new URL(url);
	const params = parsingUrl.searchParams;
	param.map(item => params.set(item[0], item[1]));

	return parsingUrl.toString();
};

export const queryParamswithURL = (param: string[][]) => {
	const parsingUrl = new URL(`${process.env.REACT_APP_BASE_URL}`);
	const params = parsingUrl.searchParams;
	const urlLength = `${process.env.REACT_APP_BASE_URL}`.length;
	param.map(item => params.set(item[0], item[1]));
	const result = parsingUrl.toString().slice(urlLength);

	return result;
};

export const getQueryParams = (
	key: string[],
	initValue: Record<string, string>,
	checkValue?: (value: string) => void
) => {
	const getParamsId = new URLSearchParams(window.location.search);

	const result = key.reduce((first, second) => {
		first[second] = getParamsId.get(second) ?? "";
		return first;
	}, {} as Record<string, string>);
	const emptyCheck = Object.values(result);
	const defaultValue =
		checkValue && checkEmptyHelper(emptyCheck) ? checkValue(result.lat) : true;
	return checkEmptyHelper(emptyCheck) && defaultValue ? result : initValue;
};
export const getQueryParam = (key: string) => {
	const getParamsId = new URLSearchParams(window.location.search);

	return getParamsId.get(key) ?? "";
};
