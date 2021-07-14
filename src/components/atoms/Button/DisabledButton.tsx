import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

// NOTE : 밑에 border 있는 선택된 메뉴

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
