import {
	Hospital,
	HospitalDetailInfo,
	NoResult,
	Product,
	TypeSkinMapText,
	filterChips,
	filterDefaultType,
} from "./SkinMapActionPropsType";
import { cast, flow } from "mobx-state-tree";
import { SkinMapType } from "models/entities/SkinMapModel";
import { ellipsis } from "helper";
import { eventTracking } from "services/utils/analystics/amplitude";
import { rootStore } from "models/RootStore";

const delay = async () => {
	const start = await new Promise(resolve => setTimeout(resolve, 1400));
	return start;
};

export const SkinMapAction = (self: SkinMapType) => ({
	setSkinMapResults: (data: { hospital: Hospital[]; product: Product[] }) => {
		const store = rootStore;
		store.interactionStore.setIsEventShow(false);
		self.skinMapResults = { ...cast(data) };
	},
	setHospital: (hospital: Hospital[][]) => {
		self.hospital = cast(hospital);
	},
	setIsSpin: (isShow: boolean) => {
		self.spin = isShow;
	},
	setCenterPosition: ({ lat, lng }: { lat: string; lng: string }) => {
		self.center = { lat: lat, lng: lng };
	},
	setQueryPosition: ({ lat, lng }: { lat: string; lng: string }) => {
		self.query = { ...self.query, latitude: lat, longitude: lng };
	},
	setRadius: (radius: string) => {
		self.noResult = {
			...self.noResult,
			text: "검색결과가 없습니다.",
		};
		self.query = { ...self.query, radius: radius };
		self.radius = radius;
	},
	setSearchParams: (keyword: string) => {
		self.query = { ...self.query, keyword: keyword };
		self.noResult =
			keyword !== ""
				? {
						...self.noResult,
						text: `'${ellipsis(
							keyword,
							7,
							"..."
						)}'에 대한 검색결과가 없습니다.`,
				  }
				: { ...self.noResult };
		self.search = keyword;
		self.radius = "1km";
	},
	setFilterKeyword: (keyword: string) => {
		const filterIndex = filterChips.findIndex(t => t.filter === keyword);
		eventTracking("SKIN_MAP_FILTER_KEYWORD", {
			filterKeyword: filterChips[filterIndex].title,
		});
		const find = self.filter.findIndex(e => e === keyword);
		find > -1 ? self.filter.splice(find, 1) : self.filter.push(keyword);

		const filter = self.filter.map(item => [item, "Y"]);
		const filiterToObject = Object.fromEntries(filter);
		self.query = {
			...self.query,
			...filterDefaultType,
			...filiterToObject,
		};
	},
	setResetFilterKeyword: () => {
		self.filter = cast([]);
		self.query = {
			...self.query,
			...filterDefaultType,
		};
	},
	setReturnFilterKeyword: () => {
		const filterIndex = filterChips.findIndex(
			t => t.filter === self.filter[self.filter.length - 1]
		);

		self.noResult =
			self.filter.length > 0
				? {
						...self.noResult,
						text: `${filterChips[filterIndex].title} 병원이 없습니다.`,
				  }
				: { ...self.noResult };

		self.filter.pop();
		const filter = self.filter.map(item => [item, "Y"]);
		const filiterToObject = Object.fromEntries(filter);
		self.query = {
			...self.query,
			...filterDefaultType,
			...filiterToObject,
		};
	},
	setCurrentAddress: (address: SkinMapType["currentAddress"]) => {
		self.currentAddress = { ...address };
	},
	setStoreCount: (count: { event: number; hospital: number }) => {
		self.storeCount = { ...count };
	},
	setLevel: (level: number) => {
		self.level = level;
	},
	setProductIndex: (index: number) => {
		self.detailSendData = cast({
			...self.detailSendData,
			customerCodes: self.currentCustomerscode.toString(),
			productFrom: (index * 10).toString(),
		});

		self.query = { ...self.query, productFrom: (index * 10).toString() };
		self.productIndex = index;
	},
	setHospitalIndex: (index: number) => {
		self.hospitalIndex = index;
	},
	setHospitalMenuShow: (isShow: boolean) => {
		self.isHospitalListShow = isShow;
	},

	setHospitalMenuList: (list: HospitalDetailInfo[]) => {
		self.hospitalMenuList = cast(list);
	},

	setSkinMapNoResult: ({ result, text, filter }: NoResult) => {
		(result || filter) &&
			flow(function* () {
				yield delay();
				return (self.noResult = { ...self.noResult, toast: false });
			})();

		const textResult = text
			? {
					text: text,
					sheet: result,
					toast: filter ? filter : result,
			  }
			: {
					...self.noResult,
					sheet: result,
					toast: filter ? filter : result,
			  };

		self.noResult = textResult;
	},

	setIsHospitalShow: (result: boolean) => {
		self.hospitalShow = result;
	},
	setSkinMapText: ({ eventText, hospitalText }: TypeSkinMapText) => {
		self.skinMapText = { event: eventText, hospital: hospitalText };
	},
	setSkinMapDataReset: () => {
		self.skinMapResults = cast({
			hospital: [],
			product: [],
		});

		self.skinMapText = {
			event: "",
			hospital: "",
		};

		self.storeCount = {
			event: 0,
			hospital: 0,
		};
	},
	setEventProperties: (data: { showEventCount: number }) => {
		self.eventProperties = { ...self.eventProperties, ...data };
	},
	setSheetText: (search?: string) => {
		const resultText = search ? search : self.search;
		self.skinMapText =
			self.search !== ""
				? {
						event: `다음 '${ellipsis(resultText, 7, "...")}' 이벤트 어때요?`,
						hospital: `'${ellipsis(resultText, 7, "...")}' 병원을 확인하세요.`,
				  }
				: {
						event: "이 시술은 어때요?",
						hospital: "이 병원은 어때요?",
				  };
	},
	setHospitalSheetText: (name: string, length: number) => {
		self.skinMapText =
			length > 1
				? {
						event: `같은 위치의 ${length}개 병원 이벤트`,
						hospital: `같은 위치의 ${length}개 병원 정보`,
				  }
				: {
						event: `다음 '${ellipsis(name, 7, "...")}' 이벤트 어때요?`,
						hospital: `다음 '${ellipsis(name, 7, "...")}' 확인하세요.`,
				  };
	},
	setIndexReset: () => {
		self.query = { ...self.query, productFrom: "0" };
		self.detailSendData = { ...self.detailSendData, productFrom: "0" };
		self.productIndex = 0;
		self.hospitalIndex = 0;
	},
	setToggleShow: (isShow: boolean) => {
		self.isToggleShow = isShow;

		self.eventProperties = {
			showEventCount: isShow
				? self.eventProperties.showEventCount + 1
				: self.eventProperties.showEventCount,
		};
	},
	setSheetShow: ({
		event,
		hospital,
	}: {
		event: boolean;
		hospital: boolean;
	}) => {
		self.hospitalShow = hospital;
		self.isToggleShow = event;

		self.eventProperties = {
			showEventCount: event
				? self.eventProperties.showEventCount + 1
				: self.eventProperties.showEventCount,
		};
	},
	setSheetShowReset: () => {
		self.hospitalShow = false;
		self.isToggleShow = false;

		self.skinMapResults = cast({
			hospital: [],
			product: [],
		});

		self.skinMapText = {
			event: "",
			hospital: "",
		};

		self.productIndex = 0;
		self.hospitalIndex = 0;
		self.query = { ...self.query, productFrom: "0" };
		self.detailSendData = { ...self.detailSendData, productFrom: "0" };

		self.currentCustomerscode = cast([]);
	},

	setCurrentCustomersCode: (codes: string[]) => {
		self.detailSendData = {
			...self.detailSendData,
			customerCodes: codes.toString(),
		};
		self.currentCustomerscode = cast(codes);
	},
	setSkinMapState: (state: string) => {
		self.skinMapSearchState = state;
	},
	setProductOneLocation: (location: { lat: string; lng: string }) => {
		self.productOneLocation = location;
	},
});
