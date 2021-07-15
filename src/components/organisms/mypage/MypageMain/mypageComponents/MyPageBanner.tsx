import { Link } from "react-router-dom";
import { Space } from "components/atoms/Spacing";
import React from "react";
import { Text } from "components/atoms/Text";
import styled from "@emotion/styled/macro";

const MyPageBannerContainer = styled.div`
	background: url(images/icons/pigybank.png) no-repeat center right;
	padding: 15px;
	border: 1px solid rgba(61, 61, 61, 0.1);
	box-sizing: border-box;
	border-radius: 4px;
`;
export const MyPageBanner = () => {
	return (
		<Link to="/pointBenefit">
			<MyPageBannerContainer>
				<Text left size={15} bold gray>
					포인트 적립 백서
				</Text>
				<Space column={4} />
				<Text left lightgray>
					당일 5000점 적립하는 꿀팁!
				</Text>
			</MyPageBannerContainer>
		</Link>
	);
};
