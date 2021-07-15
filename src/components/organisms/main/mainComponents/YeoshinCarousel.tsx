import { AxiosResponse } from "axios";
import { NumberText } from "components/atoms/Typo/Typo";
import React, { useCallback, useEffect } from "react";
import { Row } from "components/atoms/Grid";
import { SpaceContainer } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { eventTracking } from "services/utils/analystics/amplitude";
import { mainBannerUrl } from "constantDatas/linkUrls";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { useSwipeable } from "react-swipeable";
import { yeoshinEvent } from "services/utils/analystics/googleAnalystics";

const PageDot = styled.div`
	background-color: #3d3d3d;
	opacity: 85%;
	border-radius: 50px;
	position: absolute;
	padding: 2px 10px;
	font-size: 13px;
	bottom: 0;
	right: 0;
	margin: 20px;
`;

const CarouselContainer = styled.div`
	display: flex;
	flex-wrap: nowrap;
	position: relative;
	height: auto;
	margin: 0 auto;
`;

const ImageContainer = styled.img`
	width: 100%;
	max-width: 640px;
	height: auto;
	align-self: start;
	object-fit: cover;
`;

const Container = styled.div`
	position: relative;
	overflow-x: hidden;
	height: auto;
	max-width: 640px;
	margin: 0 auto;
	overscroll-behavior: none;
	position: relative;
`;

export const YeoshinCarousel = observer(() => {
	const { mainStore, interactionStore, timerStore } = useInjection(mapper);
	const info = interactionStore.getPageInfo();
	const bannerList = mainStore.getData().banner ?? [];
	const maxLen = bannerList.length;
	const index = info.index ?? 1;

	const itemPush = useCallback(() => {
		const copied = [...bannerList];
		const shift = copied.shift();
		copied.push(shift);

		mainStore.setResponse({
			...mainStore.getData(),
			...{ banner: copied },
		});
	}, [mainStore.getData().banner]);

	const itemShift = useCallback(() => {
		const copied = [...bannerList];
		const pop = copied.pop();
		copied.unshift(pop);

		mainStore.setResponse({
			...mainStore.getData(),
			...{ banner: copied },
		});
	}, [mainStore.getData().banner]);

	const moveLeft = useCallback(() => {
		interactionStore.setPageInfo({
			...info,
			isStopTransition: false,
			direction: -100 + (info.direction ?? 0),
			index: maxLen <= index ? 1 : index + 1,
		});
	}, [info.direction]);

	const leftSetting = useCallback(() => {
		const direction = info.direction;
		maxLen - 1 <= -(direction / 100) &&
			(interactionStore.setPageInfo({
				...info,
				isStopTransition: true,
				direction: 0,
			}),
			itemShift());
	}, [maxLen - 1 <= -(info.direction / 100)]);

	const rightSetting = useCallback(() => {
		!info.direction &&
			(interactionStore.setPageInfo({
				...info,
				isStopTransition: true,
				direction: -((maxLen - 1) * 100),
				stopAuthSlide: false,
			}),
			itemPush());
	}, [info.direction]);

	const handlers = useSwipeable({
		onSwipedLeft: e => {
			moveLeft();
		},
		onSwipedRight: e => {
			const minLen = 1;

			interactionStore.setPageInfo({
				...info,
				isStopTransition: false,
				direction: info.direction + 100,
				stopAuthSlide: false,
				index: minLen === index ? maxLen : index - 1,
			});
		},
		onSwipeStart: e => {
			interactionStore.setPageInfo({
				...info,
				stopAuthSlide: true,
			});

			e.dir === "Left" && leftSetting();

			e.dir === "Right" && rightSetting();
		},

		preventDefaultTouchmoveEvent: true,
	});

	const clickSlide = useCallback((title: string, link: string) => {
		return () => {
			eventTracking("메인 슬라이드 이벤트 클릭", {
				eventTitle: title,
			});
			yeoshinEvent(title);
			window.location.href = link;
		};
	}, []);

	useEffect(() => {
		!info.stopAuthSlide &&
			(timerStore.timerView() % 2 ? moveLeft() : leftSetting());
	}, [timerStore.timerView()]);

	return (
		<Container>
			<CarouselContainer
				{...handlers}
				css={css`
					max-width: ${(maxLen + 1) * 648}px;
					transition: 0s;
					position: relative;
					display: flex;
					flex-wrap: nowrap;
					transform: translate(${info.direction}%, 0);
					transition: ${info.isStopTransition ? "0" : "0.5"}s;
				`}
			>
				{bannerList.map((item: AxiosResponse["data"]) => (
					<ImageContainer
						key={item.key}
						onClick={clickSlide(item.title, item.link)}
						src={mainBannerUrl(item.img)}
					/>
				))}
			</CarouselContainer>
			<PageDot>
				<Row>
					<NumberText white>{index}</NumberText>
					<SpaceContainer row={3}>
						<Text lightgray>/</Text>
					</SpaceContainer>
					<NumberText gray>{maxLen}</NumberText>
				</Row>
			</PageDot>
		</Container>
	);
});
