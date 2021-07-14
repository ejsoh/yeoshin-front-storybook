import { AxiosResponse } from "axios";
import { MainType } from "models/entities";

export const MainAction = (self: MainType) => ({
	setMainIndex: (index: number) => {
		self.mainIndex = index;
	},
	setResponse: (response: AxiosResponse["data"]) => {
		self.response = response;
	},
	setResponseData: ({ response }: AxiosResponse["data"]) => {
		self.response = response;
	},
	setErrorData: (err: AxiosResponse["data"]) => {
		self.error = err;
	},
	setState: (state: string) => {
		self.state = state;
	},
	setShowMyHospitalEvent: (isShow: boolean) => {
		self.showHospitalEvent = isShow;
	},
});
