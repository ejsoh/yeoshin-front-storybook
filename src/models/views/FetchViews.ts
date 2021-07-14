import { FetchType } from "models/entities";

export const FetchViews = (self: FetchType) => ({
	// 서버통신을 통해 업데이트 된 데이터를 가져온다.
	fetchStore: () => {
		return self.response;
	},
	getError: () => {
		return self.error;
	},

	// 업데이트 된 서버통신 상태를 가져온다.
	getState: () => {
		return self.state as string;
	},
});
