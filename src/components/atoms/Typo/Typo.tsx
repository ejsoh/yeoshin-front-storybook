import React from "react";
import { ellipsisStyle } from "../Message";
/** JSX */
import styled from "@emotion/styled/macro";
import { switchProp } from "styled-tools";

export type TypoProps = {
	themes?: string;
	text?: string;
	color?: string;
	fontSize?: string;
	backgroundColor?: string;
	display?: string | null;
	textAlign?: string;
	underGround?: boolean;
	className?: string;

	width?: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const CustomTypo = styled.div<TypoProps>`
	${switchProp("themes", {
		"is-false": `
      color: #ef4b81;
    `,
		primary: `
      color: #666;
    `,
	})}
	display: ${props => props.display};
	text-align: ${props => props.textAlign};
	width: ${props => props.width};
`;
export const Typo = ({
	className,
	themes = "primary",
	display = "block",
	color,
	fontSize,
	textAlign,
	text,
	width,
	...props
}: TypoProps) => {
	return (
		<CustomTypo
			themes={themes}
			display={display}
			width={width}
			color={color}
			textAlign={textAlign}
			className={className}
			text={text}
		>
			{text}
		</CustomTypo>
	);
};

type NumberTextType = {
	pink?: boolean | undefined;
	lightPink?: boolean | undefined;
	white?: boolean | undefined;
	lightgray?: boolean | undefined;
	gray?: boolean | undefined;
	small?: boolean | undefined;
	large?: boolean | undefined;
	bold?: boolean | undefined;
	size?: number | undefined;
	weight?: number | undefined;
	ellipsis?: boolean | undefined;
	letterSpacing?: number | undefined;
	padding?: string | undefined;
	center?: boolean | undefined;
};

const color = (props: NumberTextType) => {
	const attr = (color: string) => `color : ${color};`;
	let styles = "";
	switch (true) {
		case props.pink:
			styles = attr("#ef4b81");
			break;

		case props.lightPink:
			styles = attr("#ef4b81");
			break;

		case props.white:
			styles = attr("#fff");
			break;

		case props.lightgray:
			styles = attr("#f7f7f7");
			break;

		case props.gray:
			styles = attr("#a8a8a8");
			break;

		default:
			styles = attr("#3d3d3d");
			break;
	}
	return styles;
};
export const NumberText = styled.div<NumberTextType>`
	font-family: "Open Sans", sans-serif;
	font-size: 13px;
	${props => color(props)}
	${props => props.small && "font-size: 11px;"}
	font-weight: ${props => (props.bold ? "700" : "300")};
	${props => props.size && `font-size: ${props.size}px;`}
	${props => props.ellipsis && ellipsisStyle};
	${props => props.weight && `font-weight: ${props.weight};`}
	${props => props.letterSpacing && `letter-spacing: ${props.letterSpacing}px;`}
	${props => props.padding && `padding: ${props.padding}px`};
	${props => props.center && "text-align: center"};
`;

export const Bold = styled.div`
	font-weight: 500;
`;
