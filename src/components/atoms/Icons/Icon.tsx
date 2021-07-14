import React from "react";
import styled from "@emotion/styled/macro";
import { ElementType } from "react";
import { SerializedStyles } from "@emotion/react";

type IconProps = {
	icon?: string;
	size?: number;
	as?: ElementType | undefined;
	event?: () => void;
	href?: string | undefined;
	format?: string | undefined;
	url?: string | undefined;
	color?: string | undefined;
	padding?: string | undefined;
	css?: SerializedStyles | undefined;
};

export const color = (color: string) => {
	const attr = (color: string) => `filter : ${color};`;
	let styles = "";
	switch (true) {
		case "black" === color:
			styles = attr(
				"invert(0%) sepia(1%) saturate(4%) hue-rotate(320deg) brightness(96%) contrast(104%)"
			);
			break;

		case "pink" === color:
			styles = attr(
				"invert(48%) sepia(56%) saturate(2375%) hue-rotate(310deg) brightness(92%) contrast(104%)"
			);
			break;

		case "gray" === color:
			styles = attr(
				"invert(20%) sepia(0%) saturate(1%) hue-rotate(2deg) brightness(99%) contrast(84%)"
			);
			break;

		case "lightgray" === color:
			styles = attr(
				"invert(80%) sepia(7%) saturate(0%) hue-rotate(179deg) brightness(100%) contrast(100%)"
			);
			break;

		case "white" === color:
			styles = attr(
				"invert(96%) sepia(0%) saturate(0%) hue-rotate(168deg) brightness(104%) contrast(105%)"
			);
			break;

		default:
			styles = attr(
				"invert(0%) sepia(1%) saturate(4%) hue-rotate(320deg) brightness(96%) contrast(104%)"
			);
			break;
	}
	return styles;
};

/**
 *
 *@icon 아이콘 주소
 *@size 아이콘 사이즈 (number)
 *@as anchor tag (string)
 *@event () => void;
 *@href link string;
 *@format string / default svg
 *@url string
 *@color string
 *@padding string
 */

/**
 `Icon` 컴포넌트

 * - url이 존재하면 url 이미지
 * - 아니면 public/images/icons/{icon}.svg 이미지
 */

export const Icon = ({
	icon,
	size = 20,
	event,
	format = "svg",
	url,
	...rest
}: IconProps) => {
	return (
		<IconStyle size={size} onClick={() => event && event()} {...rest}>
			{url !== undefined ? (
				<img src={url} className={icon} />
			) : (
				<img src={`/images/icons/${icon}.${format}`} className={icon} />
			)}
		</IconStyle>
	);
};

export const pngImage = (path: string) => {
	return `/images/icons/${path}.png `;
};

export const isChecked = (isChecked: boolean) => {
	return isChecked ? "checkbox-checked" : "checkbox-unchecked";
};

const IconStyle = styled.div<IconProps>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: auto;
		height: ${props => `${props.size}px`};
		${props => props.color && color(props.color)}
	}
	${props => props.padding && `padding : ${props.padding}`}
`;
