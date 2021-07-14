import React from "react";
import { Text } from "./index";
import { object, withKnobs } from "@storybook/addon-knobs";

export default {
	title: "Text",
	component: Text,
	decorators: [withKnobs],
};

export const Default = () => {
	return (
		<Text size={19} bold left>
			텍스트
		</Text>
	);
};

export const TextLabel = () => {
	return (
		<Text size={19} bold left>
			텍스트 라벨
		</Text>
	);
};
