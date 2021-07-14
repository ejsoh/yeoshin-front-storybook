import {
	needLoginMessage,
	registSuccessMessage,
} from "constantDatas/serviceMessage";
import { rootStore } from "models/RootStore";

export const needLoginAlert = () => {
	const store = rootStore;
	return store.interactionStore.setIsAlert(
		needLoginMessage,
		() => (window.location.href = "/login")
	);
};
export const customAlert = (msg: string) => {
	const store = rootStore;
	return store.interactionStore.setIsAlert(msg);
};

export const registerAlert = () => {
	const store = rootStore;
	return store.interactionStore.setIsAlert(registSuccessMessage);
};
