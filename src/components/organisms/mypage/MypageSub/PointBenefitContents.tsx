import React from "react";
import { EventDetailCommon } from "../mypageCommon/EventDetailCommon";

export const PointBenefitContents = () => {
	return (
		<EventDetailCommon
			no="361"
			title={"[여신티켓] 포인트적립 꿀팁!"}
			date={"~ 2023-12-31"}
			contents={
				<img
					src={
						"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/tinymce/1497766631.jpg"
					}
				/>
			}
		/>
	);
};
