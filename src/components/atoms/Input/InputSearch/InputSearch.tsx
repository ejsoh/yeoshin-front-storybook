/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

type InputSearchProps = {
	small?: boolean | undefined;
	large?: boolean | undefined;
	primary?: boolean | undefined;
	pink?: boolean | undefined;
};

// const small = css`
// 	font-size: 12px;
// 	min-height: 25px;
// `;

// const large = css`
// 	min-height: 60px;
// 	font-size: 17px;
// `;

const primary = css`
	position: fixed;
	width: 400px;
	border-bottom: 2px solid #ef5d9e;
	font-size: 14px;
	padding: 0 30px 0 2px;
`;

export const InputSearchBaseStyle = css`
	width: 400px;
	height: 30px;
	padding: 0 30px 0 2px;
	border: none;
	border-bottom: 2px solid #ef5d9e;
	font-size: 14px;
	&:focus {
		color: #ef5d9e;
	}
	&::placeholder {
		color: #d5d5d5;
	}
`;

/** <InputText {size} /> 사이즈 선택이 가능하다 (small / large) 옵션 없을 시, 기본 */
export const InputSearch = styled.input<InputSearchProps>`
	${InputSearchBaseStyle}
	${props => props.primary && primary};
`;
