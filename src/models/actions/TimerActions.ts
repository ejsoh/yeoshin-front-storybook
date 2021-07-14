export const TimerAction = (self: {
	timer: number;
	toggle: boolean;
	isReTry: boolean;
	isStart: boolean;
}) => ({
	SetTimerActions: (item: number) => {
		self.timer = item;
	},
	SetToggleShow: (isShow: boolean) => {
		self.toggle = isShow;
	},
	setTimerRetry: (isReTry: boolean) => {
		self.isReTry = isReTry;
	},
	setIsStart: (isStart: boolean) => {
		self.isStart = isStart;
	},
});
