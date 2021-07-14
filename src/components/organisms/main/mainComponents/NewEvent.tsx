import { AxiosResponse } from "axios";
import { EventCommon } from "./EventCommon";
import React from "react";
import { SpaceContainer } from "components/atoms/Spacing";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const NewEvent = observer(() => {
	const { mainStore } = useInjection(mapper);

	return (
		<SpaceContainer>
			{mainStore.getData().newEvent.map((item: AxiosResponse["data"]) => (
				<EventCommon
					item={item}
					key={"newEvent" + item.key}
					lastItem={
						mainStore.getData().newEvent[
							mainStore.getData().newEvent.length - 1
						].key
					}
				/>
			))}
		</SpaceContainer>
	);
});
