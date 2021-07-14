import { rootStore } from "../models/RootStore";

export const timer = ({
	time = 180,
	timerTime = 1000,
}: {
	time?: number;
	timerTime?: number;
}) => {
	const { timerStore } = rootStore;
	const expiredTime = time;

	// 종료할 시간 설정
	timerStore.SetTimerActions(expiredTime);

	// 타이머 종료 메서드
	const stop = () => {
		clearInterval(start);
		timerStore.setTimerRetry(true);
	};

	// 타이머 시작 메서드
	const start = setInterval(() => {
		const result = timerStore.timerView();
		const isTimeOver = timerStore.timerView() <= 0;

		timerStore.SetTimerActions(result - 1);

		// 타이머 종료
		if (isTimeOver) {
			clearInterval(start);
			timerStore.setIsStart(false);
			timerStore.SetToggleShow(false);
		}

		// 타이머 재시작
		if (timerStore.isRetryView()) {
			clearInterval(start);
			timerStore.setTimerRetry(false);
			return timerStore.SetTimerActions(expiredTime);
		}
	}, timerTime);

	return { stop, start };
};
