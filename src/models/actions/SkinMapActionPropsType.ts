export type HospitalDetailInfo = {
	key: string;
	customername: string;
	station: string;
	review: string;
	eventCount: string;
	starPoint: string;
	starCount: string;
	isYeoshin: boolean;
	hospitalImage: string;
	location: string;
};

export const filterChips = [
	{
		title: "여신 이벤트",
		icon: "pinkCheck",
		filter: "yeoshinEventYn",
	},
	{
		title: "모바일 예약",
		icon: "yellowCheck",
		filter: "mobileReservationYn",
	},
	{
		title: "주차 가능",
		icon: "greenCheck",
		filter: "parkingYn",
	},
	{
		title: "코로나 안심",
		icon: "blueCheck",
		filter: "coronaSafetyHospitalYn",
	},
];

export type Product = {
	displayname: string;
	productname: string;
	thumbnailimageurl: string;
	station: string;
	price: number;
	rateScore: number;
	productcode: string;
};

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
export const filterDefaultType = {
	mobileReservationYn: "N",
	parkingYn: "N",
	yeoshinEventYn: "N",
	coronaSafetyHospitalYn: "N",
};

export type NoResult = {
	result: boolean;
	text?: string;
	filter?: boolean;
};

export type TypeSkinMapText = {
	eventText: string;
	hospitalText: string;
};
