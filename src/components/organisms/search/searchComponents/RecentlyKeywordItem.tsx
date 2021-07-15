import { Icon } from "components/atoms";
import React from "react";
import { Row } from "components/atoms/Grid";
import { SearchDomain } from "pages/main/MainDomain";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { searchLinkUrl } from "constantDatas/linkUrls";
import styled from "@emotion/styled/macro";

const RecentlyKeyword = styled.div`
	margin: 0 5px 17px;
`;

export const RecentlyKeywordItem = ({ name }: { name: string }) => {
	const { deleteKeyword } = SearchDomain();
	const deleteItem = React.useCallback(() => deleteKeyword(name), [name]);

	return (
		<RecentlyKeyword>
			<Row
				between
				css={css`
					border: 1px solid #e6e6e6;
					border-radius: 100px;
					padding: 0 5px;
					margin: 0 4px;
					overflow: hidden;
					width: 100%;
					min-width: 80px;
					word-break: keep-all;
				`}
			>
				<Text
					as={"a"}
					css={css`
						padding: 5px 10px;
					`}
					href={searchLinkUrl(name)}
				>
					{name}
				</Text>

				<Icon icon="cancel" event={deleteItem} />
			</Row>
		</RecentlyKeyword>
	);
};
