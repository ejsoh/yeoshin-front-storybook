import { AxiosResponse } from "axios";
import { EventType } from "models/entities";

export const EventAction = (self: EventType) => ({
	setEventCount: (index: number) => {
		self.eventCount = index;
	},
	setEvent: (obj: any) => {
		self.event = obj;
	},
	setFilteredEvent: (obj: any) => {
		self.filteredEvent = obj;
	},
	setFilter: (filter: string) => {
		self.filter = filter;
	},
	setEventFilterShow: (isShow: boolean) => {
		self.eventFilterShow = isShow;
	},
	setRecommendState: (obj: any) => {
		self.event = obj;
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
