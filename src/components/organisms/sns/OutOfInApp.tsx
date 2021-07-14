import { FRONT_HOME } from "constantDatas/api";
import { useAuth } from "hooks";
import React from "react";

import { isMobile } from "react-device-detect";
import { Text } from "components/atoms/Message";
import styled from "@emotion/styled/macro";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";
import { Column } from "components/atoms/Grid";

const Container = styled(Column)`
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const HiddenElement = styled.div`
	height: 0;
	overflow: hidden;
`;

export const OutOfInApp = () => {
	const auth = useAuth();
	const getQueryParam = (key: string) => {
		const getParamsId = new URLSearchParams(window.location.search);
		return getParamsId.get(key) ?? "";
	};
	React.useEffect(() => {
		!isMobile &&
			(auth.user()
				? window.location.replace(`${FRONT_HOME}joinMember`)
				: window.location.replace(
						`${FRONT_HOME}joinMember?friendid=${getQueryParam("friendid")}`
				  ));
	}, []);

	return (
		<Container>
			<Text center>여신티켓 페이지로 이동중입니다...</Text>
			<EllipsisLoading noHeight={true} />
			<HiddenElement>
				<iframe
					src={`https://urlopen.link/front.yeoshin.co.kr/joinMember?friendid=${getQueryParam(
						"friendid"
					)}`}
				/>
			</HiddenElement>
		</Container>
	);
};
