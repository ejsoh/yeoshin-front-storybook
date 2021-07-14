import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { Row } from "components/atoms/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const TitleLabel = ({
	title,
	rightContents,
	link,
}: {
	title: string;
	link?: string;
	rightContents?: JSX.Element;
}) => {
	return (
		<Row
			between
			space={[16, 16]}
			css={css`
				margin: 8px 0;
			`}
			as="a"
			href={link}
		>
			<NumberText size={17} bold>
				{title}
			</NumberText>
			<>{rightContents && rightContents}</>
		</Row>
	);
};
