import { FetchAction } from "models/actions";
import { FetchProps } from "models/entities";
import { FetchViews } from "models/views";

export const FetchStore = FetchProps.actions(FetchAction).views(FetchViews);

export const fetchStore = FetchStore.create({
	state: "",
	response: {},
	sendParams: {},
	error: {},
});
