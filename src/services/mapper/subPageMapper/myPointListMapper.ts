import { AxiosResponse } from "axios";

export const myPointListMapper = (res: AxiosResponse["data"]) => {
	const log = res.results.actionLogs;
	const data = log.map((item: AxiosResponse["data"]) => {
		return {
			date: item.acRegidate,
			title: item.acTitle,
			point: item.acPoint,
		};
	});
	return {
		data: data,
		loginCount: res.results.loginCount,
		talkCount: res.results.productTalkCount,
		totalCount: res.totalCount,
	};
};
export const pointListMapper = (res: AxiosResponse["data"]) => {
	const result = res.results;
	const data = result.map((item: AxiosResponse["data"]) => {
		return {
			key: item.pointNo,
			date: item.pointRegidate.split(" ")[0].replaceAll("-", "."),
			title: item.pointTitle,
			point: item.pointPoint,
			isUseText: item.pointPoint > 0 ? "적립" : "사용",
			isUse: item.pointPoint > 0,
		};
	});
	return {
		point: data,
		totalCount: res.totalCount,
	};
};
