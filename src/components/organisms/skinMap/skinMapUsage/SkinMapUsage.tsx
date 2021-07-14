import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Row } from "components/atoms/Grid";
import { Space } from "components/atoms/Spacing";
import { Swipe, ToggleEvent } from "components/molecules";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { setCookie } from "services";
import { skinMapInformation } from "./mapUsageContents";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";

type ImageType = {
	imagePath: string;
};

const Usage = styled.div`
	background-color: rgb(61 61 61 / 80%);
	left: 0;
	height: 100%;
	width: 100%;
	height: 100%;
	z-index: 999999;
	top: 0;
	overflow: hidden;
	position: fixed;
`;

const SwipeContainer = styled.div`
	width: 100%;
	position: relative;
	height: 216px;
`;

const UsageContainer = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 0 24px;
	box-sizing: border-box;
	position: relative;
`;
const UsageContntsContainer = styled.div`
	background-color: #fff;
	border-radius: 4px;
	width: 312px;
	overflow: hidden;
`;

const TitleContainer = styled.div`
	padding: 38px 0 32px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	& > * {
		line-height: 22px;
	}
`;

const ImageContainer = styled.div<ImageType>`
	background: url("images/images/${props => props.imagePath}.png") no-repeat
		center center;
	height: 216px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	width: 312px;
`;

const ImageCounter = styled.div`
	width: 43px;
	height: 24px;
	margin: 12px;
	background: #3d3d3d;
	border-radius: 100px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 0 5px;
	box-sizing: border-box;
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 9;
`;

const swipeCustom = css`
	position: absolute;
	z-index: 1;
`;

const buttonContainer = css`
	height: 56px;
	font-size: 15px;
	cursor: pointer;
	& > * {
		padding: 0 32px;
	}
`;

const customlightGray = css`
	color: #a8a8a8;
`;

const mapper = ({ interactionStore }: RootStoreModel) => ({
	interactionStore,
});

// 페이지 진입 시 노출되는 시술맵 소개화면
export const SkinMapUsage = observer(() => {
	const { interactionStore } = useInjection(mapper);

	const getIndex = interactionStore.getSwipeIndex();

	React.useEffect(() => {
		getIndex === 3 && setCookie("closeUsage", "true", { maxAge: 999999999 });
	}, [getIndex]);

	const closeUsagePopUpForever = (close?: number) => () => {
		interactionStore.setSwipeAction(close ?? getIndex + 1);

		getIndex === 3 && setCookie("closeUsage", "true");
	};

	return (
		<ToggleEvent condition={getIndex + 1 > 3}>
			<></>
			<Usage>
				<UsageContainer>
					<UsageContntsContainer>
						<TitleContainer>
							<Text large bold gray>
								{skinMapInformation[getIndex >= 3 ? 2 : getIndex].title}
							</Text>
							<Space column={8}></Space>
							<Text medium css={customlightGray}>
								{skinMapInformation[getIndex >= 3 ? 2 : getIndex].description1}
							</Text>
							<Text medium css={customlightGray}>
								{skinMapInformation[getIndex >= 3 ? 2 : getIndex].description2}
							</Text>
						</TitleContainer>
						<SwipeContainer>
							<Swipe
								isPage={true}
								itemWidth={312}
								itemCount={skinMapInformation.length}
								css={css`
									${swipeCustom}
									left: ${-(getIndex * 312)}px;
								`}
								reset={false}
								isSwipe={true}
							>
								{skinMapInformation.map((item, index) => (
									<ImageContainer
										imagePath={item.image}
										key={`skinMap${index}`}
									></ImageContainer>
								))}
							</Swipe>
							<ImageCounter>
								<NumberText white small>
									{getIndex + 1}
								</NumberText>
								<Text white small>
									/
								</Text>
								<NumberText lightgray small>
									3
								</NumberText>
							</ImageCounter>
						</SwipeContainer>
						<Row css={buttonContainer} span={[1, 1]} center>
							<Text gray left medium onClick={closeUsagePopUpForever(3)}>
								닫기
							</Text>
							<Text pink bold medium onClick={closeUsagePopUpForever()}>
								{skinMapInformation[getIndex >= 3 ? 2 : getIndex].button}
							</Text>
						</Row>
					</UsageContntsContainer>
				</UsageContainer>
			</Usage>
		</ToggleEvent>
	);
});
