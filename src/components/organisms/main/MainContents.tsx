import { Space, SpaceBorder, SpaceContainer } from "components/atoms/Spacing";
import { Icon } from "components/atoms";
import { MyHospitalEvent } from "./mainComponents/MyHospitalEvent";
import { NewEvent } from "./mainComponents/NewEvent";
import React from "react";
import { RecommendEvent } from "./mainComponents/RecommendEvent";
import { TitleLabel } from "./mainComponents/TitleLabel";
import { YeoshinCarousel } from "./mainComponents/YeoshinCarousel";
import { YeoshinCategory } from "./mainComponents/YeoshinCategory";
import { YeoshinTv } from "./mainComponents/YeoshinTv";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { myHospitalEvent, yeoshinTvList } from "constantDatas/linkUrls";
import { YeoshinTicketInformation } from "./mainComponents/YeoshinTicketInformation";

const MainContainer = styled.div`
	overflow-x: hidden;
`;

const bannerFadeInAndOut = css`
	position: relative;
	left: 0;
	transition: 0.5s;
	max-width: 500px;
	margin: 0 auto;
	animation: leftInOut 0.5s ease-in-out;
	overflow: hidden;

	@keyframes leftInOut {
		0% {
			left: 600px;
		}
		100% {
			left: 0px;
			height: auto;
		}
	}
`;
const RefTarget = styled.div``;

export const MainContents = observer(() => {
	const { interactionStore, mainStore } = useInjection(mapper);
	const target = React.useRef(null);
	React.useLayoutEffect(() => {
		const updatePosition = () => {
			window.pageYOffset > 230 && interactionStore.setMainBannerIsShow(true);
		};
		window.addEventListener("scroll", updatePosition);
		updatePosition();
		interactionStore.getMainBannerIsShow() &&
			window.removeEventListener("scroll", updatePosition);
		return () => window.removeEventListener("scroll", updatePosition);
	}, []);

	return (
		<MainContainer>
			<YeoshinCarousel />

			<YeoshinCategory />

			<SpaceBorder />

			<TitleLabel
				title="여신 TV 영상"
				link={yeoshinTvList}
				rightContents={<Icon icon="rightIconArrow" />}
			/>
			<YeoshinTv />

			<Space column={12} />

			{interactionStore.getMainBannerIsShow() && (
				<SpaceContainer row={16} css={bannerFadeInAndOut}>
					<img src="/images/images/yeoshinBanner.png" />
				</SpaceContainer>
			)}

			<RefTarget ref={target} />

			{mainStore.getData().recommendEvent && (
				<React.Fragment>
					<TitleLabel title="추천 이벤트" />
					<RecommendEvent />
				</React.Fragment>
			)}

			{mainStore.getData().myHospitalEvent && (
				<React.Fragment>
					<TitleLabel
						link={myHospitalEvent}
						title="단골병원 이벤트"
						rightContents={<Icon icon="rightIconArrow" />}
					/>
					<MyHospitalEvent />
				</React.Fragment>
			)}

			{mainStore.getState() === "complete" && (
				<React.Fragment>
					<TitleLabel title="신규 이벤트" />
					<NewEvent />
					<YeoshinTicketInformation />
				</React.Fragment>
			)}
		</MainContainer>
	);
});
