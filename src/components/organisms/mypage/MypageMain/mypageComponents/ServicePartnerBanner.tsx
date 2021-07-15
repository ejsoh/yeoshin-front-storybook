import { Link } from "react-router-dom";
import { Space } from "components/atoms/Spacing";
import React from "react";
import { Text } from "components/atoms/Text";
import styled from "@emotion/styled/macro";

const ServicePartnerContainer = styled.div`
	background: url(images/images/yeoshinModel.png) no-repeat 96% center
		rgba(239, 75, 129, 0.1);
	-webkit-background-size: auto;
	background-size: auto;
	padding: 15px 16px;
	border: 1px solid rgba(61, 61, 61, 0.1);
	box-sizing: border-box;
	border-radius: 4px;
	background-size: contain;
`;

export const ServicePartnerBanner = () => {
	return (
		<Link to="/servicePartner">
			<ServicePartnerContainer>
				<Text left size={15} bold gray>
					무료로 병원 등록하자!
				</Text>
				<Space column={4} />
				<Text lightgray left>
					병원 매출이 쭉~오르는 비밀
				</Text>
			</ServicePartnerContainer>
		</Link>
	);
};
