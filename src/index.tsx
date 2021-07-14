import "./index.css";

import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";
Sentry.init({
	dsn:
		"https://6fd594f840c24915ad4cd4d86eb11408@o876328.ingest.sentry.io/5825713",
});

ReactDOM.render(
	<React.StrictMode>
		<HelmetProvider>
			<App />
		</HelmetProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
