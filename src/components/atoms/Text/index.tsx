import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import {
	Text,
	InputError,
	InputMessage,
	textCommon,
	ellipsisStyle,
} from "./Text";

export type TextAlign = {
	left?: boolean | undefined;
	top?: boolean | undefined;
	center?: boolean | undefined;
	small?: boolean | undefined;
	medium?: boolean | undefined;
	large?: boolean | undefined;
	msg?: string;
	color?: string;
	pink?: boolean | undefined;
	white?: boolean | undefined;
	black?: boolean | undefined;
	gray?: boolean | undefined;
	lightgray?: boolean | undefined;
	as?: string | undefined;
	href?: string | undefined;
	bold?: boolean | undefined;
	inline?: boolean | undefined;
	weight?: number | undefined;
	size?: number | undefined;
	ellipsis?: boolean | undefined;
	line?: number | undefined;
	letterSpacing?: number | undefined;
	textIndent?: number | undefined;
	padding?: string | undefined;
	borderBottom?: string | undefined;
	preLine?: boolean | undefined;
	styles?: string | undefined;
	lineHeight?: number | undefined;
	ellipsisLine?: number | undefined;
};

export { Text, InputError, InputMessage, textCommon, ellipsisStyle };
