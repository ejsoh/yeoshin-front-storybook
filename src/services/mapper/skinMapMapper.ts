import { AxiosResponse } from "axios";
import { groupByCloseLocation } from "helper/groupHelper";
import { rootStore } from "../../models/RootStore";

const store = rootStore;

export type Hospital = {
	key: string;
	location: string;
	customername: string;
	isYeoshin: boolean;
	station: string;
	review: string;
	eventCount: string;
	starPoint: string;
	starCount: string;
	hospitalImage: string;
};

type ProductType = {
	displayname: string;
	productname: string;
	thumbnailimageurl: string;
	locationname: string;
	price: number;
	ratescore: number;
	reviewcount: number;
	productcode: string;
};

const productMapper = (item: ProductType) => {
	return {
		displayname: item.displayname,
		productname: item.productname,
		thumbnailimageurl: item.thumbnailimageurl,
		station: item.locationname,
		price: item.price,
		rateScore: item.ratescore / item.reviewcount,
		productcode: item.productcode,
	};
};

export const hospitalMapping = (hospital: AxiosResponse["data"]) => {
	// 비슷한 위도, 경도로 그룹화
	return hospital.map(
		(item: {
			hospitalcode: string;
			hospitalname: string;
			mi_loc: string;
			reviewcnt: number;
			eventcnt: number;
			mi_thumb_img?: string;
			ratescore: string;
			location: string;
		}) => {
			return {
				key: item.hospitalcode,
				customername: item.hospitalname,
				station: item.mi_loc,
				review: item.reviewcnt.toString(),
				eventCount: item.eventcnt.toString(),
				starPoint: (parseInt(item.ratescore) / item.reviewcnt).toFixed(1),
				starCount: item.reviewcnt.toString(),
				isYeoshin: item.eventcnt > 0,
				hospitalImage: item.mi_thumb_img ?? "",
				location: item.location,
			};
		}
	);
};
export const productMapping = (product: AxiosResponse["data"]) => {
	return product.map((item: ProductType) => productMapper(item));
};

type HospitalType = {
	key: string;
	hospitalcode: string;
	hospitalname: string;
	mi_loc: string;
	reviewcnt: number;
	eventcnt: number;
	mi_thumb_img?: string;
	ratescore: string;
	location: string;
};

const HospitalLocationMapper = (hospital: AxiosResponse["data"]) => {
	// 비슷한 위도, 경도로 그룹화
	return (hospital as HospitalType[][]).map(items =>
		items.map(
			(item: {
				hospitalcode: string;
				hospitalname: string;
				mi_loc: string;
				reviewcnt: number;
				eventcnt: number;
				mi_thumb_img?: string;
				ratescore: string;
				location: string;
			}) => {
				return {
					key: item.hospitalcode,
					customername: item.hospitalname,
					station: item.mi_loc,
					review: item.reviewcnt.toString(),
					eventCount: item.eventcnt.toString(),
					starPoint: (parseInt(item.ratescore) / item.reviewcnt).toFixed(1),
					starCount: item.reviewcnt.toString(),
					isYeoshin: item.eventcnt > 0,
					hospitalImage: item.mi_thumb_img ?? "",
					location: item.location,
				};
			}
		)
	);
};

export const onlyHospitalMapping = (result: AxiosResponse["data"]) => {
	store.skinMapStore.setHospital(
		HospitalLocationMapper(
			Object.values(groupByCloseLocation(result, "location"))
		)
	);
};
