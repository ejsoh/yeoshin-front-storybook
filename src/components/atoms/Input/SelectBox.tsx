import styled from "@emotion/styled/macro";

type StyleProps = { minWidth?: string };

export const SelectBox = styled.select<StyleProps>`
	width: 100%;
	min-height: 40px;
	box-sizing: border-box;

	color: #333;
	border: 0;
	font-size: 14px;
	flex: 100 1;
	&::placeholder {
		font-size: 12px;
		color: #a8a8a8;
		font-weight: 300;
	}
	&:active,
	&:focus {
		outline: 0px !important;
	}
	text-indent: 20%;
	${props => props.minWidth && `min-width: ${props.minWidth}px;`};
`;
