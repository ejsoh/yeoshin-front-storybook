import React from "react";
import { Icon } from "./Icon";
import { object, withKnobs } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";
import { InteractionIcon } from "./InteractionIcon";
import heartIcon from "assets/jsonIcons/heart.json";

export const Default = (args: any) => {
	return (
		<div style={{ display: "flex", justifyContent: "flex-start" }}>
			<Icon
				icon={args.icon}
				size={args.size}
				event={() => actions("onclick")}
				color={args.color}
			/>
		</div>
	);
};

Default.args = {
	icon: "check",
	size: 30,
};

export const interactionIcon = (args: any) => {
	return (
		<InteractionIcon
			jsonIcon={args.icon}
			loop={false}
			iconHeight={"23"}
			iconWidth={"26"}
		/>
	);
};

interactionIcon.args = {
	icon: heartIcon,
};

export default {
	title: "COMPONENT/Icon",
	component: Icon,
	decorators: [withKnobs],
	argTypes: {
		icon: {
			control: {
				type: "select",
				options: [
					"time",
					"down",
					"close_white",
					"arrowLeftBlack",
					"loadingDot",
				],
			},
		},
		color: {
			control: {
				type: "select",
				options: ["black", "pink", "gray", "lightgray", "white"],
			},
		},
		size: {
			control: { type: "text" },
		},
	},
};
