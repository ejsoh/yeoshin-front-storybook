import { TimerAction } from "models/actions";
import { TimerViews } from "models/views";
import { types } from "mobx-state-tree";

export const TimerStore = types
	.model({
		timer: types.number,
		toggle: types.boolean,
		isReTry: types.boolean,
		isStart: types.boolean,
	})
	.actions(TimerAction)
	.views(TimerViews);

export const timerStore = TimerStore.create({
	timer: 0,
	toggle: false,
	isReTry: false,
	isStart: false,
});
