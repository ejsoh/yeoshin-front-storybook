import { Column } from "components/atoms/Grid";
import React from "react";
import { EventDetailCommon } from "../mypageCommon/EventDetailCommon";

export const YeoshinGuideContents = () => {
	return (
		<EventDetailCommon
			no="526"
			title={"여신티켓 이용가이드! 확인만해도 500포인트!"}
			date={"~ 2023-12-31"}
			contents={
				<Column>
					<img
						src={
							"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/tinymce/810279315.jpg"
						}
					/>
					<img
						src={
							"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/tinymce/2451857488.jpg"
						}
					/>
					<img
						src={
							"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/tinymce/1422359433.jpg"
						}
					/>
				</Column>
			}
		/>
	);
};
