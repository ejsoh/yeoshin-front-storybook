import { Column, Row } from "components/atoms/Grid";
import { NoResults, Pagination, ToggleEvent } from "components/molecules";

import { AxiosResponse } from "axios";
import { PointListDomain } from "pages/mypage/PointList";
import React from "react";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";

const PointListContainer = styled.div``;

type IsUse = { color: string };
const Badge = styled.div<IsUse>`
	font-size: 12px;
	min-width: 45px;
	width: 45px;
	padding: 4px 0;
	color: #fff;
	text-align: center;
	font-weight: bold;
	background-color: ${props => props.color};
	margin-left: 5px;
	border-radius: 10px;
`;

export const PointListContents = observer(() => {
	const { fetchStore } = useInjection(mapper);
	const { getPaging } = PointListDomain();
	const setPage = (index: number) => getPaging(index);
	return (
		<ToggleEvent condition={fetchStore.getState() === "errorDone"}>
			<NoResults />
			<PointListContainer>
				{fetchStore.fetchStore().point &&
					fetchStore.fetchStore().point.map((item: AxiosResponse["data"]) => (
						<Row
							key={item.key}
							between
							css={css`
								border-bottom: 1px solid #eee;
								padding: 10px;
							`}
						>
							<Column>
								<Text left lightgray>
									{item.date}
								</Text>
								<Space column={10} />
								<Text gray left>
									{item.title}
								</Text>
							</Column>

							<Row
								flexEnd
								css={css`
									margin-left: 10px;
									min-width: 100px;
								`}
							>
								<Text
									css={css`
										white-space: pre !important;
									`}
								>
									{item.point.toLocaleString()}원
								</Text>
								<Badge color={item.isUse ? "#ef4b81" : "#909090"}>
									{item.isUseText}
								</Badge>
							</Row>
						</Row>
					))}
				<Pagination
					total={fetchStore.fetchStore().totalCount}
					event={setPage}
				/>
			</PointListContainer>
		</ToggleEvent>
	);
});
