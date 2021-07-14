import { AxiosResponse } from "axios";
export const getCouponMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;
	const mappedData = data.map((item: AxiosResponse["data"]) => {
		return {
			limit: item.coLimit,
			key: item.coNo,
			price: item.coPrice,
			isUse: item.coUse,
			expired: item.expireDay,
			name: item.coName,
		};
	});
	const result = { data: mappedData, totalCount: res.totalCount };
	return result;
};
