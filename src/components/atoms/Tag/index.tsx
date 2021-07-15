import React from "react";
import { Tag } from "./Tag";

export type TagProps = {
	margin?: number[] | undefined;
	children?: React.ReactNode | undefined;
	onClick?: () => void | undefined;
};

export { Tag };
