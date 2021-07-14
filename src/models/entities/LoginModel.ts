import { Instance, types } from "mobx-state-tree";

export type LoginType = Instance<typeof LoginProps>;

export const GetUserInfo = types.model({
	token: types.string,
	nickName: types.string,
});

const SetUserInfo = types.model({
	id: types.optional(types.string, ""),
	password: types.optional(types.string, ""),
});

export const LoginProps = types.model({
	getUserInfo: types.maybe(GetUserInfo),
	setUserInfo: SetUserInfo,
});
