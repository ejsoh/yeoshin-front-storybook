import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { CategoryProps } from "./index";

const CategoryStyle = styled.div<CategoryProps>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 4px;
	position: relative;
	width: fit-content;
	color: #ef4b81;
	font-size: 15px;
	${props =>
		props.disabled &&
		css`
			color: #a8a8a8a8;
			div {
				display: none;
			}
		`}
`;

const Border = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2px;
	background-color: #ef4b81;
`;

/**
`Category` 컴포넌트
 *
 * 
 * ####Primary Category component for Yeoshin Design System 
 * - Default
 */

export const Category = ({ title, disabled, onClick }: CategoryProps) => {
	return (
		<CategoryStyle onClick={onClick} disabled={disabled}>
			{title}
			<Border />
		</CategoryStyle>
	);
};
