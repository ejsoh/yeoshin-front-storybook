import { MainAction } from "models/actions";
import { MainProps } from "models/entities";
import { MainViews } from "models/views/MainViews";

export const MainStore = MainProps.actions(MainAction).views(MainViews);

export const mainStore = MainStore.create({
	mainIndex: 0,
	response: {},
	state: "",
	sendParams: {},
	error: {},
	showHospitalEvent: false,
});
