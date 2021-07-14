import { AxiosResponse } from "axios";
export const yeoshinEventMapper = (response: AxiosResponse["data"]) => {
	const res = response.results;
	const data = res.map((item: AxiosResponse["data"]) => {
		return {
			key: item.buid,
			title: item.btitle,
			startDate: item.bsdate,
			endDate: item.bedate,
			reviewCount: item.btalkCount,
			image: item.bthumb,
		};
	});
	return { data: data, totalCount: response.totalCount };
};
