import { LoginAction } from "models/actions";
import { LoginProps } from "models/entities";
import { LoginViews } from "models/views";

export const LoginStore = LoginProps.actions(LoginAction).views(LoginViews);

export const defaultData = {
	getUserInfo: { token: "", nickName: "" },
	setUserInfo: { id: "", password: "" },
};

export const loginStore = LoginStore.create(defaultData);
