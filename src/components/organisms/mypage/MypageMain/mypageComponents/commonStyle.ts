/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
export const Countcommon = css`
	background-color: #ef4b81;
	border-radius: 50px;
	padding: 2px 4px;
	color: #fff;
	display: flex;
	justify-content: center;
	font-family: "Open Sans";
	align-items: center;
	font-size: 12px;
	position: absolute;
	top: -10px;
`;

export const BasketCount = styled.div`
	${Countcommon}
	left: 17px;
`;
