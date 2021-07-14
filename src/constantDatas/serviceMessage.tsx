import React from "react";
import { Text } from "components/atoms/Message";
import { Column, Row } from "components/atoms/Grid";

export const timeOutErrorMessage = (
	<Text gray left>
		잠시 후 다시 이용해 주세요.
	</Text>
);

export const serverErrorMessage = (
	<Text gray left>
		잠시 후 다시 이용해 주세요.
	</Text>
);

export const authErrorMessage = (
	<Text gray left>
		인증 에러
	</Text>
);

export const networkConnectErrorMessage = (
	<Text gray left>
		인터넷 환경을 확인해 주세요.
	</Text>
);

export const needLoginMessage = (
	<Column>
		<Text gray left>
			로그인이 필요해요!
		</Text>
		<Row space={[5, 0]}>
			<Text gray left>
				더욱 풍부하게
			</Text>
			<Text pink left padding={"0px 0px 0px 5"}>
				여신티켓
			</Text>
			<Text gray left>
				을 사용하세요.
			</Text>
		</Row>
	</Column>
);

export const registSuccessMessage = (
	<Text gray left>
		등록되었습니다.
	</Text>
);

export const modifySuccessMessage = (
	<Text gray left>
		수정이 완료 되었습니다.
	</Text>
);

export const customAlert = (msg: string) => (
	<Text gray left>
		{msg}
	</Text>
);
