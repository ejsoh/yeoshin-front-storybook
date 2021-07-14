import { EventAction } from "models/actions/EventAction";
import { EventProps } from "models/entities/EventModel";
import { EventViews } from "models/views/EventViews";

export const EventStore = EventProps.actions(EventAction).views(EventViews);

export const eventStore = EventStore.create({
	eventCount: 0,
	event: [],
	filteredEvent: [],
	filter: "추천순",
	eventFilterShow: false,
	response: {},
	state: "",
	sendParams: {},
	error: {},
	showHospitalEvent: false,
});
