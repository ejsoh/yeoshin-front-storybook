import { getQueryParam } from "helper";
import { UserInfoActions } from "models/actions/UserInfoActions";
import { UserInfoProps } from "models/entities/UserInfoModel";
import { UserInfoViews } from "models/views/UserInfoViews";

export const UserInfoStore = UserInfoProps.actions(UserInfoActions).views(
	UserInfoViews
);

export const userInfoStore = UserInfoStore.create({
	info: {
		name: "",
		token: "",
		ip: getQueryParam("id"),
		nickname: "",
		birth: "",
		id: "",
		mobile: "",
		email: "",
		smsCheck: "",
		emailCheck: "",
		sex: "",
		appleJoin: "",
		fbJoin: "",
		nvJoin: "",
		koJoin: "",
		birthdayView: "",
		newNickName: "",
		point: "",
		rank: "",
		cartCnt: "",
	},
	isCheckedNickName: false,
	likeList: [],
	userLocation: false,
	userMyPageInfo: {
		mgsName: "",
		name: "",
		cartCnt: "",
		point: "",
		couponCnt: "",
		payCnt: "",
		wishCnt: "",
		action: "",
		err: "",
	},
	userGrade: {
		isShow: false,
		grade: [
			{
				rank: "",
				name: "",
				condition: "",
				benefit: "",
			},
		],
	},
});
