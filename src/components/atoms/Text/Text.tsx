import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import { TextAlign } from "./index";

const BaseInline = css`
	position: absolute;
	right: 0;
	margin-right: 10px;
`;

const Error = styled.div`
	${BaseInline}
	color: #ff4e84;
	bottom: 0;
	font-size: 10px;
`;

const Message = styled.div`
	${BaseInline}
	color: #ff4e84;
	font-weight: 500;
	font-size: 13px;
	height: 100%;
	display: flex;
	align-items: center;
`;

export const InputError = ({ msg = "" }) => {
	return <Error>{msg}</Error>;
};

export const InputMessage = ({ msg = "" }) => {
	return <Message>{msg}</Message>;
};

const TextBaseStyle = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-weight: 400;
	bottom: 0;
	font-size: 13px;
	color: black;
	flex-wrap: wrap;
	line-height: 18px;
	white-space: pre-wrap;
`;

export const ellipsisStyle = css`
	text-overflow: ellipsis;
	-webkit-line-clamp: 1;
	overflow: hidden;
	word-break: break-word;
	-webkit-box-orient: vertical;
	display: -webkit-box;
`;

export const textCommon = (props: TextAlign) => {
	const styles = `${props.small ? "font-size: 12px;" : ""}
		${props.large ? "font-size: 19px;" : ""}
		${props.medium ? "font-size: 15px;" : ""}
		${props.left ? "justify-content: start; -webkit-box-align: initial;" : ""}
		${props.center ? "justify-content: center;" : ""}
		${props.bold ? "font-weight: 600;" : "font-weight: normal;"}
		${props.top ? "align-items: flex-start;" : ""}
		`;

	return styles;
};

export const color = (props: TextAlign) => {
	const attr = (color: string) => `color : ${color};`;
	let styles = "";
	switch (true) {
		case props.black:
			styles = attr("black");
			break;

		case props.pink:
			styles = attr("#ef4b81");
			break;

		case props.gray:
			styles = attr("#3d3d3d");
			break;

		case props.lightgray:
			styles = attr("#A8A8A8");
			break;

		case props.white:
			styles = attr("#fff");
			break;

		default:
			styles = attr("black");
			break;
	}
	return styles;
};
/**
 @textAlign top, center, left
 @fontSize small, medium, large
 @fontColor pink, white, black, gray, lightgray / default black
 @fontWeight bold / default normal
 @ellipsis
 @preLine
 @inline
 @string as, href, msg, color, borderBottom, padding, styles
 @number weight, size, line, letterSpacing, textIndent
 */

/**
`Text` 컴포넌트
 *
 * 
 * ####Primary Text component for Yeoshin Design System 
 * - Default
 */

export const Text = styled.div<TextAlign>`
	${TextBaseStyle}
	${props => textCommon(props)}
	${props => color(props)}
	${props => props.ellipsis && ellipsisStyle}
	${props => props.line && `   -webkit-line-clamp: ${props.line};`}
	${props => props.size && `font-size: ${props.size}px;`}
	${props => (props.bold ? "font-weight: 600" : "font-weight: 300")};
	${props => props.weight && `font-weight : ${props.weight};`}
	${props => props.letterSpacing && `letter-spacing:${props.letterSpacing}px`}
	${props => props.textIndent && `text-indent:${props.textIndent}px`}
	${props => props.padding && `padding:${props.padding}px;`}
	${props =>
		props.borderBottom && `border-bottom:1px solid ${props.borderBottom};`}
	${props => props.inline && "display : inline-flex;"}
	${props => props.preLine && "white-space: pre-line"}
	${props => props.styles && props.styles}
	${props => props.lineHeight && `line-height:${props.lineHeight}px`};
	${props => props.ellipsisLine && `-webkit-line-clamp: ${props.ellipsisLine};`}
	${props => props.color && `color:${props.color}`};
`;
