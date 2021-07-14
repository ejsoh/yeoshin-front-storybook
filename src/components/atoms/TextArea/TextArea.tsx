import styled from "@emotion/styled/macro";

export type TextAreaProps = {
	height?: number;
};

export const TextArea = styled.textarea<TextAreaProps>`
	font-size: 11px;
	color: #666;
	font-weight: 400;
	width: 100%;

	border: 1px solid #cccbcb;
	padding: 10px;
	box-sizing: border-box;
	border-radius: 4px;

	${props => props.height && `height: ${props.height}px;`}
	white-space: break-spaces;
	resize: none;
	&::placeholder {
		font-size: 12px;
		color: #666;
		font-weight: 300;
		padding: 10px;
		line-height: 16px;
	}
`;
