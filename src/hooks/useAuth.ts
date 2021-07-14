import { createContext, useContext } from "react";
import { getCookie } from "services/utils/cookies";

type AuthContextType = {
	user: () => string;
	signIn: (auth: () => void, check: boolean) => void;
};

export function useAuth() {
	return useContext(authContext);
}

export const isAuthenticated = () => {
	let isAuthenticated = false;

	const signIn = (signInFunc: (...args: []) => void, checks: boolean) => {
		const setIsAuth = (check: boolean) => {
			isAuthenticated = check;
		};

		setIsAuth(checks);

		if (isAuthenticated) {
			signInFunc();
		}
	};

	return { signIn };
};

export const useProvideAuth = () => {
	const user = () => getCookie("accessToken");
	const signIn = (auth: () => void, isLogin: boolean) => {
		return isAuthenticated().signIn(() => {
			auth();
		}, isLogin);
	};
	return {
		user,
		signIn,
	};
};

export const authContext = createContext<AuthContextType>(
	{} as AuthContextType
);
