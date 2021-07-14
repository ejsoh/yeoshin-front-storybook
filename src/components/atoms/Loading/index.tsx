import React from "react";
import styled from "@emotion/styled/macro";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react/macro";
const LoadingStyle = styled.div`
	display: flex;
	justify-content: center;
	justify-items: center;
	align-items: center;
	flex-direction: column;
	left: 0;
	top: 0;
	position: absolute;
	width: 100%;
	height: 80%;
	z-index: 999;
	background-color: #fff;
	.loadingAndText {
		position: relative;
	}
	.loading {
		height: 100px;
		z-index: 999;
		width: 100px;
		border-radius: 100%;
		border: 2px solid transparent;
		border-color: transparent #ef5d9e transparent #ef5d9e;
		animation: rotate-loading 1.5s linear 0s infinite normal;
		transform-origin: 50% 50%;
		transition: all 0.5s ease-in-out;
	}

	.loading-text {
		color: #ef5d9e;
		font-size: 10px;
		font-weight: 500;
		margin-top: 4px;
		position: absolute;
		text-align: center;
		text-transform: uppercase;
		top: 0;
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
	}
	@keyframes rotate-loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@-moz-keyframes rotate-loading {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

type LoadingType = {
	small?: boolean | undefined;
	children?: JSX.Element;
	css?: SerializedStyles | undefined;
};

const smallStyle = css`
	width: 85px;
	height: 85px;
	.loading-container,
	.loading,
	.loading-text {
		width: 80px;
		height: 80px;
	}
`;
export const Loading = ({ small }: LoadingType) => {
	return (
		<LoadingStyle
		// css={css`
		// 	${small && smallStyle}
		// `}
		>
			<div className="loading-container">
				<div className="loadingAndText">
					<div className="loading"></div>
					<div className="loading-text">loading</div>
				</div>
			</div>
		</LoadingStyle>
	);
};
