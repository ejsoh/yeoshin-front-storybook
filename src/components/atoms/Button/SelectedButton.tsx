import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

// NOTE : 밑에 border 있는 선택된 메뉴
type SelectedButtonProps = {
	margin?: number[] | undefined;
	onClick?: () => void;
};

const SelectedMenuStyle = styled.div<SelectedButtonProps>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 4px;
	position: relative;
	color: #ef4b81;
	font-size: 15px;
	${props =>
		props.margin &&
		`margin: ${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`};
`;

const Border = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 2px;
	background-color: #ef4b81;
`;

export const SelectedButton = ({
	title,
	margin,
	onClick,
}: {
	title: string;
	margin: number[];
	onClick: () => void;
}) => {
	return (
		<SelectedMenuStyle onClick={onClick} margin={margin}>
			{title}
			<Border />
		</SelectedMenuStyle>
	);
};
