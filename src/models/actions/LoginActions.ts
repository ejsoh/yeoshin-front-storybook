import { LoginType } from "models/entities";

export const LoginAction = (self: LoginType) => ({
	setUserId: (id: string) => {
		self.setUserInfo.id = id;
	},
	setUserPassword: (pwd: string) => {
		self.setUserInfo.password = pwd;
	},
});
