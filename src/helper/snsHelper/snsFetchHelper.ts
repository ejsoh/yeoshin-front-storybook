import { removeStorage, setStorage } from "services/utils/localStorage";

import { RouteComponentProps } from "react-router-dom";
import { rootStore } from "models/RootStore";

type Fail = {
	userInfo: { [key: string]: string };
	func?: () => void;
	history: RouteComponentProps["history"];
};

export const snsSuccess = (auth: {
	user: () => void;
	signIn: (auth: () => void, check: boolean) => void;
}) => (result: {
	[key: string]: { [key: string]: { [key: string]: string } };
}) => {
	const token = result.data.results.accessToken;
	const isLoginSuccess = token !== undefined;
	const store = rootStore;
	store.fetchStore.setState("pending");

	auth.signIn(() => {
		window.location.replace("https://yeoshin.co.kr/");
	}, isLoginSuccess);
};

export const snsFail = ({ userInfo, func, history }: Fail) => (error: {
	[key: string]: { [key: string]: string };
}) => {
	setStorage("userInfo", JSON.stringify(userInfo));
	const isNotMember = error.invalid.status.indexOf("0117") >= 0;
	const isDeletedMember = error.invalid.status.indexOf("0105") >= 0;

	if (isNotMember) {
		func && func();
		return window.location.replace("/snsJoin");
	}
	if (isDeletedMember) {
		removeStorage(["com.naver.nid.access_token"]);
		alert(error.invalid.msg);
		window.location.replace("/myPage");
		return;
	}
};
