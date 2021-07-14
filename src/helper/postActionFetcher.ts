import { AxiosResponse } from "axios";
import { apiHeader } from "hooks/apiMethod/useApiData";
import { axiosConfig } from "services";
import qs from "qs";

type PostFetcher<T, R> = {
	success: (res: AxiosResponse["data"]) => void;
	fail: (err: T) => R;
	data: { [key: string]: string };
	url: string;
	header?: { [key: string]: string };
};

export const postActionFetcher = async <T, R>({
	success,
	fail,
	data,
	url,
	header,
}: PostFetcher<T, R>) => {
	try {
		const instance = axiosConfig;
		const response = await instance({
			method: "post",
			url: url,
			data: qs.stringify(data),
			headers: { ...apiHeader, ...header },
		});
		const result = await response;
		return success(result);
	} catch (error) {
		const err = await error;
		return fail(err);
	}
};
