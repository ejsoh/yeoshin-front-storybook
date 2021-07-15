import { Column, Row } from "components/atoms/Grid";
import { Icon } from "components/atoms";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { SkinMapEventItems } from "./SkinMapEventItems";
import { SkinMapHospitalEvent } from "./SkinMapHospitalEvent";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { useSwipeable } from "react-swipeable";
import { kakaoEvent } from "services/utils/kakaoMap/event";
import { DomainConnector } from "pages/skinMap/domainConnector";
import { SpaceContainer } from "components/atoms/Spacing";
import { ToggleEvent } from "components/molecules";
import { EventContainer, NoResultContainer } from "./SkinMapEventComponents";

const eventDefaultShowArea = css`
	height: 50px;
	cursor: pointer;
`;

const eventLayout = css`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 0 0 16px;
	font-weight: 300;
	align-items: baseline;
	overflow: hidden;
	& > * {
		padding: 0 8px 0 0;
	}
`;

const mapper = ({ skinMapStore, fetchStore }: RootStoreModel) => ({
	skinMapStore,
	fetchStore,
});

// 시술맵 이벤트 컨테이너
export const SkinMapEvent = observer((...rest) => {
	const { skinMapStore } = useInjection(mapper);
	const { getProduct } = DomainConnector();
	const address = skinMapStore.getCurrentAddress();

	const isShow = () => {
		skinMapStore.getNoResult().sheet
			? skinMapStore.setSkinMapNoResult({ result: false })
			: skinMapStore.getHospital().length === 0
			? skinMapStore.setSkinMapNoResult({
					result: true,
					text: `이 지역 검색 또는, 
					새로운 검색어를 입력 해 주세요.`,
			  })
			: isResultShow();
	};

	const isResultShow = () => {
		(!skinMapStore.getIsToggleShow() || !skinMapStore.gethospitalShow()) &&
			kakaoEvent().isClose("infoContainer");

		skinMapStore.getIsToggleShow() || skinMapStore.gethospitalShow()
			? skinMapStore.setSheetShowReset()
			: (() => {
					skinMapStore.setSkinMapState("default");
					skinMapStore.setSkinMapNoResult({ result: false });
					getProduct(data => {
						data.results.productsSize > 0
							? skinMapStore.setSheetShow({ event: true, hospital: false })
							: skinMapStore.setSheetShow({ event: false, hospital: true });
					});

					skinMapStore.setProductIndex(1);
					skinMapStore.setSheetText();
			  })();
	};

	const toggleHeight = () => {
		const toggleHeight = skinMapStore.getIsToggleShow() ? 210 : 0;
		const hospitalHeight = skinMapStore.gethospitalShow() ? 130 : 0;
		const heightResult = skinMapStore.getNoResult().sheet
			? 70
			: toggleHeight + hospitalHeight;

		return `height: ${
			heightResult < 330 ? heightResult : 305
		}px; overflow: hidden; transition: .2s;`;
	};

	const twiceClose = () => {
		switch (true) {
			case skinMapStore.gethospitalShow() && skinMapStore.getIsToggleShow():
				return skinMapStore.setIsHospitalShow(false);
			case skinMapStore.getIsToggleShow():
				return isShow();
			case skinMapStore.gethospitalShow():
				return isShow();
			case skinMapStore.getNoResult().sheet:
				return;
			default:
				return isShow();
		}
	};

	const twiceOpen = () => {
		switch (true) {
			case !skinMapStore.gethospitalShow() && skinMapStore.getIsToggleShow():
				return skinMapStore.setIsHospitalShow(true);
			case skinMapStore.getNoResult().sheet:
				return;
			case skinMapStore.gethospitalShow() && skinMapStore.getIsToggleShow():
				return;
			case skinMapStore.getStoreCount().event > 0 &&
				skinMapStore.getIsToggleShow():
				return isShow();
			case skinMapStore.getStoreCount().hospital > 0 &&
				!skinMapStore.gethospitalShow():
				return isShow();
		}
	};

	const handlers = useSwipeable({
		onSwipedDown: () => twiceClose(),
		onSwipedUp: () => twiceOpen(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: false,
	});
	return (
		<EventContainer {...handlers}>
			<Column>
				<Column css={eventDefaultShowArea} onClick={isShow}>
					<SpaceContainer column={12}>
						<Icon icon="bottomBorder" size={3} />
					</SpaceContainer>

					<Row css={eventLayout}>
						<Text size={16} large>
							{address.add1}
						</Text>
						<Text size={16} large>
							{address.add2}
						</Text>
						<Text lightgray small>
							{address.city}
						</Text>
					</Row>
				</Column>

				<Column
					css={css`
						${toggleHeight()}
					`}
				>
					<ToggleEvent
						condition={
							skinMapStore.getNoResult().sheet ||
							skinMapStore.getHospital().length === 0
						}
					>
						<NoResultContainer>
							{skinMapStore.getNoResult().text}
						</NoResultContainer>
						<>
							{skinMapStore.getIsToggleShow() && <SkinMapEventItems />}
							{skinMapStore.getStoreCount().hospital > 0 && (
								<SkinMapHospitalEvent />
							)}
						</>
					</ToggleEvent>
				</Column>
			</Column>
		</EventContainer>
	);
});
