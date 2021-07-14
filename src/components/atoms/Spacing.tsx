import styled from "@emotion/styled/macro";

type SpaceType = {
	row?: number;
	rows?: number[];
	column?: number;
	columns?: number[];
	both?: number;
	letterSpacing?: number | undefined;
	borderTop?: string | undefined;
	borderBottom?: string | undefined;
	background?: string | undefined;
	lineHeight?: number | undefined;
};
export const Space = styled.div<SpaceType>`
	${props => props.row && `width:${props.row}px`};
	${props => props.column && `height:${props.column}px`};
`;

export const color = (color: string) => {
	const attr = (color: string) => `${color};`;
	let styles = "";
	switch (true) {
		case color === "black":
			styles = attr("black");
			break;

		case color === "pink":
			styles = attr("#ef4b81");
			break;

		case color === "gray":
			styles = attr("#3d3d3d");
			break;

		case color === "lightgray":
			styles = attr("#A8A8A8");
			break;

		case color === "white":
			styles = attr("#fff");
			break;

		default:
			styles = attr(color);
			break;
	}
	return styles;
};

export const SpaceContainer = styled.div<SpaceType>`
	${props => props.row && `padding:0 ${props.row}px`};
	${props => props.column && `padding:${props.column}px 0`};
	${props => props.rows && `padding:0 ${props.rows[0]}px 0 ${props.rows[1]}px`};
	${props =>
		props.columns && `padding:${props.columns[0]}px 0 ${props.columns[1]}px`};
	${props =>
		props.column && props.row && `padding:${props.column}px ${props.row}px`};
	${props =>
		props.columns &&
		props.rows &&
		`padding:${props.columns[0]}px ${props.rows[0]}px ${props.columns[1]}px ${props.rows[1]}px`};
	${props => props.both && `padding:${props.both}px`};
	${props =>
		props.borderTop && `border-top:1px solid ${color(props.borderTop)}`};
	${props =>
		props.borderBottom &&
		`border-bottom:1px solid ${color(props.borderBottom)}`};
	${props =>
		props.background && `background-color: ${color(props.background)};`}
	${props => props.letterSpacing && `letter-spacing: ${props.letterSpacing}px;`}
	${props => props.lineHeight && `line-height: ${props.lineHeight}px;`}
`;

export const SpaceBorder = styled.div`
	width: 100%;
	background: #f7f7f7;
	border-top: 1px solid #e6e6e6;
	height: 12px;
	box-sizing: border-box;
`;
