import React from "react";
import { Icon } from "components/atoms";
import { Text } from "components/atoms/Message";
import { Space } from "components/atoms/Spacing";
import { Column } from "components/atoms/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const noResultsStyle = css`
	align-items: center;
	justify-content: center;
	height: 50vh;
`;

export const NoResults = ({
	text = "등록된 내용이 없습니다.",
}: {
	text?: string;
}) => {
	return (
		<Column css={noResultsStyle}>
			<Icon icon={"no_search"} size={30} format="png"></Icon>
			<Space column={10} />
			<Text lightgray center small>
				{text}
			</Text>
		</Column>
	);
};
