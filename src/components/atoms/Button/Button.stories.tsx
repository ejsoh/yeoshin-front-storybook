import React from "react";
import { Button } from "./Button";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BlockButton } from "./BlockButton";
import { IconButton } from "./IconButton";
import { IconButtonWithText } from "./IconButtonWithText";

export const Default = () => {
	return (
		<div style={{ width: "100px", height: "40px" }}>
			<Button onClick={action("onclick")}>여신티켓</Button>
		</div>
	);
};

export const blockButton = (args: any) => {
	return (
		<BlockButton
			title={args.title}
			round={args.shape == "Round"}
			backgroundColor={args.background}
			border={args.border}
			onClick={action("onclick")}
		/>
	);
};

blockButton.args = {
	title: "여신티켓",
	shape: "default",
	background: "#ef4b81",
	border: "none",
};

export const iconButton = (args: any) => {
	return (
		<IconButton
			width={args.width}
			height={args.height}
			round={args.shape == "Round"}
			backgroundColor={args.background}
			iconName={args.icon}
			iconSize={args.iconSize}
			onClick={action("onclick")}
		/>
	);
};

iconButton.args = {
	width: "30",
	height: "30",
	shape: "default",
	background: "#EF4B81",
	icon: "time",
	iconSize: "20",
};

export const iconButtonWithText = (args: any) => {
	return (
		<IconButtonWithText
			width={args.width}
			height={args.height}
			round={args.shape == "Round"}
			backgroundColor={args.background}
			iconName={args.icon}
			iconSize={args.iconSize}
			onClick={action("onclick")}
		/>
	);
};

iconButtonWithText.args = {
	width: "30",
	height: "30",
	shape: "default",
	background: "#EF4B81",
	icon: "time",
	iconSize: "20",
};

export default {
	title: "BASE/Button",
	component: Button,
	decorators: [withKnobs],
	argTypes: {
		title: {
			control: "text",
		},
		shape: {
			control: { type: "select", options: ["Default", "Round"] },
		},
		background: {
			control: "color",
		},
		border: {
			control: { type: "select", options: ["none", "black", "#EF4B81"] },
		},

		width: {
			control: "text",
		},
		height: {
			control: "text",
		},
		icon: {
			control: { type: "select", options: ["time", "down"] },
		},
		iconSize: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
	},
};
