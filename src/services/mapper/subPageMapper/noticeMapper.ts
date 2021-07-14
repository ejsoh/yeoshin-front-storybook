import { AxiosResponse } from "axios";
export const noticeMapper = (response: AxiosResponse["data"]) => {
	const res = response.results;
	const data = res.map((item: AxiosResponse["data"]) => {
		return {
			title: item.btitle,
			date: item.brdate.split(" ")[0],
			key: item.binid,
			link: item.buid,
		};
	});
	return { data: data, totalCount: response.totalCount };
};

export const faqMapper = (response: AxiosResponse["data"]) => {
	const res = response.results;
	const data = res.map((item: AxiosResponse["data"]) => {
		return {
			title: item.btitle,
			key: item.buid,
			content: item.bcontent,
		};
	});
	return { data: data, totalCount: response.totalCount };
};
