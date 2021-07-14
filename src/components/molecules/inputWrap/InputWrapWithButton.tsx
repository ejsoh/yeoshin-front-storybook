import { Column, Row } from "components/atoms/Grid";

import { Button } from "components/atoms";
import { InputWrap } from "..";
import React from "react";
import { SpaceContainer } from "components/atoms/Spacing";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { ValidationText } from "../anchors/ValidationAnchor";

// 인터페이스 정의 : 보낼 타입 지정
export type InputStyle = {
	labelText?: string;
	maxLength?: number;
	placeholder?: string;
	errortext?: string | boolean;
	inputmessage?: string | boolean;
	value?: string;
	icon?: JSX.Element;
	pattern?: string;
	type?: string;
	afterIcon?: JSX.Element | undefined;
};

type ButtonStyle = {
	name: string;
	onClick: () => void;
	disabled?: boolean;
	buttonPadding?: number;
};
type Combine = {
	input: InputStyle;
	button: ButtonStyle;
	errText?: string;
};

export const InputWrapWithButton = ({ input, button, errText }: Combine) => {
	return (
		<Column>
			<Row isWrap span={[3, 1]}>
				<InputWrap
					labelText={input.labelText}
					inputMessage={input.inputmessage}
					errortext={input.errortext}
					maxLength={input.maxLength}
					value={input.value}
					icon={input.icon}
					type={input.type}
					pattern={input.pattern}
					css={css`
						min-width: 100px;
					`}
					{...input}
				/>

				<Button {...button}>
					<SpaceContainer both={button.buttonPadding ?? 13}>
						{button.name}
					</SpaceContainer>
				</Button>
			</Row>
			{errText && <ValidationText left>{errText}</ValidationText>}
		</Column>
	);
};

export default observer(InputWrapWithButton);
