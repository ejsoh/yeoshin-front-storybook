import { LoginType } from "models/entities";

export const LoginViews = (self: LoginType) => ({
	userInfo: () => {
		return self.setUserInfo;
	},
});
