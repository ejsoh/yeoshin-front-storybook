import { Column, Row } from "components/atoms/Grid";
import { InputMessage, Text } from "components/atoms/Text";

import { InputText } from "components/atoms";
import { Label } from "components/atoms/Label/Label";
import React from "react";
import { SpaceContainer } from "components/atoms/Spacing";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react/macro";
import { ValidationText } from "../anchors/ValidationAnchor";
import styled from "@emotion/styled/macro";

export type InputWrapProps = {
	labelText?: string;
	maxLength?: number;
	placeholder?: string;
	type?: string;
	errText?: string | boolean;
	labelwidth?: string;
	inputMessage?: string | boolean;
	afterIcon?: JSX.Element | undefined;
	value?: string;
	disabled?: boolean;
	single?: boolean | undefined;
	beforeIcon?: JSX.Element | undefined;
	isFocus?: boolean | undefined;
	isFullWidth?: boolean | undefined;
	css?: SerializedStyles | undefined;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LabelCustomStyle = styled(Row)`
	border: 1px solid #cccbcb;
	border-radius: 5px;
	padding: 1px;
	&:focus-within {
		border: 1px solid #ef4b81;
		${Text}::after {
			border-right: 1px solid #ef4b81;
		}
	}
`;
export const labelSectionStyle = css`
	${Text} {
		min-width: 80px;
		text-align: center;
		white-space: pre-wrap;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		left: 0;
		&::after {
			content: "";
			height: 23px;
			position: absolute;
			border-right: 1px solid #cccbcb;
			right: 0;
		}
	}
`;

const disabled = css`
	color: -internal-light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
	cursor: default;
	background-color: rgba(239, 239, 239, 0.3);
	border-color: rgba(118, 118, 118, 0.3);
`;

type InputContainerProps = { single?: boolean; inputMessage?: boolean };
const InputContainer = styled(Column)<InputContainerProps>`
	${labelSectionStyle};
	${props => props.single && "margin:  3px;"}
	${props => props.inputMessage && "position: relative"};
`;
export const InputWrap = ({
	labelText = "",
	errText,
	inputMessage,
	afterIcon,
	beforeIcon,
	single,
	isFocus,
	isFullWidth,
	...rest
}: InputWrapProps) => {
	return (
		<InputContainer
			fullWidth={isFullWidth}
			single={single}
			inputMessage={inputMessage !== ""}
		>
			<LabelCustomStyle between>
				<>{beforeIcon && beforeIcon}</>
				<Label css={[rest.disabled && disabled]} text={labelText} isForm>
					<InputText
						autoComplete="false"
						css={css`
							width: 100%;
						`}
						{...rest}
					/>
				</Label>
				<>
					{afterIcon && (
						<SpaceContainer column={10} row={10}>
							{afterIcon}
						</SpaceContainer>
					)}
				</>
			</LabelCustomStyle>
			{inputMessage && <InputMessage msg={inputMessage as string} />}

			{errText && <ValidationText left>{errText}</ValidationText>}
		</InputContainer>
	);
};
