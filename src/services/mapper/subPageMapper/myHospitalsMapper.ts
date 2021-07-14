import { AxiosResponse } from "axios";

export const myHospitalsMapper = (res: AxiosResponse["data"]) => {
	const response = res.results;
	const data = response.map((item: AxiosResponse["data"]) => {
		return {
			key: item.id,
			location: item.miLoc,
			premiumImage: item.miPremiumThumbImg ?? "",
			image: item.miThumbImg ?? "",
			name: item.cname,
			eventCount: item.totalEventCnt,
			reviewCount: item.totalRvCnt,
			isPremium: item.miPremiumUse,
			badge: "",
			isLike: true,
		};
	});
	return { data: data, totalCount: res.totalCount };
};

export const findHospitalMapper = (
	res: AxiosResponse["data"],
	likeList: string[]
) => {
	const response = res.results;

	const data = response.map((item: AxiosResponse["data"]) => {
		return {
			key: item.id,
			location: item.miLoc,
			premiumImage: item.miPremiumThumbImg ?? "",
			image: item.miThumbImg,
			name: item.cname,
			eventCount: item.totalEventCnt,
			reviewCount: item.totalRvCnt,
			isPremium: item.miPremiumUse,
			badge: item.iiImg ?? "",
			isLike: likeList.indexOf(item.id) >= 0,
		};
	});
	return { findHospital: data, totalCount: res.totalCount, likeList: likeList };
};
