export const setStorage = (key: string, value: string) => {
	window.localStorage.setItem(key, value);
};
export const getStorage = (key: string) => {
	return window.localStorage.getItem(key);
};
export const removeStorage = (keys: string[]) => {
	keys.map(item => {
		window.localStorage.removeItem(item);
	});
};
