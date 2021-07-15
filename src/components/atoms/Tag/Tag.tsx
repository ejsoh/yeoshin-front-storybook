import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { TagProps } from "./index";

const TagStyle = styled.button<TagProps>`
	cursor: pointer;
	box-sizing: border-box;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(239, 75, 129, 0.1);
	border-radius: 4px;
	color: #ef4b81;
	font-size: 13px;
	font-weight: bold;
	padding: 8px 12px;
	${props =>
		props.margin &&
		`margin: ${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`};
`;

/**
`Tag` 컴포넌트
 *
 * 
 * ####Primary Tag component for Yeoshin Design System 
 * - Default
 */

export const Tag = ({ children, margin, onClick }: TagProps) => {
	return (
		<TagStyle margin={margin} onClick={onClick}>
			# {children}
		</TagStyle>
	);
};
