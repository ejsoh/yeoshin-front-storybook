import { UserInfoType } from "models/entities";

export const UserInfoViews = (self: UserInfoType) => ({
	getUserId: () => {
		return self.info.id;
	},
	getUserName: () => {
		return self.info.name;
	},
	getUserToken: () => {
		return self.info.token;
	},
	getUserIp: () => {
		return self.info.ip;
	},
	getUserLikeList: () => {
		return self.likeList;
	},
	getUserLocation: () => {
		return self.userLocation;
	},
	getUserInfo: () => {
		return self.info;
	},
	getMyPageInfo: () => {
		return self.userMyPageInfo;
	},
	getUserGrade: () => {
		return self.userGrade;
	},
	getIsCheckedNickName: () => {
		return self.isCheckedNickName;
	},
});
