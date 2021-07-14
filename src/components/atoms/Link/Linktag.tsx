import styled from "@emotion/styled/macro";
import React from "react";
import { Link } from "react-router-dom";

// TODO: 링크에서 이미지가 있는 경우는 background-size 가 필요한데 이 부분을 어떻게 할지 고민..
// FIXME: Link 를 쓸지 어떤걸 쓸지 물어보기

export type LinkProps = {
	position?: string;
	display?: string;
	color?: string;
	fontSize?: string;
	background?: string;
	text?: string;
	// 링크
	href?: string;
	to: string;
	blank?: boolean;
};

const Linkto = styled(Link)<LinkProps>`
	color: ${props => props.color};
	background: ${props => props.background};
`;

export const Linktag = ({
	display = "inline-block",
	text = "링크",
	background,
	color,
	href,
	to = "/",
	blank,
}: LinkProps) => {
	return (
		<Linkto color={color} to={to}>
			{text}
		</Linkto>
	);
};
