import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

// NOTE : 밑에 border 있는 선택된 메뉴

export type UnSelectedMenuProps = {
	margin?: number[] | undefined;
	onClick?: () => void;
};

const UnSelectedMenuStyle = styled.div<UnSelectedMenuProps>`
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

export const UnSelectedMenu = ({
	title,
	onClick,
	margin,
}: {
	title: string;
	margin: number[];
	onClick: () => void;
}) => {
	return (
		<UnSelectedMenuStyle onClick={onClick} margin={margin}>
			{title}
		</UnSelectedMenuStyle>
	);
};
