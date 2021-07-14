import React from "react";
import { Divider } from "./Divider";
import { object, withKnobs } from "@storybook/addon-knobs";

export default {
	title: "Divider",
	component: Divider,
	decorators: [withKnobs],
};

export const Default = () => {
	return <Divider width={2} height={30} backgroundColor={"#EF4B81"} />;
};
