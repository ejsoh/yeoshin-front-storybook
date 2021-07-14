import { AxiosResponse } from "axios";
import { FetchType } from "models/entities";

export const FetchAction = (self: FetchType) => ({
	setState: (state: string) => {
		self.state = state;
	},
	setResponse: (response: AxiosResponse["data"]) => {
		self.response = response;
	},

	setErrorData: (err: AxiosResponse["data"]) => {
		self.error = err;
	},
});
