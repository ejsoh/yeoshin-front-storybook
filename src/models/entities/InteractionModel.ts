import { Instance, types } from "mobx-state-tree";

export type InteractionType = Instance<typeof InteractionProps>;

export const InteractionProps = types.model({
	isShow: types.boolean,
	isSearchResultShow: types.boolean,
	isSearchFilterShow: types.boolean,
	searchFilter: types.string,
	searchResultMenu: types.string,
	isEventShow: types.boolean,
	isShake: types.boolean,
	currentSwipeIndex: types.number,
	year: types.number,
	month: types.number,
	day: types.number,
	dayBymonth: types.number,
	currentPage: types.number,
	currentScoll: types.boolean,
	mainBannerIsShow: types.boolean,
	popupEvent: types.boolean,
	inputValue: types.optional(types.frozen(), {}),
	pageInfo: types.optional(types.frozen(), {}),
	validationMsg: types.optional(types.frozen(), {}),
	isAlert: types.optional(types.frozen(), {}),
	isComfirm: types.optional(types.frozen(), {}),
});
