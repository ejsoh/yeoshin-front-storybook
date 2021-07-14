import { FetchStore } from "../stores";

test("rootStore가 옳은지 검증한다/", () => {
	// let  get = store.fetch.getState();

	expect("pending").toBe("pending");
});

test("mst 상태가 옳은 값으로 업데이트 되는지 검증한다.", () => {
	const store = FetchStore.create({ state: "done" });

	expect(store.getState()).toBe("done");
});
