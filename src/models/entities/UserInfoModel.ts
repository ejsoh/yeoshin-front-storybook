import { Instance, types } from "mobx-state-tree";
export type UserInfoType = Instance<typeof UserInfoProps>;

const UserInfo = types.model({
	name: types.string,
	token: types.string,
	ip: types.string,
	nickname: types.string,
	birth: types.string,
	id: types.string,
	mobile: types.string,
	email: types.string,
	smsCheck: types.string,
	emailCheck: types.string,
	sex: types.string,
	appleJoin: types.string,
	fbJoin: types.string,
	nvJoin: types.string,
	koJoin: types.string,
	birthdayView: types.string,
	newNickName: types.string,
	point: types.string,
	rank: types.string,
	cartCnt: types.string,
});

const MyPageInfo = types.model({
	mgsName: types.string,
	name: types.string,
	cartCnt: types.string,
	point: types.string,
	couponCnt: types.string,
	payCnt: types.string,
	wishCnt: types.string,
	action: types.string,
	err: types.string,
});

const UserGrade = types.model({
	rank: types.string,
	name: types.string,
	condition: types.string,
	benefit: types.string,
});

const Grade = types.model({
	isShow: types.boolean,
	grade: types.array(UserGrade),
});

export const UserInfoProps = types.model({
	info: UserInfo,
	likeList: types.optional(types.array(types.string), []),
	userLocation: types.boolean,
	userMyPageInfo: MyPageInfo,
	userGrade: Grade,
	isCheckedNickName: types.boolean,
});
