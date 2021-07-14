import { useRouteMatch } from "react-router-dom";

import { Detail } from "./commonStyle";
import React from "react";

export const NoticeDetailContents = () => {
	const { url } = useRouteMatch();

	React.useEffect(() => {
		window.addEventListener("message", function (e) {
			e.data.pcmPixelPostMessageEvent !== undefined &&
				e.data.pcmPixelPostMessageEvent.ev === "SubscribedButtonClick" &&
				(window.location.href = "/notice");
		});
	}, []);
	return (
		<Detail>
			<iframe
				id={"text"}
				src={`https://yeoshin.co.kr/?_mobilemode=chk&pn=board.view&_uid=${
					url.split("/")[2]
				}`}
			></iframe>
		</Detail>
	);
};
