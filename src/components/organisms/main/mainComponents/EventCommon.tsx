import { Column, Row } from "components/atoms/Grid";
import { Icon, InteractionIcon } from "components/atoms";
import { Space, SpaceContainer } from "components/atoms/Spacing";

import { AxiosResponse } from "axios";
import { HOME } from "constantDatas/api";
import ImageWrap from "components/molecules/imageWrap/ImageWrap";
import { NumberText } from "components/atoms/Typo/Typo";
import React, { useCallback } from "react";
import { SearchDomain } from "pages/main/MainDomain";
import { Text } from "components/atoms/Message";
import { ToggleEvent } from "components/molecules";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import heartIcon from "assets/jsonIcons/heart.json";
import styled from "@emotion/styled/macro";
import { useAuth } from "hooks";
import { openProduct } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";
import { interactionStore } from "models/stores";
import { pixelTracking } from "services/utils/analystics/pixel";

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

export const EventCommon = ({
	item,
	excute,
	lastItem,
}: {
	item: AxiosResponse["data"];
	excute?: (index: number) => void;
	lastItem: string;
}) => {
	const auth = useAuth();
	const [heart, setHeart] = React.useState(item.isWish);
	const { likeEvent, disLikeEvent } = SearchDomain();
	const format = (count: string) => {
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
	};

	const priceFormat = useCallback(
		(price: string) => {
			const parsing = parseInt(price);
			switch (true) {
				case parsing < 10000:
					return (
						<Row>
							<NumberText bold pink size={15}>
								{parsing / 1000}
							</NumberText>
							<Space row={4} />
							<Text size={15} lightgray>
								천원
							</Text>
						</Row>
					);
				default:
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
			}
		},
		[item.price]
	);
	const eventClick = useCallback(() => {
		eventTracking("여신 이벤트 상품 클릭", {
			productInfo: `${item.title}_${item.location}`,
		});
		openProduct(`${item.title}_${item.location}`);
	}, [item.title, item.location]);

	const heartClick = useCallback(() => {
		auth.user()
			? (!heart
					? (likeEvent(item.key),
					  pixelTracking({
							event: "AddToWishlist",
							value: item.key,
							af_content: item.title,
							af_price: item.price,
					  }))
					: disLikeEvent(item.key),
			  setHeart(!heart))
			: interactionStore.setIsAlert(
					"로그인 후 이용해 주세요.",
					() => (window.location.href = "/login")
			  );
	}, [item.key]);

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
			<Row space={[0, 16]} as="a" href={`${HOME}/${item.link}`}>
				<ImageWrap
					lastItem={lastItem}
					excute={(index: number) => excute && excute(index)}
					productcode={item.key}
					url={item.image}
				/>
				<Column fullWidth>
					<Row>
						<Column>
							<Text left lightgray size={11} ellipsis>
								{item.location}
							</Text>
							<Space column={6} />
							<Text left ellipsis weight={500}>
								{item.title}
							</Text>
						</Column>
						<SpaceContainer row={10} column={10} />
					</Row>

					<Text left size={11} lightgray ellipsis>
						{item.description}
					</Text>
					<Space column={2} />
					{priceFormat(item.price)}
					<Row between isWrap>
						<Row isWrap>
							<Row>
								<Icon icon="fillLike" />
								<NumberText bold size={11}>
									{format(item.wishCount)}
								</NumberText>
							</Row>
							<SpaceContainer row={8}>
								{parseInt(item.reviewCount) > 0 && (
									<Row>
										<Text size={11} lightgray>
											리뷰
										</Text>
										<Space row={3} />
										<NumberText size={11} bold>
											{format(item.reviewCount)}
										</NumberText>
									</Row>
								)}
							</SpaceContainer>
							<>
								{!isNaN(item.score) && (
									<Row>
										<Icon size={18} icon="star" />
										<Space row={2} />
										<NumberText size={11} bold>
											{item.score}
										</NumberText>
									</Row>
								)}
							</>
						</Row>
						{item.isReservation && (
							<Text size={11} pink bold>
								모바일예약
							</Text>
						)}
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
