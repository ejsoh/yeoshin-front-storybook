import { Instance, types } from "mobx-state-tree";

export type EventType = Instance<typeof EventProps>;

const Event = types.model({
	description: types.string,
	image: types.string,
	isReservation: types.boolean,
	isWish: types.boolean,
	key: types.string,
	link: types.string,
	location: types.string,
	price: types.number,
	reviewCount: types.number,
	score: types.string,
	title: types.string,
	wishCount: types.number,
});

export const EventProps = types.model({
	eventCount: types.number,
	event: types.array(types.frozen(Event)),
	filteredEvent: types.array(types.frozen(Event)),
	filter: types.string,
	eventFilterShow: types.boolean,
	state: types.string,
	response: types.optional(types.frozen(), {}),
	sendParams: types.optional(types.frozen(), {}),
	error: types.optional(types.frozen(), {}),
	showHospitalEvent: types.boolean,
});
