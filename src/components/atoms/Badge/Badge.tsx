import { BadgeProps } from "./index";
import { Icon } from "../Icon/Icon";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

const BadgeStyle = styled.div<BadgeProps>`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ef4b81;
	border-radius: 50px;
	font-size: 12px;
	color: white;
	width: auto;
	min-width: 12px;
	padding: 3px 5px;
`;

/**
`Button` 컴포넌트
 *
 * 
 * ####Primary Badge component for Yeoshin Design System 
 * - Default
 */

export const Badge = ({ children }: BadgeProps) => {
	return <BadgeStyle>{children}</BadgeStyle>;
};
