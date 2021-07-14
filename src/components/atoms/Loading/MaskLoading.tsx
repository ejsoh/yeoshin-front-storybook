import React from "react";
import styled from "@emotion/styled/macro";

const MaskLoadingContainer = styled.div`
	position: fixed;
	z-index: 99999;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #3d3d3d;
	opacity: 0.8;
	color: white;
	font-size: 13px;
	text-align: center;
	line-height: 20px;
	flex-direction: column;
	& > * {
		display: flex;
		flex-direction: row;
	}
	.dot {
		width: 20px;
		overflow: hidden;
		animation: loadingText 1.5s linear 0s infinite normal;
		keyframes loadingText {
			0% {
				width: 3px;
			}
			20% {
				width: 6px;
			}
			50% {
				width: 12px;
			}
			100% {
				width: 18px;
			}
		}
	}
`;

export const MaskLoading = () => {
	return <MaskLoadingContainer></MaskLoadingContainer>;
};
