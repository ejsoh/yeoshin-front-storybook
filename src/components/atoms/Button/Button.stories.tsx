import React from "react";
import { Button } from "./Button";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BlockButton } from "./BlockButton";
import { IconButton } from "./IconButton";
import { IconTextButton } from "./IconTextButton";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Space } from "../Spacing";

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
			round={args.shape == "Round"}
			backgroundColor={args.background}
			border={args.border}
			onClick={action("onclick")}
		>
			여신티켓
		</BlockButton>
	);
};

blockButton.args = {
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

export const iconTextButton = (args: any) => {
	return (
		<IconTextButton
			round={args.shape == "Round"}
			backgroundColor={args.background}
			onClick={action("onclick")}
			reverse={args.reverse}
		>
			<Text white bold lineHeight={20}>
				피부타입
			</Text>
			<Space row={5} />
			<Icon icon={args.icon} size={args.iconSize} color={"whiteFill"} />
		</IconTextButton>
	);
};

iconTextButton.args = {
	icon: "close",
	iconSize: "10",
	reverse: false,
};

export default {
	title: "COMPONENT/Button",
	component: Button,
	decorators: [withKnobs],
	argTypes: {
		title: {
			control: "text",
		},
		shape: {
			control: { type: "select", options: ["Round", "Rectangle"] },
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
			control: { type: "select", options: ["time", "down", "close_white"] },
		},
		iconSize: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
		reverse: {
			control: "boolean",
		},
	},
};
