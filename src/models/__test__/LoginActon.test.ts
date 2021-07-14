import { LoginStore } from "../stores/LoginStore";

test("loginStore 옳은지 검증한다/", () => {
	// let  get = store.fetch.getState();

	expect("pending").toBe("pending");
});

test("mst 상태가 옳은 값으로 업데이트 되는지 검증한다.", () => {
	const store = LoginStore.create({
		getUserInfo: { nickName: "megami", token: "tester" },
		state: "pending",
	});
	// store.getUserInfo({ nickName: "megami", token: "tester" });
	// expect(store.userInfo().token).toBe("tester");
});
