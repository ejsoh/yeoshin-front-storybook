import { Button } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import React from "react";
import { removeDuplicateItems } from "helper";
import { useInjection } from "hooks";
import { AxiosResponse } from "axios";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { SubTitle } from "../../mypageCommon/MyPageAtoms";
import { SelectedAreaLists } from "./CustomSelectedLists";

type StyleProps = { selected: boolean };

const AreaPopUpContainer = styled(Column)`
	border-radius: 16px 16px 0px 0px;
	background-color: #fff;
	z-index: 99;
	position: absolute;
	width: 100%;
	bottom: 0;
	overflow: hidden;
`;

const AreaContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 10px 0px;
	border-radius: 4px;
	border: 1px solid #e6e6e6;
	height: 200px;
	overflow: hidden;
`;
const AreaItems = styled(Text)`
	padding: 10px 10px;
`;

const SelectedArea = styled.div<StyleProps>`
	${props =>
		props.selected &&
		`background: #fdeef3;
		& > div {
		color: #ef4b81;
		font-weight: bold;
		}`}
`;
const AreaSection = styled(Column)`
	overflow-y: scroll;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none;
	border-right: 1px solid #e6e6e6;
	&::-webkit-scrollbar {
		display: none;
	}
	scroll-behavior: smooth;
	width: 100%;
`;

const AreaRegisterContainer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	transition: 0.5s;
	z-index: 999;
	animation: isShow 0.4s linear;
	@keyframes isShow {
		0% {
			bottom: -100vh;
		}
		100% {
			bottom: 0;
		}
	}
`;

const AreaRegisterBackground = styled.div`
	background-color: #000000ad;
	position: fixed;
	top: 0;
	height: 100%;
	width: 100%;
`;

const RegisterButton = styled(Button)`
	border-radius: 0;
	min-height: 48px;
	height: 48px;
`;

export const AreaRegister = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const targetPosition = React.createRef<HTMLDivElement>();
	const len = fetchStore.fetchStore().selectedArea.length;

	const areaSelectEvent = (current: string) => () => {
		len >= 5
			? interactionStore.setIsAlert("최대 5개까지 등록 가능합니다.")
			: fetchStore.setResponse({
					...fetchStore.fetchStore(),
					selectedArea: removeDuplicateItems([
						...fetchStore.fetchStore().selectedArea,
						...[
							`${
								fetchStore.fetchStore().defaultArea[
									interactionStore.getCurrentPageIndex()
								].name
							}|${current}`,
						],
					]),
			  });
		interactionStore.setValidationMessage({});
	};

	const AreaStyle = (current: string) => {
		return (
			len > 0 &&
			fetchStore.fetchStore().selectedArea[len - 1].indexOf(current) >= 0
		);
	};

	const close = () => {
		document.body.style.overflow = "unset";
		interactionStore.setIsEventShow(false);
	};

	const setPageIndex = (index: number) => () =>
		interactionStore.setCurrentPageIndex(index);

	React.useEffect(() => {
		targetPosition.current?.scrollIntoView();
	}, [targetPosition]);

	return (
		<AreaRegisterContainer>
			<AreaRegisterBackground onClick={close}></AreaRegisterBackground>
			<AreaPopUpContainer>
				<Text size={19} left padding={"14px 16"}>
					지역 등록
				</Text>
				<Row span={[1, 1]} space={[0, 10]}>
					<Text left>지역</Text>
					<Text left>상세 지역</Text>
				</Row>
				<AreaContainer>
					<AreaSection>
						{fetchStore
							.fetchStore()
							.defaultArea.map((item: AxiosResponse["data"], index: number) => (
								<SelectedArea
									key={item.name}
									selected={interactionStore.getCurrentPageIndex() === index}
									onClick={setPageIndex(index)}
								>
									<AreaItems left>{item.name}</AreaItems>
								</SelectedArea>
							))}
					</AreaSection>

					<AreaSection>
						<SelectedArea
							onClick={areaSelectEvent("전체")}
							selected={AreaStyle("전체")}
						>
							<AreaItems left>전체</AreaItems>
						</SelectedArea>
						{fetchStore
							.fetchStore()
							.defaultArea[interactionStore.getCurrentPageIndex()].value.map(
								(detailArea: string) => (
									<SelectedArea
										key={detailArea}
										selected={AreaStyle(detailArea)}
									>
										<AreaItems onClick={areaSelectEvent(detailArea)} left>
											{detailArea}
										</AreaItems>
									</SelectedArea>
								)
							)}
					</AreaSection>
				</AreaContainer>
				<SubTitle>지역등록 ({len})</SubTitle>

				<SelectedAreaLists />

				<RegisterButton large filled onClick={close}>
					등록 ({len})
				</RegisterButton>
			</AreaPopUpContainer>
			<div ref={targetPosition}></div>
		</AreaRegisterContainer>
	);
});
