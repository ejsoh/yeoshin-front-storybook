import { Cookies } from "react-cookie";

// const domainOpt = {};
const domainOpt = { domain: ".yeoshin.co.kr", path: "/" };

export const setCookie = (
	key: string,
	value: string,
	options?: { [key: string]: number }
) => {
	const date = new Date();
	date.setFullYear(date.getFullYear() + 10);
	const cookies = new Cookies();
	cookies.set(key, value, {
		...options,
		...domainOpt,
		expires: date,
	});
};

export const removeCookies = (items: Array<string>) => {
	const cookies = new Cookies();
	items.forEach(element => cookies.remove(element, domainOpt));
};

export const getCookie = (key: string) => {
	const cookies = new Cookies();
	return cookies.get(key);
};
