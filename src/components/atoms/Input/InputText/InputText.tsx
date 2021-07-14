import { color } from "components/atoms/Spacing";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled/macro";

type InputTextProps = {
	small?: boolean | undefined;
	large?: boolean | undefined;
	primary?: boolean | undefined;
	pink?: boolean | undefined;
	border?: string | undefined;
	customSize?: number[] | undefined;
	css?: SerializedStyles | undefined;
};

const small = css`
	font-size: 12px;
	min-height: 25px;
`;

const large = css`
	min-height: 60px;
	font-size: 17px;
`;

const primary = css`
	font-size: 14px;
	border: 1px solid black;
	border-radius: 5px;
	padding: 20px;
`;

export const InputBaseStyle = css`
	padding: 0 0 0 10px;
	min-height: 40px;
	min-width: 100px;
	box-sizing: border-box;
	color: #333;
	border: 0;
	height: 100%;
	font-size: 14px;
	flex: 100 1;
	&:disabled {
		background-color: rgba(239, 239, 239, 0.3);
	}
	&::placeholder {
		font-size: 15px;
		color: #a8a8a8;
		font-weight: 300;
	}
`;

/** <InputText {size} /> 사이즈 선택이 가능하다 (small / large) 옵션 없을 시, 기본 */
export const InputText = styled.input<InputTextProps>`
	${InputBaseStyle}
	${props => props.large && large};
	${props =>
		props.customSize &&
		`min-height: ${props.customSize[0]}px; font-size:${props.customSize[1]}px;`};
	${props => props.primary && primary};
	${props => props.small && small};
	${props => props.pink && "border : 1px solid #ff4e84;"};
	${props => props.border && `border : 1px solid ${color(props.border)}`};
`;
