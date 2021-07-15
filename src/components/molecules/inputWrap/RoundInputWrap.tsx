import { Column, Row } from "components/atoms/Grid";
import { InputMessage } from "components/atoms/Text";
import styled from "@emotion/styled/macro";
import { InputText } from "components/atoms";
import { Label } from "components/atoms/Label/Label";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import { labelSectionStyle } from "./InputWrap";
import { ValidationText } from "../anchors/ValidationAnchor";

export type InputWrapProps = {
	labelText?: string;
	maxLength?: number;
	placeholder?: string;
	disabled?: boolean;

	type?: string;
	errText?: string | boolean;
	labelwidth?: string;
	inputMessage?: string | boolean;
	beforeIcon?: JSX.Element;
	afterIcon?: JSX.Element;
	focus?: () => void;
	blur?: () => void;
};

const labelRound = css`
	border: 1px solid #cccbcb;
	border-radius: 4px;
	overflow: hidden;
	padding: 1px;
	background-color: #fff;

	top: 0;
	.afterIcon {
		filter: invert(0) sepia(0) saturate(0) hue-rotate(175deg);
	}
	&:focus-within {
		border: 1px solid #ff4e84;
		.afterIcon {
			filter: none;
		}
	}
	input::placeholder {
		font-size: 15px;
	}
`;

const labelRoundStyle = css`
	${labelSectionStyle}

	p {
		min-width: 52px;
		&::after {
			right: auto;
			left: 0;
		}
	}
`;
const inputStyle = css`
	padding: 0;
`;
const RoundInputcontainer = styled.div`
	${labelRound}
	${labelRoundStyle}
`;

export const RoundInput = ({
	labelText = "",
	errText = "",
	inputMessage = "",
	beforeIcon,
	afterIcon,
	focus,
	blur,
	...rest
}: InputWrapProps) => {
	return (
		<Column>
			<RoundInputcontainer>
				<Column>
					<Row>
						<>{beforeIcon && beforeIcon}</>
						<Label
							css={css`
								width: 100%;
							`}
							text={labelText}
							right
						>
							<InputText
								autoComplete="false"
								{...rest}
								customSize={[46, 15]}
								css={inputStyle}
								onFocus={focus && focus}
								onBlur={blur && blur}
							/>
						</Label>
						<Label className="afterIcon">{afterIcon && afterIcon}</Label>
					</Row>
					{inputMessage && <InputMessage msg={inputMessage as string} />}
				</Column>
			</RoundInputcontainer>
			{errText && <ValidationText left>{errText}</ValidationText>}
		</Column>
	);
};
