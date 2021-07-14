import { Space, SpaceBorder, SpaceContainer } from "components/atoms/Spacing";
import { Icon } from "components/atoms";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { EventStatusBar } from "./eventComponents/EventStatusBar";
import { lazyDelayed } from "helper/lazyHelper";
import EventList from "./eventComponents/EventList";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import { eventStore } from "models/stores";
import { EventFilterBottomSheet } from "./eventComponents/EventFilterBottomSheet";

const EventContainer = styled.div`
	overflow-x: hidden;
`;

export const EventContents = observer(() => {
	const { interactionStore, mainStore, eventStore } = useInjection(mapper);
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
		<EventContainer>
			<Space column={135} />
			<EventStatusBar />
			<EventList />
			<OnlyTruthyShow condition={eventStore.eventFilterShow}>
				<EventFilterBottomSheet />
			</OnlyTruthyShow>
		</EventContainer>
	);
});
