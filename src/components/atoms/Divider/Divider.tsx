import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

type DividerProps = {
	width?: number | undefined;
	height?: number | undefined;
	backgroundColor?: string | undefined;
};

/**
`Divder` 컴포넌트
 *
 * - width와 height로 px 지정.
 * - backgroundColor로 컬러 지정.
 */

export const Divider = styled.div<DividerProps>`
	${props => props.width && `width: ${props.width}px`};
	${props => props.height && `height: ${props.height}px`};
	${props => props.backgroundColor && `background : ${props.backgroundColor}`};
`;
