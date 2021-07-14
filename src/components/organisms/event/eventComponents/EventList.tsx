import { AxiosResponse } from "axios";
import React from "react";
import styled from "@emotion/styled/macro";
import { mapper } from "models/RootStore";
import { Observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { lazyDelayed } from "helper/lazyHelper";
import { Column, Row } from "components/atoms/Grid";
import { ToggleEvent } from "components/molecules";
import { EventItemType } from "types/EventItemType";
const EventCommon = lazyDelayed(import("../../common/EventCommon"));

const RecommendContainer = styled.div`
	min-height: 100px;
`;
const RecommendLoadingContainer = styled(Row)`
	margin: 15px;
`;

const MockImage = styled.div`
	height: 100px;
	min-width: 100px;
	margin-right: 15px;
	background-color: #f7f6f6;
	border-radius: 5px;
	overflow: hidden;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-name: twinkle;
	@keyframes twinkle {
		0% {
			opacity: 0.3;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.5;
		}
	}
`;

const MockText = styled.div`
	padding: 10px;
	background-color: #f7f6f6;
	margin: 5px 0;
	animation-duration: 2s;
	animation-iteration-count: infinite;
	animation-name: twinkle;
`;
export const RecommendLoadings = () => {
	return (
		<Column>
			{Array.from(Array(10).keys()).map((index: number) => (
				<RecommendLoadingContainer key={index + "loadings"}>
					<MockImage />
					<Column fullWidth>
						<MockText />
						<MockText />
						<MockText />
					</Column>
				</RecommendLoadingContainer>
			))}
		</Column>
	);
};

const EventList = () => {
	const { eventStore } = useInjection(mapper);
	const [eventLoading, setEventLoading] = React.useState(false);
	React.useEffect(() => {
		setEventLoading(!eventLoading);
	}, []);
	return (
		<React.Suspense fallback={<RecommendLoadings />}>
			<ToggleEvent condition={eventLoading}>
				<Observer>
					{() => (
						<RecommendContainer>
							{(eventStore.filteredEvent || []).map(
								(item: EventItemType, index: number) => (
									<EventCommon
										item={item}
										key={"recommendEvent" + item.key + index}
										lastItem={eventStore.event[eventStore.event.length - 5].key}
									/>
								)
							)}
						</RecommendContainer>
					)}
				</Observer>
				<RecommendLoadings />
			</ToggleEvent>
		</React.Suspense>
	);
};

export default React.memo(EventList);
