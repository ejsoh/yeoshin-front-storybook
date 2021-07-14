import { Instance, types } from "mobx-state-tree";

export type MainType = Instance<typeof MainProps>;

export const MainProps = types.model({
	mainIndex: types.number,
	state: types.string,
	response: types.optional(types.frozen(), {}),
	sendParams: types.optional(types.frozen(), {}),
	error: types.optional(types.frozen(), {}),
	showHospitalEvent: types.boolean,
});
