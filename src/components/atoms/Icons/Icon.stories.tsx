import React from "react";
import { Icon } from "./Icon";
import { object, withKnobs } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";

export default {
	title: "Icon",
	component: Icon,
	decorators: [withKnobs],
};

export const Default = () => {
	return (
		<div style={{ display: "flex", alignItems: "flex-start" }}>
			<Icon icon="arrowLeftBlack" size={20} event={() => actions("onclick")} />
		</div>
	);
};
