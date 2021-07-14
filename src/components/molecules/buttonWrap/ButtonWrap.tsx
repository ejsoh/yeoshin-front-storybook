import React from "react";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled/macro";

// 인터페이스 정의 : 보낼 타입 지정
export type ButtonWrapProps = {
	fit?: number[] | undefined;
	center?: boolean | undefined;
	right?: boolean | undefined;
	children: JSX.Element;
	icon?: JSX.Element;
	css?: SerializedStyles | undefined;
};

// 기본 스타일 지정 및 타입마다 바뀌는 변수 지정
const CustomButtonWrap = styled.div<ButtonWrapProps>`
	display: flex;
	${props => props.center && center}
	${props => props.right && right}
	> * {
		${props =>
			props.fit &&
			`width: auto !important; padding: ${props.fit[0]}px ${props.fit[1]}px ${props.fit[2]}px ${props.fit[3]}px`};
	}
`;

const center = css`
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const right = css``;

export const ButtonWrap = ({ children, ...rest }: ButtonWrapProps) => {
	return <CustomButtonWrap {...rest}>{children}</CustomButtonWrap>;
};
