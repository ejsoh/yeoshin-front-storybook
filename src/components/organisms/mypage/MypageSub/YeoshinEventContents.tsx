import { Column, Row } from "components/atoms/Grid";
import React from "react";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { alternative } from "helper";
import { AxiosResponse } from "axios";
import { useInjection, useLazyLoading } from "hooks";
import { Icon } from "components/atoms";
import { mapper } from "models/RootStore";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { YeoshinEventDomain } from "pages/mypage/YeoshinEvents";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const ing = css`
	color: #ff365c;
	border: 1px solid #ff365c !important;
`;

const close = css`
	background-color: #00000085;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	color: #fff;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	display: flex;
`;

const EventStateBadge = styled.div`
	position: absolute;
	right: 0;
	font-size: 12px;
	border: 1px solid black;
	padding: 5px 10px;
	background-color: #fff;
	border-radius: 10px;
	margin: 10px;
`;

export const YeoshinEventContents = observer(() => {
	const { fetchStore } = useInjection(mapper);
	return (
		<Column>
			{fetchStore.fetchStore().data &&
				fetchStore
					.fetchStore()
					.data.map((item: AxiosResponse["data"]) => (
						<HospitalListItems
							key={item.key + "yeoshinCustomEvent"}
							item={item}
							lastItem={
								fetchStore.fetchStore().data[
									fetchStore.fetchStore().data.length - 1
								].key
							}
						/>
					))}
		</Column>
	);
});

const CloseEventWrapper = styled.div`
	position: relative;
`;

const ImageContainer = styled.div`
	width: 100%;
	min-height: 155px;
	img {
		height: 100%;
	}
`;

const HospitalListItems = ({
	item,
	lastItem,
}: {
	item: AxiosResponse["data"];
	lastItem: string;
}) => {
	const { getPaging } = YeoshinEventDomain();
	const { interactionStore } = useInjection(mapper);
	const { loadingSrc, getImage } = useLazyLoading(
		alternative({
			is: item.isPremium === "Y",
			truthy: item.premiumImage,
			falsy: item.image,
		})
	);

	const isCloseEvent = () => {
		const time = item.endDate.split("-");
		const endDate = new Date(time[0], time[1], time[2]);
		const today = new Date();
		const currentDate = new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate()
		);

		return endDate < currentDate;
	};

	React.useCallback(() => {
		loadingSrc !== "" &&
			lastItem === item.key &&
			getPaging(interactionStore.getCurrentPageIndex() + 1);
	}, [loadingSrc]);

	return item.endDate ? (
		<Column
			css={css`
				padding: 5px 10px;
				box-sizing: border-box;
			`}
			as="a"
			href={`https://yeoshin.co.kr/?pn=board.view&_menu=event&_uid=${item.key}`}
		>
			<CloseEventWrapper>
				<OnlyTruthyShow condition={isCloseEvent()}>
					<div css={close}>종료된 이벤트 입니다.</div>
				</OnlyTruthyShow>

				<EventStateBadge css={!isCloseEvent() && ing}>
					{isCloseEvent() ? "이벤트종료" : "이벤트진행"}
				</EventStateBadge>

				<ImageContainer>
					<img
						ref={getImage}
						onError={err => (err.currentTarget.style.display = "none")}
						src={`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/board/${item.image}`}
						alt={item.title}
					/>
				</ImageContainer>
			</CloseEventWrapper>

			<SpaceContainer columns={[10, 15]}>
				<Text left>{item.title}</Text>
			</SpaceContainer>
			<SpaceContainer
				columns={[5, 15]}
				css={css`
					border-bottom: 1px solid #cccbcb;
				`}
			>
				<Row between>
					<Row>
						<Icon icon={"ic_date"} format={"png"} />
						<Space row={5} />
						<Text small>{item.startDate}~</Text>
						<Text small>{item.endDate}</Text>
					</Row>
					<Text small lightgray>
						<Icon icon={"m_new_review"} format="png" size={10} />
						<Space row={5} />
						{item.reviewCount}
					</Text>
				</Row>
			</SpaceContainer>
		</Column>
	) : (
		<></>
	);
};
