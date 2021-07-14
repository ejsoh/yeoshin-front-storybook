import { Column } from "components/atoms/Grid";
import { Text } from "components/atoms/Message";
import styled from "@emotion/styled/macro";
import React from "react";
import { SpaceContainer } from "components/atoms/Spacing";
import { NumberText } from "components/atoms/Typo/Typo";

const InfoContainer = styled(Column)`
	background-color: #f7f7f7;
	padding: 20px 0 30px;
	border-top: 1px solid #e6e6e6;

	line-height: 0;
	${Text} {
		justify-content: center;
		color: #a8a8a8;
		font-size: 11px;
	}
`;

export const YeoshinTicketInformation = () => {
	return (
		<InfoContainer>
			<Text>여신티켓(패스트레인) | 대표 손승우</Text>
			<Text>사업자등록번호 692-86-00235</Text>
			<Text>통신판매업신고번호 제2018-서울강남-04473호</Text>
			<Text>서울특별시 강남구 테헤란로 423 현대타워 801호 </Text>
			<Text>개인정보관리책임 민경훈 contact@fastlane.kr</Text>
			<SpaceContainer columns={[20, 10]}>
				<NumberText center bold gray>
					Copyright © Fastlane, All rights reserved.
				</NumberText>
			</SpaceContainer>
		</InfoContainer>
	);
};
