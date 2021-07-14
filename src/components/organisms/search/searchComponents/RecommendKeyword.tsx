import { Column, Row } from "components/atoms/Grid";

import { AxiosResponse } from "axios";
import { Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { SearchDomain } from "pages/main/MainDomain";
import { Text } from "components/atoms/Message";
import { TitleLabel } from "../../main/mainComponents/TitleLabel";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { searchKeyword } from "services/utils/analystics/googleAnalystics";
import { Space } from "components/atoms/Spacing";

const BestBadge = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 12px;
	color: #fff;
	background-color: #ef4b81;
	padding: 3px 5px;
	border-radius: 100px;
	margin-left: 8px;
`;

export const RecommendKeyword = observer(() => {
	const { fetchStore } = useInjection(mapper);
	const { setSearchKeyword } = SearchDomain();

	const setSearchKeywordClick = React.useCallback((keyword: string) => {
		return () => {
			searchKeyword(keyword);
			setSearchKeyword(keyword);
		};
	}, []);

	return (
		<>
			<TitleLabel title="추천 검색어" />
			<Column>
				{fetchStore.fetchStore().recommendKeyword &&
					fetchStore
						.fetchStore()
						.recommendKeyword.map(
							(item: AxiosResponse["data"], index: number) => (
								<Row
									onClick={setSearchKeywordClick(item.keyword)}
									key={item.key}
									space={[15, 24]}
									between
								>
									<Row>
										<NumberText
											pink={index < 3}
											gray
											bold
											size={17}
											css={css`
												width: 36px;
											`}
										>
											{index + 1}
										</NumberText>

										<Text size={15} left bold={index < 3}>
											{item.keyword}
										</Text>
										<>{index < 3 && <BestBadge>BEST</BestBadge>}</>
									</Row>
									<Row>
										<NumberText
											bold
											gray
											pink={item.score > 0}
											css={css`
												text-align: right;
												padding-right: 8px;
											`}
										>
											{item.score !== 0 && Math.abs(parseInt(item.score))}
										</NumberText>
										<Icon
											icon={
												item.score <= 0
													? item.score === 0
														? "sameRank"
														: "minusRank"
													: "plusRank"
											}
										/>
									</Row>
								</Row>
							)
						)}
			</Column>
		</>
	);
});
