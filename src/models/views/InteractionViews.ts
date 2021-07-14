import { InteractionType } from "./../entities/InteractionModel";

export const InteractionViews = (self: InteractionType) => ({
	getIsShow: () => {
		return self.isShow;
	},
	getIsEventShow: () => {
		return self.isEventShow;
	},
	getSwipeIndex: () => {
		return self.currentSwipeIndex;
	},
	getIsShake: () => {
		return self.isShake;
	},
	getDayByMonth: () => {
		return self.dayBymonth;
	},
	getDate: () => {
		return self;
	},
	getCurrentPageIndex: () => {
		return self.currentPage;
	},
	getCurrentScroll: () => {
		return self.currentScoll;
	},
	getMainBannerIsShow: () => {
		return self.mainBannerIsShow;
	},
	getInputValues: () => {
		return self.inputValue;
	},
	getPageInfo: () => {
		return self.pageInfo;
	},
	getPopEventShow: () => {
		return self.popupEvent;
	},
	getValidationMessage: () => {
		return self.validationMsg;
	},
	getIsAlert: () => {
		return self.isAlert;
	},
	getIsComfirm: () => {
		return self.isComfirm;
	},
});
