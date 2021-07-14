import React from "react";
import { color } from "../Spacing";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import { ElementType } from "react";

type RowProps = {
	span?: number[];
	children: JSX.Element[];
	single?: JSX.Element | undefined;
	width?: string;
	wrapWidth?: string | undefined;
	between?: boolean | undefined;
	center?: boolean | undefined;
	evenly?: boolean | undefined;
	flexStart?: boolean | undefined;
	around?: boolean | undefined;
	right?: boolean | undefined;
	isOverFlow?: boolean | undefined;
	space?: number[] | undefined;
	as?: ElementType | undefined;
	onClick?: () => void;
	href?: string | undefined;
	isWrap?: boolean | undefined;
	flexEnd?: boolean | undefined;
	borderTop?: string | undefined;
	border?: string | undefined;
	borderBottom?: string | undefined;
	lineHeight?: number | undefined;
	isScroll?: boolean | undefined;
	fullWidth?: boolean | undefined;
	styles?: string | undefined;
	css?: SerializedStyles | undefined;
};

type SpanType = {
	span?: number[];
};

const between = css`
	justify-content: space-between;
	align-items: center;
	-webkit-box-align: initial;
`;
const end = css`
	justify-content: flex-end;
	align-items: center;
	-webkit-box-align: initial;
`;

const center = css`
	justify-content: center;
	align-items: center;
`;
const right = css`
	justify-content: flex-end;
	align-items: center;
`;

const scroll = css`
	overflow-x: scroll;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none;
	border-right: 1px solid #e6e6e6;
	&::-webkit-scrollbar {
		display: none;
	}
	scroll-behavior: smooth;
`;

const RowStyle = styled.div<RowProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	${props => props.isWrap && "flex-wrap: wrap;"};
	${props => props.space && `padding: ${props.space[0]}px ${props.space[1]}px`};
	${props => props.width};
	${props => props.between && between};
	${props => props.flexEnd && end};
	${props => props.center && center};
	${props => props.right && right};
	${props => props.wrapWidth && `width: ${props.wrapWidth}px`};
	${props => props.evenly && "justify-content: space-evenly;"};
	${props => props.around && "justify-content: space-around;"};
	${props => props.flexStart && "justify-content: flex-start;"};
	${props =>
		props.borderTop && `border-top:1px solid ${color(props.borderTop)}`};
	${props => props.lineHeight && `line-height: ${props.lineHeight}`};
	${props =>
		props.borderBottom &&
		`border-bottom:1px solid ${color(props.borderBottom)}`};
	${props => props.border && `border:1px solid ${color(props.border)}`};
	${props => props.isScroll && scroll};
	${props => props.fullWidth && "width: 100%"};
	${props => props.styles && props.styles};
`;

const RowItem = styled.div`
	width: 100%;
	margin: 3px;
`;

const width = ({ span = [] }: SpanType) => {
	let styles = "";

	span.forEach((element, index) => {
		return (styles += `& > div:nth-of-type(${index + 1}) {
			flex: ${element};
		};`);
	});
	return css`
		${styles}
	`;
};
const FlowItem = styled.div`
	flex: 0 0 auto;
	overflow: hidden;
`;
export const Row = ({ span = [], isOverFlow, children, ...rest }: RowProps) => {
	const length = span.length;
	const isEmpty = length > 0;
	const widthstyles = width({ span: span });

	return isEmpty ? (
		<RowStyle css={widthstyles} {...rest}>
			{children.map((item, index) => {
				return <RowItem key={index + "emptyRow"}>{item}</RowItem>;
			})}
		</RowStyle>
	) : (
		<RowStyle {...rest}>
			{isOverFlow
				? children.map((item, index) => {
						return <FlowItem key={index + "noEmptyRow"}>{item}</FlowItem>;
				  })
				: children}
		</RowStyle>
	);
};
