import { Column, Row } from "components/atoms/Grid";

import { AxiosResponse } from "axios";
import { Icon } from "components/atoms";
import { OftenQuestionsDomain } from "pages/mypage/OftenQuestions";
import { Pagination } from "components/molecules";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { SpaceContainer } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ellipsis } from "helper";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

type NoticeType = {
	NoticeData?: never[] | [];
};

const mapper = ({ fetchStore, interactionStore }: RootStoreModel) => ({
	fetchStore,
	interactionStore,
});

type badgeColor = { color?: string };
const CharacterBadge = styled.div<badgeColor>`
	background-color: ${props => props.color};
	width: 18px;
	height: 16px;
	border-radius: 50%;
	padding-top: 2px;
	color: #fff;
	font-size: 12px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: sans-serif;
	margin-right: 10px;
`;

export const OftenQuestionContents = observer(({ NoticeData }: NoticeType) => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { getPaging } = OftenQuestionsDomain();
	const onClick = (key: number) => () => {
		interactionStore.setIsShow(false);
		interactionStore.getSwipeIndex() !== key && !interactionStore.getIsShow()
			? (interactionStore.setIsShow(true), interactionStore.setSwipeAction(key))
			: interactionStore.setSwipeAction(0);
	};
	const setPage = (index: number) => getPaging(index);

	React.useEffect(() => {
		return () => interactionStore.setIsShow(false);
	}, []);
	return (
		<>
			<>
				{fetchStore.fetchStore().data.map((item: AxiosResponse["data"]) => {
					return (
						<div key={item.key}>
							<SpaceContainer
								column={15}
								row={15}
								borderBottom={"#eee"}
								onClick={onClick(item.key)}
							>
								<Row between>
									<Row>
										<CharacterBadge color="#fc5b9f">Q</CharacterBadge>
										<Text left lightgray>
											{ellipsis(item.title.replace(/\\/g, ""), 20, "...")}
										</Text>
									</Row>
									<Icon
										size={10}
										icon={
											interactionStore.getSwipeIndex() === item.key &&
											interactionStore.getIsShow()
												? "upArrow"
												: "downArrow"
										}
									/>
								</Row>
							</SpaceContainer>
							<OnlyTruthyShow
								condition={
									interactionStore.getIsShow() &&
									interactionStore.getSwipeIndex() === item.key
								}
							>
								<OftenQuestionContentsDetail
									title={item.title}
									text={item.content}
								/>
							</OnlyTruthyShow>
						</div>
					);
				})}
			</>

			<Pagination total={fetchStore.fetchStore().totalCount} event={setPage} />
		</>
	);
});

const OftenQuestionContentsDetail = ({
	text,
	title,
}: {
	title: string;
	text: string;
}) => {
	return (
		<SpaceContainer
			row={15}
			column={20}
			css={css`
				background-color: #eee;
			`}
		>
			<Text left>{title.replace(/\\/g, "")}</Text>

			<SpaceContainer
				column={20}
				css={css`
					font-size: 12px;
					color: #666;
					line-height: 20px;
				`}
			>
				<Column
					css={css`
						align-items: flex-start;
					`}
				>
					<CharacterBadge color={"#009fda"}>A</CharacterBadge>
					<div dangerouslySetInnerHTML={{ __html: text.replace(/\\/g, "") }} />
				</Column>
			</SpaceContainer>
		</SpaceContainer>
	);
};
