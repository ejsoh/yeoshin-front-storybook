import { Instance, types } from "mobx-state-tree";

export type FetchType = Instance<typeof FetchProps>;

export const FetchProps = types.model({
	state: types.string,
	response: types.optional(types.frozen(), {}),
	sendParams: types.optional(types.frozen(), {}),
	error: types.optional(types.frozen(), {}),
});
