import { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled/macro";

type ColumnProps = {
	as?: string | undefined;
	href?: string | undefined;
	itemSpace?: number | undefined;
	space?: number[] | undefined;
	fullWidth?: boolean | undefined;
	styles?: string | undefined;
	css?: SerializedStyles | undefined;
};

export const Column = styled.div<ColumnProps>`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	& > * {
		${props => props.itemSpace && `margin-top: ${props.itemSpace}px`}
	}
	${props => props.space && `padding: ${props.space[0]}px ${props.space[1]}px`}
	${props => props.fullWidth && "width: 100%;"}
	${props => props.styles && props.styles}
`;
