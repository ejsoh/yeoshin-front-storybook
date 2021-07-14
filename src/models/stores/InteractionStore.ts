import { InteractionAction } from "./../actions/InteractionAction";
import { InteractionProps } from "models/entities/InteractionModel";
import { InteractionViews } from "./../views/InteractionViews";

export const InteractionStore = InteractionProps.actions(
	InteractionAction
).views(InteractionViews);

const currentDate = new Date();
export const defaultData = {
	isShow: false,
	isSearchResultShow: false,
	isSearchFilterShow: false,
	searchFilter: "추천순",
	searchResultMenu: "이벤트",
	isEventShow: false,
	isShake: false,
	currentSwipeIndex: 0,
	year: currentDate.getFullYear(),
	month: currentDate.getMonth() + 1,
	day: currentDate.getDate(),
	dayBymonth: new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		0
	).getDate(),
	currentPage: 1,
	currentScoll: true,
	mainBannerIsShow: false,
	popupEvent: false,
	inputValue: {},
	pageInfo: {},
	validationMsg: {},
	isAlert: { message: "", isShow: false },
	isComfirm: { message: "", isShow: false },
};

export const interactionStore = InteractionStore.create(defaultData);
