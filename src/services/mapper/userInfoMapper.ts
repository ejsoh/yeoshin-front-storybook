import { AxiosResponse } from "axios";
import { rootStore } from "models/RootStore";
export const userCacheData = (args: {
	[key: string]: { [key: string]: string };
}) => {
	return { result: args.memberInfo };
};
export const getUserCacheFail = (args: { [key: string]: string }) => {
	return { err: args };
};

export const getUserInfo = (res: AxiosResponse["data"]) => {
	const data = res.results.memberInfo;
	const store = rootStore;
	const currentDate = new Date();
	const result = {
		name: data.name,
		nickname: data.nickname,
		birth: `${data.birthy}${data.birthm}${data.birthd}`,
		id: data.id,
		mobile: `${data.htel1}${data.htel2}${data.htel3}`,
		email: data.email,
		smsCheck: data.smsAgreeYn,
		emailCheck: data.emailAgreeYn,
		sex: data.sex === "" ? "F" : data.sex,
		appleJoin: data.appleJoin,
		fbJoin: data.fbJoin,
		nvJoin: data.nvJoin,
		koJoin: data.koJoin,
		birthdayView: data.birthdayView,
		newNickName: data.nickname,
		point: data.action,
		rank: data.mgsUid > 2 ? "excellent" : data.mgsUid <= 1 ? "new" : "good",
		cartCnt: data.cartCnt,
	};
	store.verificationStore.setMobileNumber(
		`${data.htel1}${data.htel2}${data.htel3}`
	);

	store.userInfoStore.setChecked("isCheckedNickName", data.nickname !== "");
	const year = isNaN(parseInt(data.birthy))
		? currentDate.getFullYear()
		: data.birthy;
	const month = isNaN(parseInt(data.birthm))
		? currentDate.getMonth() + 1
		: data.birthm;
	const day = isNaN(parseInt(data.birthd))
		? currentDate.getDate()
		: data.birthd;

	store.interactionStore.setYear(year);
	store.interactionStore.setMonth(month);
	store.interactionStore.setDay(day);

	return result;
};

export const userMyPageInfo = (res: AxiosResponse["data"]) => {
	const userInfo = res.results.memberInfo;
	const result = {
		mgsName: userInfo.mgsName,
		name: userInfo.name,
		cartCnt: userInfo.cartCnt,
		point: parseInt(userInfo.point).toLocaleString(),
		couponCnt: userInfo.couponCnt,
		payCnt: userInfo.payCnt,
		wishCnt: userInfo.wishCnt,
		action: parseInt(userInfo.action).toLocaleString(),
	};
	return result;
};

export const gradeMapper = (res: AxiosResponse["data"]) => {
	const data = res.results.memberGrade;
	const result = data.map((item: { [key: string]: string }) => {
		return {
			rank:
				parseInt(item.mgsUid) > 2
					? "excellent"
					: parseInt(item.mgsUid) <= 1
					? "new"
					: "good",
			name: item.mgsName,
			condition: item.mgsReviewCnt,
			benefit: item.mgsCouponCnt,
		};
	});
	return result;
};
