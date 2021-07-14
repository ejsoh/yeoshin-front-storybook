import React from "react";
import { Button, IconButton, DisabledButton } from "./index";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { SelectedButton } from "./SelectedButton";

export default {
	title: "Button",
	component: Button,
	decorators: [withKnobs],
};

export const Default = () => {
	return (
		<div style={{ width: "100px" }}>
			<Button onClick={action("onclick")}>여신티켓</Button>
		</div>
	);
};

export const iconButton = () => {
	return (
		<IconButton
			width={30}
			height={30}
			borderRadius={50}
			iconName={"time"}
			iconSize={20}
		/>
	);
};

export const selectedButtonBorder = () => {
	return (
		<div style={{ width: "50px" }}>
			<SelectedButton
				title={"이벤트"}
				onClick={action("onclick")}
				margin={[0, 0]}
			/>
		</div>
	);
};

export const disabledButton = () => {
	return (
		<div style={{ width: "50px" }}>
			<DisabledButton
				title={"이벤트"}
				onClick={action("onclick")}
				margin={[0, 0]}
			/>
		</div>
	);
};
