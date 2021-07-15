import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { ButtonProps } from ".";

const ButtonBaseStyle = css`
	cursor: pointer;
	min-width: 100px;
	min-height: 28px;
	font-size: 14px;
	height: 100%;
	width: 100%;
	border-radius: 5px;
	font-weight: 500;
	box-sizing: border-box;
	color: #ff4e84;
	background: #fff;
	border: 1px solid #ff4e84;
	display: flex;
	align-items: center;
	justify-content: center;
	&:disabled {
		color: #cccbcb;
		border-color: #cccbcb;
		background-color: #eee;
		cursor: not-allowed;
	}
`;

const small = css`
	font-size: 12px;
	min-height: 28px;
`;
const medium = css`
	font-size: 13px;
	min-height: 36px;
`;

const large = css`
	min-height: 48px;
	font-size: 17px;
`;

const fill = css`
	color: #fff;
	background: #ff4e84;
	border: 1px solid #ff4e84;
	&:disabled {
		background-color: #cccbcb;
		color: #fff;
	}
`;

const noBorder = css`
	color: black;
	background: #fff;
	border: 1px solid #e6e6e6;
	&:disabled {
		background-color: #cccbcb;
		color: #fff;
	}
`;

const gray = css`
	color: #cccbcb;
	border-color: #e6e6e6;
	cursor: pointer;
`;
const filledGray = css`
	color: #cccbcb;
	border-color: #cccbcb;
	cursor: pointer;
	background: #ededed;
`;
const filledBlack = css`
	color: #fff;
	cursor: pointer;
	background: #3d3d3d;
	border: 0;
	height: 100%;
`;
const iconRight = css`
	color: #cccbcb;
	border-color: #cccbcb;
	cursor: pointer;
`;

/**
`Button` 컴포넌트
 *
 * 
 * ####Primary Button component for Yeoshin Design System 
 * - Default
 * - BlockButton
 * - IconButton
 * - IconButtonWithText
 */

export const Button = styled.button<ButtonProps>`
	${ButtonBaseStyle}
	${props => props.large && large};
	${props => props.small && small};
	${props =>
		props.minWidth &&
		`min-width:${props.minWidth}px; width: ${props.minWidth}px;`};
	${props => props.medium && medium};
	${props => props.filled && fill};
	${props => props.gray && gray};
	${props => props.filledGray && filledGray};
	${props => props.filledBlack && filledBlack};
	${props => props.iconRight && iconRight};
	${props => props.noBorder && noBorder};
	${props => props.round && "border-radius: 100px;"};
	${props => props.padding && `padding: ${props.padding}px`}
	${props => props.custom && props.custom}
`;
const ButtonContainer = styled.div`
	height: 60px;
	button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 45px;
		border-radius: 0;
	}
`;

export const FixedButton = ({
	title,
	...rest
}: {
	title: string;
	onClick: () => void;
}) => {
	return (
		<ButtonContainer>
			<Button filled large {...rest}>
				{title}
			</Button>
		</ButtonContainer>
	);
};
