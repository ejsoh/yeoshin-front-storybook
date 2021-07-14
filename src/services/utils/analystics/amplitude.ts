import amplitude from "amplitude-js";
import { rootStore } from "models/RootStore";

export const amplitudeInit = amplitude
	.getInstance()
	.init("06b0ddcc51c769bbc86786ddbae67eac");

// 유저 트래킹
export const userTracking = () => {
	const store = rootStore;

	amplitude.getInstance().setUserId(store.userInfoStore.getUserId() ?? null);
	return amplitude.getInstance().regenerateDeviceId();
};

// 이벤트 트래킹
export const eventTracking = (
	eventType: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: { [key: string]: any }
) => {
	return data
		? amplitude.getInstance().logEvent(eventType, data)
		: amplitude.getInstance().logEvent(eventType);
};

export const eventTrackingIncreaseCount = (identify: string) => {
	const identity = new amplitude.Identify().add(identify, 1);
	return amplitude.getInstance().identify(identity);
};
