import { MainType } from "models/entities";

export const MainViews = (self: MainType) => ({
	// 서버통신을 통해 업데이트 된 데이터를 가져온다.
	getData: () => {
		return self.response;
	},
	getError: () => {
		return self.error;
	},
	getMainIndex: () => {
		return self.mainIndex;
	},
	getState: () => {
		return self.state;
	},
	getShowHospitalEvent: () => {
		return self.showHospitalEvent;
	},
});
