import { getSnapshot } from "mobx-state-tree";
import { rootStore } from "../RootStore";

describe("verificationStore를 검증한다", () => {
	test("verificationStore password를 검증한다.", () => {
		const store = rootStore.verificationStore;
		// store.setFirstpassword("megami");
		store.setSecondPassword("megams");
		console.log(getSnapshot(store));
		// expect(store.passwordVerification.isFirstPwdValid).toBeFalsy;
	});

	test("verificationStore email을 검증한다.", () => {
		const store = rootStore.verificationStore;
		// store.validateEmail("rekagirl@mem");
		console.log(getSnapshot(store));
		// expect(store.isValidEmail).toBeFalsy;
	});

	// test("verificationStore email을 검증한다.", () => {
	// 	const check = rootStore.joinMemberStore;
	// 	check.setJoinMemberParams({
	// 		...check.joinMember,
	// 		email: "rekagirl@mem.com",
	// 	});
	// 	expect(check.joinMember.email).toBe("rekagirl@mem.com");
	// });
});
