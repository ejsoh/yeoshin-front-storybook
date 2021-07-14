import { AxiosResponse } from "axios";
export const wishListMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;
	const result = data.map((item: AxiosResponse["data"]) => {
		return {
			image: item.prolistImg,
			location: item.rssarea1,
			title: item.name,
			key: item.code,
			price: item.price,
		};
	});
	return { data: result, totalCount: res.totalCount };
};
