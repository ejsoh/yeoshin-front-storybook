import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Category } from "./Category";

export const Default = (args: any) => {
	return (
		<Category
			title={args.title}
			onClick={action("onclick")}
			disabled={args.disabled}
		/>
	);
};

Default.args = {
	title: "카테고리",
	disabled: false,
};

export default {
	title: "BASE/Category",
	component: Category,
	decorators: [withKnobs],
	argTypes: {
		title: {
			control: "text",
		},
		disabled: {
			control: "boolean",
		},
	},
};
