import React from "react";
import { Text } from "./index";
import { object, withKnobs } from "@storybook/addon-knobs";

export const Default = (args: any) => {
	return (
		<Text size={args.size} bold={args.bold} left color={args.color}>
			텍스트
		</Text>
	);
};

Default.args = {
	size: 20,
	bold: true,
	color: "#EF4B81",
};

export default {
	title: "COMPONENT/Text",
	component: Text,
	decorators: [withKnobs],
	argTypes: {
		size: {
			control: { type: "text" },
		},
		bold: {
			control: { type: "boolean" },
		},
		color: {
			control: {
				type: "color",
			},
		},
	},
};
