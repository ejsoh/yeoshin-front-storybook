import React from "react";
import { Button } from "./Button";
import { BlockButton } from "./BlockButton";
import { IconButton } from "./IconButton";
import { IconButtonWithText } from "./IconButtonWithText";

export type ButtonProps = {
	title?: string | undefined;
	small?: boolean | undefined;
	large?: boolean | undefined;
	medium?: boolean | undefined;
	filled?: boolean | undefined;
	noBorder?: boolean | undefined;
	gray?: boolean | undefined;
	filledGray?: boolean | undefined;
	filledBlack?: boolean | undefined;
	iconRight?: boolean | undefined;
	padding?: number | undefined;
	minWidth?: number | undefined;
	custom?: string | undefined;
	borderRadius?: number | undefined;
	width?: number | undefined;
	height?: number | undefined;
	margin?: number[] | undefined;
	round?: boolean | undefined;
	rectangle?: boolean | undefined;
	iconName?: string | undefined;
	iconSize?: number | undefined;
	backgroundColor?: string | undefined;
	border?: string | undefined;
	disabled?: boolean | undefined;
	onClick?: () => void | undefined;
};

export { Button, BlockButton, IconButton, IconButtonWithText };
