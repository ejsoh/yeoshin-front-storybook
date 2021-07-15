import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { ButtonProps } from "./index";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Space } from "../Spacing";

const IconTextButtonStyle = styled.button<ButtonProps>`
	cursor: pointer;
	box-sizing: border-box;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ef4b81;
	border-radius: 50px;
	color: white;
	font-size: 15px;
	padding: 8px 12px;
	${props => props.reverse && "flex-direction:row-reverse"};
	${props => props.width && `width : ${props.width}px`};
	${props => props.height && `height : ${props.height}px`};
	${props => props.space && `padding: ${props.space[0]}px ${props.space[1]}px`};
	${props =>
		props.margin &&
		`margin: ${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`};
	${props => props.round && "border-radius : 50px"};
	${props =>
		props.backgroundColor && `background-color : ${props.backgroundColor}`};
	${props => props.border && `border : 1px solid ${props.border}`};
`;

// NOTE : 아이콘과 텍스트가 존재하는 버튼
// NOTE : 방향 default는 아이콘이 오른쪽 / reverse하면 아이콘이 왼쪽
export const IconTextButton = ({
	children,
	width,
	height,
	margin,
	space,
	round,
	backgroundColor,
	border,
	reverse,
	onClick,
}: ButtonProps) => {
	return (
		<IconTextButtonStyle
			width={width}
			height={height}
			margin={margin}
			space={space}
			round={round}
			backgroundColor={backgroundColor}
			border={border}
			reverse={reverse}
			onClick={onClick}
		>
			{children}
		</IconTextButtonStyle>
	);
};
