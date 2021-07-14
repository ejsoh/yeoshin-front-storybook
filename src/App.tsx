import "./App.css";
import { Navigator, ProvideAuth } from "./Router";
import { CookiesProvider } from "react-cookie";
import React from "react";
import { StoreProvider } from "./hooks/useStore";
import { amplitudeInit } from "services/utils/analystics/amplitude";
import { observer } from "mobx-react-lite";
import { rootStore } from "./models/RootStore";
import { gaInit } from "services/utils/analystics/googleAnalystics";
import { polyfill } from "seamless-scroll-polyfill";
import * as Sentry from "@sentry/react";

function App() {
	React.useEffect(() => {
		amplitudeInit;
		gaInit;
		polyfill();
	}, []);
	return (
		<ProvideAuth>
			<StoreProvider value={rootStore}>
				<CookiesProvider>
					<Navigator />
				</CookiesProvider>
			</StoreProvider>
		</ProvideAuth>
	);
}

export default Sentry.withProfiler(observer(App));
