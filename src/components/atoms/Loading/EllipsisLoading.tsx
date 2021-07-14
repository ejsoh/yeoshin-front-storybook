import styled from "@emotion/styled/macro";
import React from "react";

type StyleProps = { noHeight?: boolean };

const EllipsisLoadingStyle = styled.div<StyleProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	${props => !props.noHeight && "height: 100%;"}

	min-height: 130px;

	& > div {
		width: 12px;
		height: 12px;
		margin: 0 5px;
		background-color: #ef4b81;
		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	}

	& > div:nth-of-type(1) {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	& > div:nth-of-type(2) {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes sk-bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
		}
	}

	@keyframes sk-bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
`;

export const EllipsisLoading = ({ noHeight }: { noHeight?: boolean }) => {
	return (
		<EllipsisLoadingStyle noHeight={noHeight}>
			<div></div>
			<div></div>
			<div></div>
		</EllipsisLoadingStyle>
	);
};
