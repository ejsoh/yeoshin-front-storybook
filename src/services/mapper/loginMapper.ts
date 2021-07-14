import { isAuthenticated } from "hooks/useAuth";

export const loginSuccess = (args: {
	[key: string]: { [key: string]: string };
}) => {
	return isAuthenticated().signIn(() => {
		window.location.replace("https://yeoshin.co.kr/");
	}, true);
};

export const loginFail = (args: { [key: string]: string }) => {
	return { errMsg: args.msg };
};

export const logoutMapper = (args: { [key: string]: string }) => {
	const reuslt = args.logoutYn;
	return { result: reuslt };
};
