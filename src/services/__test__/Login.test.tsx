import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";

import { StoreProvider } from "../../hooks/useStore";
import { onAction } from "mobx-state-tree";
import { rootStore } from "../../models/RootStore";
import { usePostDataApi } from "../../hooks";

const TestComponent = () => {
	const { setPostData } = usePostDataApi({});
	useEffect(() => {
		// setPostData({
		// 	url: "https://jsonplaceholder.typicode.com/posts",
		// 	body: { title: "foo", body: "bar", userId: "1" },
		// 	mapper: function () {
		// 		return "this is the test";
		// 	},
		// });
	});
	return rootStore.fetchStore;
};
test("login logic을 검증한다.", async () => {
	render(<StoreProvider value={rootStore}>{TestComponent}</StoreProvider>);

	onAction(rootStore, call => {
		console.dir("Action was called: ", call);
	});

	await waitFor(() =>
		console.log(JSON.stringify(rootStore.fetchStore) + "=====")
	);
});
