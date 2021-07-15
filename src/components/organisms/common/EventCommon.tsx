import { Column, Row } from "components/atoms/Grid";
import { Icon, InteractionIcon } from "components/atoms";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { AxiosResponse } from "axios";
import { HOME } from "constantDatas/api";
import { NumberText } from "components/atoms/Typo/Typo";
import React, { useCallback } from "react";
import { SearchDomain } from "pages/main/MainDomain";
import { Text } from "components/atoms/Text";
import { ToggleEvent } from "components/molecules";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import heartIcon from "assets/jsonIcons/heart.json";
import styled from "@emotion/styled/macro";
import { useAuth } from "hooks";
import { openProduct } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import { needLoginAlert } from "helper/alertAndConfirm";
import { lazyDelayed } from "helper/lazyHelper";
const ImageWrap = lazyDelayed(
	import("components/molecules/imageWrap/ImageWrap")
);
const HeartContainer = styled.div`
	justify-content: flex-end;
	display: flex;
	margin-right: 2.12px;
	cursor: pointer;
	position: absolute;
	padding: 7px;
	width: 50px;
	height: 50px;
	z-index: 9;
	top: -8px;
	right: 0;
`;
const emptyHeart = css`
	width: 26.22px;
	height: 26px;
	margin: -2px 1px 0px 0;
`;

const EventCommon = ({
	item,
	excute,
	lastItem,
}: {
	item: AxiosResponse["data"];
	excute?: (index: number) => void;
	lastItem: string;
}) => {
	const {
		link,
		key,
		image,
		location,
		title,
		description,
		price,
		wishCount,
		reviewCount,
		score,
		isReservation,
		isWish,
	} = item;

	const auth = useAuth();
	const [heart, setHeart] = React.useState(isWish);
	const { likeEvent, disLikeEvent } = SearchDomain();

	const format = useCallback(
		(count: string) => {
			const number = parseInt(count);
			switch (true) {
				case number < 100:
					return number;
				case number >= 100 && number < 1000:
					return `${Math.floor(number / 100)}백+`;
				case number >= 1000 && number < 10000:
					return `${Math.floor(number / 1000)}천+`;
				case number >= 10000:
					return `${Math.floor(number / 10000)}만+`;
			}
		},
		[wishCount, reviewCount]
	);

	const priceFormat = useCallback(
		(price: string) => {
			const parsing = parseInt(price);

			return (
				<Row>
					<NumberText bold pink size={15}>
						{parsing / 10000}
					</NumberText>
					<Space row={4} />
					<Text size={15} lightgray>
						만원
					</Text>
				</Row>
			);
		},
		[price]
	);
	const eventClick = useCallback(() => {
		eventTracking("여신 이벤트 상품 클릭", {
			productInfo: `${title}_${location}`,
		});
		openProduct(`${title}_${location}`);
	}, [title, location]);

	const heartClick = useCallback(() => {
		auth.user()
			? (!heart ? likeEvent(key) : disLikeEvent(key), setHeart(!heart))
			: needLoginAlert();
	}, [heart]);

	return (
		<SpaceContainer
			borderBottom={"#f7f7f7"}
			css={css`
				position: relative;
				padding-bottom: 14px;
				margin-top: 14px;
			`}
			onClick={eventClick}
		>
			<Row space={[0, 16]} as="a" href={`${HOME}/${link}`}>
				<ImageWrap
					lastItem={lastItem}
					productcode={key}
					excute={(index: number) => excute && excute(index)}
					url={image}
				/>
				<Space />
				<Column fullWidth>
					<Row>
						<Column>
							<Text left lightgray size={11} ellipsis>
								{location}
							</Text>
							<Space column={6} />
							<Text left ellipsis weight={500}>
								{title}
							</Text>
						</Column>
						<SpaceContainer row={10} column={10} />
					</Row>

					<Text left size={11} lightgray ellipsis>
						{description}
					</Text>
					<Space column={2} />
					{priceFormat(price)}
					<Row between isWrap>
						<Row isWrap>
							<Row>
								<Icon icon="fillLike" />
								<NumberText bold size={11}>
									{format(wishCount)}
								</NumberText>
							</Row>
							<SpaceContainer row={8}>
								<OnlyTruthyShow condition={parseInt(reviewCount) > 0}>
									<Row>
										<Text size={11} lightgray>
											리뷰
										</Text>
										<Space row={3} />
										<NumberText size={11} bold>
											{format(reviewCount)}
										</NumberText>
									</Row>
								</OnlyTruthyShow>
							</SpaceContainer>
							<OnlyTruthyShow condition={!isNaN(score)}>
								<Row>
									<Icon size={18} icon="star" />
									<Space row={2} />
									<NumberText size={11} bold>
										{score}
									</NumberText>
								</Row>
							</OnlyTruthyShow>
						</Row>
						<OnlyTruthyShow condition={isReservation}>
							<Text size={11} pink bold>
								모바일예약
							</Text>
						</OnlyTruthyShow>
					</Row>
				</Column>
			</Row>

			<HeartContainer onClick={heartClick}>
				<ToggleEvent condition={heart}>
					<InteractionIcon
						jsonIcon={heartIcon}
						loop={false}
						iconHeight={"23"}
						iconWidth={"26"}
					/>
					<Icon icon="emptyHeart" size={18} css={emptyHeart}></Icon>
				</ToggleEvent>
			</HeartContainer>
		</SpaceContainer>
	);
};

export default React.memo(EventCommon);
