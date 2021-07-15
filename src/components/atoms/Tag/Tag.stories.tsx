import React from "react";
import { object, withKnobs } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";
import { Tag } from "./Tag";

export const Default = (args: any) => {
	return <Tag>모바일 예약</Tag>;
};

export default {
	title: "COMPONENT/Tag",
	component: Tag,
	decorators: [withKnobs],
};
