import { SkinMapAction } from "./../actions/SkinMapAction";
import { SkinMapProps } from "models/entities/SkinMapModel";
import { SkinMapViews } from "models/views/SkinMapViews";
import { getQueryParams } from "helper";

export const SkinMapStore = SkinMapProps.actions(SkinMapAction).views(
	SkinMapViews
);

export const initSendData = {
	keyword: "",
	sortType: "",
	limit: "1000",
	form: "0",
	productLimit: "10",
	productFrom: "",
	latitude: "37.50188",
	longitude: "127.02621",
	radius: "1km",
	mobileReservationYn: "N",
	parkingYn: "N",
	yeoshinEventYn: "N",
	coronaSafetyHospitalYn: "N",
	memberId: "",
	remoteIp: "192.168.2.0",
};

const initDetailSendData = {
	limit: "100",
	form: "0",
	memberId: "",
	remoteIp: "00000",
	productLimit: "10",
	productFrom: "",
	customerCodes: "",
};

const location = getQueryParams(
	["lat", "lng"],
	{
		lat: "37.50188",
		lng: "127.02621",
	},
	value => parseInt(value)
);

export const skinMapStore = SkinMapStore.create({
	skinMapResults: {
		hospital: [],
		product: [],
	},
	spin: false,
	center: {
		lat: location.lat,
		lng: location.lng,
	},
	search: "",
	query: initSendData,
	detailSendData: initDetailSendData,
	filter: [],
	beforeFilter: [],
	currentAddress: { city: "", add1: "", add2: "" },
	storeCount: { event: 0, hospital: 0 },
	level: 4,
	productIndex: 0,
	hospitalIndex: 0,
	isHospitalListShow: false,
	hospitalMenuList: [],
	noResult: { sheet: false, toast: false, text: "" },
	hospitalShow: false,
	skinMapText: { event: "이 시술은 어때요?", hospital: "이 병원은 어때요?" },
	radius: "1km",
	eventProperties: {
		showEventCount: 0,
	},
	isToggleShow: false,
	resultKeyword: "",
	currentCustomerscode: [],
	skinMapSearchState: "",
	productOneLocation: {
		lat: location.lat,
		lng: location.lng,
	},
});
