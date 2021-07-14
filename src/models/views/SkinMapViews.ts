import { SkinMapType } from "models/entities/SkinMapModel";

export const SkinMapViews = (self: SkinMapType) => ({
	getSkinMapRestuls: () => {
		return self.skinMapResults;
	},
	getHospital: () => {
		return self.hospital;
	},
	getIsSpin: () => {
		return self.spin;
	},
	getCenterPosition: () => {
		return self.center;
	},
	getQuery: () => {
		return self.query;
	},
	getSearch: () => {
		return self.search;
	},
	getFilterKeyword: () => {
		return self.filter;
	},

	getCurrentAddress: () => {
		return self.currentAddress;
	},
	getStoreCount: () => {
		return self.storeCount;
	},
	getLevel: () => {
		return self.level;
	},
	getProductIndex: () => {
		return self.productIndex;
	},
	getHospitalIndex: () => {
		return self.hospitalIndex;
	},
	getIsHospitalListShow: () => {
		return self.isHospitalListShow;
	},
	getHospitalMenuList: () => {
		return self.hospitalMenuList;
	},
	getNoResult: () => {
		return self.noResult;
	},
	gethospitalShow: () => {
		return self.hospitalShow;
	},
	getSkinMapSearchState: () => {
		return self.skinMapSearchState;
	},
	getSkinMapText: () => {
		return self.skinMapText;
	},
	getEventProperties: () => {
		return self.eventProperties;
	},
	getIsToggleShow: () => {
		return self.isToggleShow;
	},
	getResultKeyword: () => {
		return self.resultKeyword;
	},
	getCurrentCustomersCode: () => {
		return self.currentCustomerscode;
	},
	getProductOneLocation: () => {
		return self.productOneLocation;
	},
	getDetailSendData: () => {
		return self.detailSendData;
	},
});
