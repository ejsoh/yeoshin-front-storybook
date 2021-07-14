import React from "react";
import { RootStoreModel } from "models/RootStore";
import { SkinMapHospitalItems } from "./SkinMapHospitalItems";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { useSwipeable } from "react-swipeable";

const SlideContainer = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
`;

const slideBackground = css`
	z-index: 99999;
	background-color: #3d3d3d;
	opacity: 0.8;
	width: 100%;
	position: absolute;
	top: 0;
	height: 100%;
	transition: background-color 0.5s linear;
`;

const slideBackgorundFadeout = css`
	background-color: transparent;
	transition: background-color 0.5s linear;
	z-index: -1;
`;

const slideMenu = css`
	background-color: #fff;
	width: 80%;
	height: 100%;
	top: 0;
	z-index: 999999;
	position: absolute;
	transition: 0.5s;
	position: absolute;
	right: -80%;
	animation: slide 0.5s forwards;
	@-webkit-keyframes slide {
		100% {
			right: 0;
		}
	}

	@keyframes slide {
		100% {
			right: 0;
		}
	}
`;

const fadeOut = css`
	background-color: #fff;
	width: 80%;
	height: 100%;
	top: 0;
	z-index: 999999;
	transition: 0.5s;
	position: absolute;
	right: 0;
	animation: fadeOut 0.5s forwards;
	@-webkit-keyframes fadeOut {
		100% {
			right: -80%;
		}
	}

	@keyframes fadeOut {
		100% {
			right: -80%;
		}
	}
`;
const none = css`
	width: 0 !important;
	top: 0;
	right: 0;
	z-index: 999999;
	position: absolute;
	transition: 0.5s;
`;
const OptionalContainer = styled.div`
	display: flex;
`;
const mapper = ({ skinMapStore }: RootStoreModel) => ({
	skinMapStore,
});

// 같은 좌표에 병원이 여러개 일 경우 노출되는 병원 정보 컨테이너
export const SkinMapHospitalList = observer(() => {
	const { skinMapStore } = useInjection(mapper);

	const handlers = useSwipeable({
		onSwipedRight: () => skinMapStore.setHospitalMenuShow(false),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const hospitalClose = () => skinMapStore.setHospitalMenuShow(false);

	return (
		<SlideContainer
			css={!skinMapStore.getIsHospitalListShow() && none}
			{...handlers}
		>
			<OptionalContainer
				css={
					!skinMapStore.getIsHospitalListShow()
						? slideBackgorundFadeout
						: slideBackground
				}
				onClick={hospitalClose}
			/>
			<OptionalContainer
				css={!skinMapStore.getIsHospitalListShow() ? fadeOut : slideMenu}
			>
				{skinMapStore.getIsHospitalListShow() && <SkinMapHospitalItems />}
			</OptionalContainer>
		</SlideContainer>
	);
});
