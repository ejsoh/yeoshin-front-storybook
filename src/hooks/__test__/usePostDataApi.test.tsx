import React from "react";
import { render, waitFor } from "@testing-library/react";
import { usePostDataApi } from "..";
import { rootStore } from "../../models/RootStore";
import { StoreProvider } from "../useStore";
import { observer } from "mobx-react-lite";

// test dom render
const TestComponent = observer(() => {
	const { setPostData } = usePostDataApi();
	React.useEffect(() => {
		// setPostData({
		// 	url: "https://jsonplaceholder.typicode.com/posts",
		// 	body: { title: "foo", body: "bar", userId: "1" },
		// 	mapper: function () {
		// 		return "this is the test";
		// 	},
		// });
	}, []);
	return (
		<div>
			<div> post product hookww</div>
			<div>hellos</div>
		</div>
	);
});

describe("postApiHook이 정확히 작동하는지 검증한다..", () => {
	test("store에 통신 상태가 정확한 값으로 업데이트 되는지 검증한다.", async () => {
		render(
			<StoreProvider value={rootStore}>
				<TestComponent />
			</StoreProvider>
		);
		const store = rootStore;

		await waitFor(() => expect(store.fetchStore.state).toBe("done"));
	});

	test("store에 통신 성공한 데이터가 정확한 값으로 업데이트 되는지 검증한다.", async () => {
		const store = rootStore;

		await waitFor(() => expect(store.fetchStore.response.title).toBe("foo"));
	});
});
