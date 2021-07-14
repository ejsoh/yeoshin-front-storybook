import { AxiosResponse } from "axios";
import { apiHeader } from "hooks/apiMethod/useApiData";
import { axiosConfig } from "services";

type GetFetcher = {
	success: (res: AxiosResponse["data"]) => void;
	fail: (data: AxiosResponse) => void;
	url: string;
};

export const getActionFetcher = async ({ success, fail, url }: GetFetcher) => {
	try {
		const response = await axiosConfig({
			method: "get",
			url: url,
			headers: { ...apiHeader },
		});
		const result = await response;

		return success(result);
	} catch (error) {
		const err = await error;

		return fail(err);
	}
};
