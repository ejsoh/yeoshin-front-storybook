import { SerializedStyles } from "@emotion/react";
import { ElementType } from "react";
import { Icon } from "./Icon";
import { InteractionIcon } from "./InteractionIcon";

export type IconProps = {
	icon?: string;
	size?: number;
	as?: ElementType | undefined;
	event?: () => void;
	href?: string | undefined;
	format?: string | undefined;
	url?: string | undefined;
	color?: string | undefined;
	padding?: string | undefined;
	css?: SerializedStyles | undefined;
};

export { Icon, InteractionIcon };
