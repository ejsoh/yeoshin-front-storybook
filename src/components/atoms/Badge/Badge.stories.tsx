import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Badge } from "./Badge";

export const Default = (args: any) => {
	return (
		<div style={{ display: "flex" }}>
			<Badge>8</Badge>
			<div style={{ marginRight: "20px" }} />
			<Badge>16</Badge>
			<div style={{ marginRight: "20px" }} />
			<Badge>99+</Badge>
		</div>
	);
};

export default {
	title: "COMPONENT/Badge",
	component: Badge,
	decorators: [withKnobs],
};
