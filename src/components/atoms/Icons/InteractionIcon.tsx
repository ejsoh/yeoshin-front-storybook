import { Icon } from "./Icon";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import Lottie from "lottie-react";

const customs = css`
	img {
		margin-right: 3px;
	}
`;

export const SpinIcon = observer(({ name, ...rest }: { name: string }) => {
	return <Icon icon={name} css={customs} {...rest}></Icon>;
});

type Icon = {
	iconHeight: string;
	iconWidth: string;
};

const IconStyle = styled.button<Icon>`
	border: 0;
	background-color: transparent;
	height: ${props => props.iconHeight}px;
	width: ${props =>
		props.iconWidth === "auto"
			? props.iconWidth
			: `${props.iconWidth}px`} !important;
	justify-content: right;
	display: flex;
	align-items: center;
	width: 100%;
	z-index: 999;
`;

export const InteractionIcon = ({
	jsonIcon,
	loop = true,
	iconHeight = "36",
	iconWidth = "auto",
	click,
	...rest
}: {
	// lottie 자체에서 animationData는 any로 내려줌
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	jsonIcon: any;
	loop?: boolean;
	iconHeight?: string;
	iconWidth?: string;
	click?: () => void;
}) => {
	return (
		<IconStyle
			{...rest}
			iconHeight={iconHeight}
			iconWidth={iconWidth}
			onClick={() => click && click()}
		>
			<Lottie
				loop={loop}
				autoplay={true}
				animationData={jsonIcon}
				rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
			/>
		</IconStyle>
	);
};
