import React from "react";
import { render } from "@testing-library/react";
import { useInjection } from "..";
import { rootStore, RootStoreModel } from "../../models/RootStore";
import { StoreProvider } from "../useStore";

const mapState = ({ fetchStore }: RootStoreModel) => ({
	fetchStore,
});

function TestComponent() {
	const { fetchStore } = useInjection(mapState);
	const data = fetchStore.state;
	return <div>{data}</div>;
}

describe("useInjection을 통해 제대로 된 값이 전달되는지 검증한다.", () => {
	test("provider값을 검증한다.", () => {
		const teest = render(
			<StoreProvider value={rootStore}>
				<TestComponent />
			</StoreProvider>
		);
		teest.getByText("pending");
	});
});
