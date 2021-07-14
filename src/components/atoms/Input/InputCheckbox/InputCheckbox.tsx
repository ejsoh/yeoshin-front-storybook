import { HOME } from "constantDatas/api";
import React from "react";
import styled from "@emotion/styled/macro";

const UNCHECKED = `${HOME}/m/images/re_mb/check_off.png`;
const CHECKED = `${HOME}/m/images/re_mb/check_on.png`;

const CustomInput = styled.div`
	border: 1px solid #cccbcb;
	border-radius: 5px;
	background: url(${UNCHECKED}) no-repeat center center;
	-webkit-background-size: contain;
	background-size: 20px 20px;
	width: 18px;
	height: 18px;
	display: flex;
`;

const CheckBoxStyle = styled.div`
	input {
		position: absolute;
		opacity: 0;
		z-index: -1;
	}
	input:checked {
		~ div {
			border: 1px solid #ff4e84;
			background: url("${CHECKED}") no-repeat center;
			background-size: contain;
		}
	}
`;

export const CheckBox = ({ ...rest }) => {
	return (
		<CheckBoxStyle>
			<input type="checkbox" {...rest} />
			<CustomInput />
		</CheckBoxStyle>
	);
};
