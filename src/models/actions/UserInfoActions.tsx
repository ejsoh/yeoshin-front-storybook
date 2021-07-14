import { cast } from "mobx-state-tree";

import { UserInfoType } from "models/entities/UserInfoModel";

type Values<T> = T[keyof T];
type UserInfoItems = Values<UserInfoType>;

export const UserInfoActions = (self: UserInfoItems) => ({
	setUserName: (name: string) => {
		self.info = { ...self.info, name: name };
	},
	setUserToken: (token: string) => {
		self.info = { ...self.info, token: token };
	},
	setUserIp: (ip: string) => {
		self.info = { ...self.info, ip: ip };
	},
	disLike: (storeId: string) => {
		const find = self.likeList.findIndex((e: string) => e === storeId);
		self.likeList.splice(find, 1);
	},
	setLike: (storeId: string) => {
		self.likeList = [...self.likeList, storeId];
	},
	setUserLikeList: (like: string[]) => {
		self.likeList = cast(like);
	},
	setUserLocation: (isGet: boolean) => {
		self.userLocation = isGet;
	},
	setUserInfo: (userInfo: { [key: string]: string | boolean }) => {
		self.info = cast({ ...self.info, ...userInfo });
	},
	setUserInfoSpecific: (key: string, value: string) => {
		self["info"][key] = value;
	},
	setChecked: (key: string, value: boolean) => {
		self[key] = value;
	},
	setUserMyPageInfo: (mypageInfo: { [key: string]: string }) => {
		self.userMyPageInfo = cast({ ...self.userMyPageInfo, ...mypageInfo });
	},
	setUserGrade: (grade: Grade) => {
		self.userGrade = cast({ ...self.userGrade, ...grade });
	},
});

type Grade = {
	isShow: boolean;
	grade: { rank: string; name: string; condition: string; benefit: string }[];
};
