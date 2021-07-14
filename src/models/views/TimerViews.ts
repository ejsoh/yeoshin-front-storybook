export const TimerViews = (self: {
	timer: number;
	toggle: boolean;
	isReTry: boolean;
	isStart: boolean;
}) => ({
	timerView: () => {
		return self.timer;
	},
	isShowView: () => {
		return self.toggle;
	},
	isRetryView: () => {
		return self.isReTry;
	},
	isStartView: () => {
		return self.isStart;
	},
});
