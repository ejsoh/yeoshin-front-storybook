import { Column, Row } from "components/atoms/Grid";
import { CPMThumbnail } from "components/molecules/thumbnailWrap/Thumbnail";
import { Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Space } from "components/atoms/Spacing";
import { Swipe } from "components/molecules/touchSwipeWrap/Swipe";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { EVENT_HREF, EVENT_IMAGE, HOSPITAL_EMPTY_IMAGE } from "constantDatas";
import {
	EventItemsContainer,
	EventSwipeContainer,
} from "./SkinMapEventComponents";

const thumbnailTextStyle = css`
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	overflow: hidden;
	margin-top: 4px;
	color: #000;
	height: 30px;
	justify-content: flex-start;
	align-items: stretch;
	width: 100%;
	line-height: 15px !important;
`;

const startContainer = css`
	background-color: rgb(61 61 61 / 85%);
	padding: 3px 0;
	width: 36px;
	position: absolute;
	top: 1px;
	right: 1px;
	z-index: 999;
	box-sizing: border-box;
	border-radius: 0 4px 0 0;
	padding-left: 2px;
`;

const swipeContents = css`
	position: absolute;
	top: 0;
`;

export const box = css`
	padding: 0 18px;
	height: 31px;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
	background-color: #fff;
	z-index: 999;
	transition: 0.2s ease-in-out;
`;

const itemPrice = css`
	line-height: 20px;
`;

const heightAuto = css`
	height: auto !important;
	text-align: left;
`;

const alignStyle = css`
	white-space: nowrap;
	width: 100%;
`;

const mapper = ({ skinMapStore, interactionStore }: RootStoreModel) => ({
	skinMapStore,
	interactionStore,
});

// 시술맵 하단 이벤트 토스트 팝업
export const SkinMapEventItems = observer(() => {
	const { skinMapStore } = useInjection(mapper);

	return (
		<Column
			css={css`
				${skinMapStore.getStoreCount().event <= 0 && "display: none"}
			`}
		>
			<Row between css={box}>
				<Text size={14} left bold css={alignStyle}>
					{skinMapStore.getSkinMapText().event}
				</Text>
				<Row between>
					<NumberText small gray bold>
						{skinMapStore.getStoreCount().event}
					</NumberText>
					<Text lightgray>건</Text>
				</Row>
			</Row>
			{skinMapStore.getIsToggleShow() && (
				<EventSwipeContainer>
					<Swipe
						itemWidth={86}
						itemCount={skinMapStore.getSkinMapRestuls().product.length + 1}
						css={swipeContents}
					>
						{skinMapStore.getSkinMapRestuls().product.map(item => (
							<EventItemMapper
								item={item}
								key={item.productcode + item.thumbnailimageurl}
								lastItem={
									skinMapStore.getSkinMapRestuls().product[
										skinMapStore.getSkinMapRestuls().product.length - 1
									].productcode
								}
							/>
						))}
					</Swipe>
				</EventSwipeContainer>
			)}
		</Column>
	);
});

const EventItemMapper = ({
	item,
	lastItem,
}: {
	item: {
		productcode: string;
		rateScore: number;
		productname: string;
		price: number;
		thumbnailimageurl: string;
	};
	lastItem: string;
}) => {
	return (
		<EventItemsContainer href={EVENT_HREF(item.productcode)}>
			{!isNaN(item.rateScore) && (
				<Row css={startContainer}>
					<Icon icon={"star"} size={16}></Icon>
					<NumberText size={10} bold white>
						{item.rateScore.toFixed(1).toString()}
					</NumberText>
				</Row>
			)}

			<CPMThumbnail
				productcode={item.productcode}
				description={
					<Column css={heightAuto}>
						<Text small size={12} css={thumbnailTextStyle} left top>
							{item.productname}
						</Text>
						<Row css={itemPrice}>
							<NumberText small bold>
								{item.price.toLocaleString()}
							</NumberText>
							<Space row={4}></Space>
							<Text size={12}>원</Text>
						</Row>
					</Column>
				}
				url={
					item.thumbnailimageurl === ""
						? HOSPITAL_EMPTY_IMAGE
						: EVENT_IMAGE(item.thumbnailimageurl)
				}
				lastItem={lastItem}
			></CPMThumbnail>
		</EventItemsContainer>
	);
};
