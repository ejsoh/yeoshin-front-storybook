import React from "react";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { Text } from "components/atoms/Message";

type LabeProps = {
	text?: string;
	icon?: JSX.Element;
	children?: JSX.Element;
	className?: string;
	right?: boolean | undefined;
	isForm?: boolean;
	css?: any | undefined;
};

export const LabelBaseStyle = css`
	display: flex;
	flex-direction: row-reverse;
	white-space: nowrap;
	align-items: center;
`;
const FormContainer = styled.form`
	width: 100%;
`;
const Labels = (props: LabeProps) => {
	return props.isForm ? (
		<FormContainer onSubmit={e => e.preventDefault()}>
			<label className={props.className}>
				{props.children}
				{props.text && <Text {...props}>{props.text}</Text>}
			</label>
		</FormContainer>
	) : (
		<label className={props.className}>
			{props.children}
			{props.text && <Text {...props}>{props.text}</Text>}
		</label>
	);
};

export const Label = styled(Labels)`
	${LabelBaseStyle};
	${props => props.right && "flex-direction: row"}
`;
