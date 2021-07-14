import { AxiosResponse } from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO

export const removeDuplicateItems = (arr: any[]) => {
	return arr.reduce((accumulator, currentValue) => {
		if (accumulator.indexOf(currentValue) === -1) {
			accumulator.push(currentValue);
		}
		return accumulator;
	}, []);
};

export const removeDuplicateItemsByKey = (arr: any[], items: string) => {
	return arr.filter((v, i, a) => a.findIndex(t => t[items] === v[items]) === i);
};

export const returnDuplicateItem = (arr: string[]) => {
	return arr.filter(function (itm, i) {
		return arr.lastIndexOf(itm) === i && arr.indexOf(itm) !== i;
	});
};

export const findIndex = (arr: AxiosResponse["data"][], key: string) => {
	const index = arr.findIndex((item: { key: string }) => item.key === key);
	return index;
};
