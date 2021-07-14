// fisher-yates
import { AxiosResponse } from "axios";

export const suffle = (arr: AxiosResponse["data"]) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const index = Math.floor(Math.random() * (i + 1));
		const target = arr[i];
		arr[i] = arr[index];
		arr[index] = target;
	}
	return arr;
};
