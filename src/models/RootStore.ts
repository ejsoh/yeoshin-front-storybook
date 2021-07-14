import {
	FetchStore,
	InteractionStore,
	LoginStore,
	MainStore,
	SkinMapStore,
	TimerStore,
	UserInfoStore,
	VerificationStore,
	fetchStore,
	interactionStore,
	loginStore,
	mainStore,
	skinMapStore,
	timerStore,
	userInfoStore,
	verificationStore,
	EventStore,
	eventStore,
} from "./stores";
import { Instance, types } from "mobx-state-tree";

export type RootStoreModel = Instance<typeof RootType>;

export const mapper = ({
	fetchStore,
	loginStore,
	verificationStore,
	timerStore,
	userInfoStore,
	skinMapStore,
	interactionStore,
	mainStore,
	eventStore,
}: RootStoreModel) => ({
	fetchStore,
	loginStore,
	verificationStore,
	timerStore,
	userInfoStore,
	skinMapStore,
	interactionStore,
	mainStore,
	eventStore,
});

export const RootType = types.model("RootType", {
	fetchStore: FetchStore,
	loginStore: LoginStore,
	verificationStore: VerificationStore,
	timerStore: TimerStore,
	userInfoStore: UserInfoStore,
	skinMapStore: SkinMapStore,
	interactionStore: InteractionStore,
	mainStore: MainStore,
	eventStore: EventStore,
});

export const rootStore = RootType.create({
	fetchStore,
	loginStore,
	verificationStore,
	timerStore,
	userInfoStore,
	skinMapStore,
	interactionStore,
	mainStore,
	eventStore,
});
