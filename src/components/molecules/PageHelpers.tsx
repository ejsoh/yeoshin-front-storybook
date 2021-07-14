import { Icon } from "components/atoms";
import styled from "@emotion/styled/macro";
import React from "react";
import { RecentlyEvent } from "constantDatas/linkUrls";

const PageHelperContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	bottom: 70px;
	right: 0;
	z-index: 99;
	animation: isShow 0.5s linear;
	@keyframes isShow {
		0% {
			right: -50%;
		}
		100% {
			right: 0;
		}
	}
`;

const IconContainer = styled.div`
	background: rgba(61, 61, 61, 0.85);
	border-radius: 100%;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 6px 16px;
`;
const LinkIcon = IconContainer.withComponent("a");

export const PageHelpers = () => {
	const scollUp = () =>
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

	return (
		<PageHelperContainer>
			<LinkIcon href={RecentlyEvent}>
				<Icon icon="time" size={18} />
			</LinkIcon>
			<IconContainer onClick={scollUp}>
				<Icon icon="top" />
			</IconContainer>
		</PageHelperContainer>
	);
};
