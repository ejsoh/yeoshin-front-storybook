import { AxiosResponse } from "axios";
import { EventCommon } from "./EventCommon";
import { MainDb } from "pages/main/MainDb";
import React from "react";
import { SpaceContainer } from "components/atoms/Spacing";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const RecommendEvent = observer(() => {
	const { mainStore } = useInjection(mapper);
	const { getRecommendEvent } = MainDb();
	const recommendExcute = (index: number) =>
		getRecommendEvent({ index: index });
	return (
		<SpaceContainer>
			{mainStore
				.getData()
				.recommendEvent.map((item: AxiosResponse["data"], index: number) => (
					<EventCommon
						item={item}
						key={"recommendEvent" + item.key + index}
						lastItem={
							mainStore.getData().recommendEvent[
								mainStore.getData().recommendEvent.length - 3
							].key
						}
						excute={recommendExcute}
					/>
				))}
		</SpaceContainer>
	);
});
