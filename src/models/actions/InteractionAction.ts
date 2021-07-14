import { AxiosResponse } from "axios";
import { customAlert } from "constantDatas/serviceMessage";
import { isEmpty, isNotEmpty } from "helper/checkEmptyHelper";
import { InteractionType } from "./../entities/InteractionModel";

export const InteractionAction = (self: InteractionType) => ({
	setIsShow: (isShow: boolean) => {
		self.isShow = isShow;
	},
	setIsEventShow: (isShow: boolean) => {
		self.isEventShow = isShow;
	},
	setIsSearchResultShow: (isSearchResultShow: boolean) => {
		self.isSearchResultShow = isSearchResultShow;
	},
	setIsSearchtFilterShow: (isSearchFilterShow: boolean) => {
		self.isSearchFilterShow = isSearchFilterShow;
	},
	setSearchFilter: (searchFilter: string) => {
		self.searchFilter = searchFilter;
	},
	setSearchResultMenu: (searchResultMenu: string) => {
		self.searchResultMenu = searchResultMenu;
	},
	setSwipeAction: (currentIndex: number) => {
		self.currentSwipeIndex = currentIndex;
	},
	setIsShake: (isShake: boolean) => {
		self.isShake = isShake;
	},
	setYear: (year: string) => {
		isEmpty(year)
			? (self.year = 0)
			: ((self.year = parseInt(year)),
			  (self.dayBymonth = new Date(parseInt(year), self.month, 0).getDate()));
	},
	setMonth: (month: string) => {
		isEmpty(month)
			? (self.month = 0)
			: ((self.month = parseInt(month)),
			  (self.dayBymonth = new Date(self.year, parseInt(month), 0).getDate()));
	},
	setDay: (day: string) => {
		isEmpty(day) ? (self.day = 0) : (self.day = parseInt(day));
	},
	setCurrentPageIndex: (index: number) => {
		self.currentPage = index;
	},
	setCurrentScroll: (isShow: boolean) => {
		self.currentScoll = isShow;
	},
	setMainBannerIsShow: (isShow: boolean) => {
		self.mainBannerIsShow = isShow;
	},
	setPopUpEventShow: (isShow: boolean) => {
		self.popupEvent = isShow;
	},
	setInputValue: (value: AxiosResponse["data"]) => {
		self.inputValue = value;
	},
	setPageInfo: (item: AxiosResponse["data"]) => {
		self.pageInfo = item;
	},

	setValidationMessage: (msg: AxiosResponse["data"]) => {
		self.validationMsg = msg;
	},
	setIsAlert: (text: JSX.Element | string, excute?: () => void) => {
		const messageStyle = typeof text === "string" ? customAlert(text) : text;

		const closeExcute =
			excute && isNotEmpty(text) ? { excute: excute } : { excute: undefined };

		self.isAlert.excute && self.isAlert.excute();
		self.validationMsg = {};

		isEmpty(text)
			? (document.body.style.overflow = "visible")
			: (document.body.style.overflow = "hidden");
		self.isAlert = {
			...self.isAlert,
			message: messageStyle,
			isShow: isNotEmpty(text),
			...closeExcute,
		};
	},
	setIsConfirm: (
		text: string,
		isShow: boolean,
		isCancel: boolean,
		excute?: () => void
	) => {
		const closeExcute = excute && { excute: excute };
		!isCancel && self.isComfirm.excute();
		self.validationMsg = {};
		isShow
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "visible");

		self.isComfirm = {
			...self.isComfirm,
			message: text,
			isShow: isShow,

			...closeExcute,
		};
	},
});
