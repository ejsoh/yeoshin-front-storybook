import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { Icon } from "../Icons/Icon";

export type ButtonProps = {
	small?: boolean | undefined;
	large?: boolean | undefined;
	medium?: boolean | undefined;
	filled?: boolean | undefined;
	noBorder?: boolean | undefined;
	gray?: boolean | undefined;
	filledGray?: boolean | undefined;
	filledBlack?: boolean | undefined;
	round?: boolean | undefined;
	iconRight?: boolean | undefined;
	padding?: number | undefined;
	minWidth?: number | undefined;
	custom?: string | undefined;
	borderRadius?: number | undefined;
	width?: number | undefined;
	height?: number | undefined;
	iconSize?: number | undefined;
	/**
	 * 아이콘 이름 (ex: backArrow)
	 */
	iconName?: string | undefined;
};

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
 * ####Primary UI compoentn for user interaction 
 * - Default
 * - IconButton
 * - SelectedButtonBorder
 * - DisabledButton
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

export const IconButton = ({
	width,
	height,
	borderRadius,
	iconName,
	iconSize,
}: ButtonProps) => {
	return (
		<IconButtonContainer
			width={width}
			height={height}
			borderRadius={borderRadius}
		>
			<Icon icon={iconName} size={iconSize} />
		</IconButtonContainer>
	);
};

const IconButtonContainer = styled.div<ButtonProps>`
	cursor: pointer;
	width: ${props => props.width + "px"};
	height: ${props => props.height + "px"};
	border-radius: ${props => props.borderRadius + "px"};
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #3d3d3d;
`;

export type DisabledButtonProps = {
	margin?: number[] | undefined;
	onClick?: () => void;
};

export const DisabledButton = ({
	title,
	onClick,
	margin,
}: {
	title: string;
	margin: number[];
	onClick: () => void;
}) => {
	return (
		<DisabledButtonStyle onClick={onClick} margin={margin}>
			{title}
		</DisabledButtonStyle>
	);
};
const DisabledButtonStyle = styled.div<DisabledButtonProps>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 4px;
	color: #a8a8a8;
	font-size: 15px;
	${props =>
		props.margin &&
		`margin: ${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`};
`;
