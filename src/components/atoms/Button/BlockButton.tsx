import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { ButtonProps } from "./index";

const BlockButtonStyle = styled.button<ButtonProps>`
	cursor: pointer;
	box-sizing: border-box;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ef4b81;
	border-radius: 4px;
	color: white;
	font-size: 15px;
	padding: 8px 12px;
	${props => props.width && `width : ${props.width}px`};
	${props => props.height && `height : ${props.height}px`};
	${props =>
		props.margin &&
		`margin: ${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`};
	${props => props.round && "border-radius : 50px"};
	${props =>
		props.backgroundColor && `background-color : ${props.backgroundColor}`};
	${props => props.border && `border : 1px solid ${props.border}`};
`;

export const BlockButton = ({
	title,
	width,
	height,
	margin,
	round,
	backgroundColor,
	border,
	onClick,
}: ButtonProps) => {
	return (
		<BlockButtonStyle
			width={width}
			height={height}
			margin={margin}
			round={round}
			backgroundColor={backgroundColor}
			border={border}
			onClick={onClick}
		>
			{title}
		</BlockButtonStyle>
	);
};
