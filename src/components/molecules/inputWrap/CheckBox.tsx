import { CheckBox } from "components/atoms/Input/InputCheckbox/InputCheckbox";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import { Label } from "components/atoms/Label/Label";
import styled from "@emotion/styled/macro";
const checkboxStyle = css`
	margin-right: 7px;
`;
const Container = styled(Label)`
	margin: 0 5px;
	p {
		margin: 0 5px;
	}
	input:checked {
		~ p {
			color: #ff4e84;
		}
	}
`;

export const Checkboxs = ({
	labelText = "",
	small = false,
	medium = false,
	...rest
}) => {
	return (
		<Container right text={labelText}>
			{<CheckBox css={checkboxStyle} {...rest} />}
		</Container>
	);
};
