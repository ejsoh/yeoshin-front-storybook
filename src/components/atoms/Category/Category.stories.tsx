import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Category } from "./Category";

export const Default = (args: any) => {
	return (
		<Category onClick={action("onclick")} disabled={args.disabled}>
			카테고리
		</Category>
	);
};

Default.args = {
	disabled: false,
};

export default {
	title: "COMPONENT/Category",
	component: Category,
	decorators: [withKnobs],
	argTypes: {
		disabled: {
			control: "boolean",
		},
	},
};
