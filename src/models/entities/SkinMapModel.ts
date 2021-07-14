import { Instance, types } from "mobx-state-tree";

export type SkinMapType = Instance<typeof SkinMapProps>;

const Hospital = types.model({
	key: types.string,
	location: types.string,
	customername: types.string,
	isYeoshin: types.boolean,
	station: types.string,
	review: types.string,
	eventCount: types.string,
	starPoint: types.string,
	starCount: types.string,
	hospitalImage: types.string,
});

const Product = types.model({
	displayname: types.string,
	productname: types.string,
	thumbnailimageurl: types.string,
	station: types.string,
	price: types.number,
	rateScore: types.number,
	productcode: types.string,
});

const PositionLocation = types.model({
	lat: types.string,
	lng: types.string,
});

const HospitalInformation = types.model({
	key: types.string,
	location: types.string,
	customername: types.string,
	isYeoshin: types.boolean,
	station: types.string,
	review: types.string,
	eventCount: types.string,
	starPoint: types.string,
	starCount: types.string,
	hospitalImage: types.string,
});

const Address = types.model({
	city: types.string,
	add1: types.string,
	add2: types.string,
});

const SkinmapData = types.model({
	hospital: types.array(types.frozen(Hospital)),
	product: types.array(types.frozen(Product)),
});

const StoreCount = types.model({ event: types.number, hospital: types.number });

const sendData = types.model({
	keyword: types.string,
	sortType: types.string,
	limit: types.string,
	form: types.string,
	productLimit: types.string,
	productFrom: types.string,
	latitude: types.string,
	longitude: types.string,
	radius: types.string,
	mobileReservationYn: types.string,
	parkingYn: types.string,
	yeoshinEventYn: types.string,
	coronaSafetyHospitalYn: types.string,
	memberId: types.string,
	remoteIp: types.string,
});

const detailSendData = types.model({
	limit: types.string,
	form: types.string,
	memberId: types.string,
	remoteIp: types.string,
	productLimit: types.string,
	productFrom: types.string,
	customerCodes: types.string,
});

export const SkinMapProps = types.model({
	skinMapResults: SkinmapData,
	hospital: types.optional(
		types.array(types.array(types.frozen(Hospital))),
		[]
	),
	spin: types.boolean,
	center: PositionLocation,
	query: sendData,
	detailSendData: detailSendData,
	search: types.string,
	filter: types.optional(types.array(types.string), []),
	beforeFilter: types.optional(types.array(types.string), []),
	currentAddress: Address,
	storeCount: StoreCount,
	level: types.number,
	productIndex: types.number,
	hospitalIndex: types.number,
	isHospitalListShow: types.boolean,
	hospitalMenuList: types.optional(
		types.array(types.frozen(HospitalInformation)),
		[]
	),
	noResult: types.model({
		sheet: types.boolean,
		toast: types.boolean,
		text: types.string,
	}),
	hospitalShow: types.boolean,

	skinMapText: types.model({ event: types.string, hospital: types.string }),
	radius: types.string,
	eventProperties: types.model({
		showEventCount: types.number,
	}),
	isToggleShow: types.boolean,
	resultKeyword: types.string,
	currentCustomerscode: types.optional(types.array(types.string), []),
	skinMapSearchState: types.string,
	productOneLocation: PositionLocation,
});
