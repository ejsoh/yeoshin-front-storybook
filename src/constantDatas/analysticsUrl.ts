import { generalRoute, redirectMyPage } from "./../Router";
export const currentLocation = (path: string) => {
	const login = {
		path: "/login",
		name: "로그인",
	};
	const main = {
		path: "/",
		name: "홈",
	};
	const allRoute = [...generalRoute, ...redirectMyPage, login, main];

	const result = allRoute.filter(item => item.path === path)[0] || [
		{
			path: "",
			name: "",
		},
	];
	return result.name || "";
};
