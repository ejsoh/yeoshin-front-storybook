import { Column, Row } from "components/atoms/Grid";
import { Icon, InteractionIcon } from "components/atoms";
import { Space, SpaceContainer } from "components/atoms/Spacing";

import { AxiosResponse } from "axios";
import { HOME } from "constantDatas/api";
import ImageWrap from "components/molecules/imageWrap/ImageWrap";
import { NumberText } from "components/atoms/Typo/Typo";
import React, { useState, useCallback } from "react";
import { SearchDomain } from "pages/main/MainDomain";
import { Text } from "components/atoms/Text";
import { ToggleEvent } from "components/molecules";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import heartIcon from "assets/jsonIcons/heart.json";
import styled from "@emotion/styled/macro";
import { useAuth, useInjection } from "hooks";
import { openProduct } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";
import { interactionStore } from "models/stores";
import { pixelTracking } from "services/utils/analystics/pixel";
import { Divider } from "components/atoms/Divider/Divider";
import { mapper } from "models/RootStore";
import { Observer } from "mobx-react-lite";

export const EventStatusBar = () => {
	const { eventStore } = useInjection(mapper);

	// NOTE : 모바일 예약가능 정렬
	const [isReservationSort, setIsReservationSort] = useState<boolean>(false);
	const reservationStatusClick = useCallback(() => {
		if (!isReservationSort) {
			setIsReservationSort(!isReservationSort);
			const reservationPossibleList = eventStore.event.filter(
				event => event.isReservation == true
			);
			eventStore.setFilteredEvent(reservationPossibleList);
			eventStore.setEventCount(reservationPossibleList.length);
		} else {
			// NOTE : 초기화
			eventStore.setFilteredEvent([...eventStore.event]);
			eventStore.setEventCount(eventStore.event.length);
			setIsReservationSort(!isReservationSort);
		}
	}, [isReservationSort]);

	// NOTE : 필터 오픈
	const FilterClick = () => {
		eventStore.setEventFilterShow(true);
	};

	return (
		<SpaceContainer row={16} column={8}>
			<Observer>
				{() => (
					<Row between>
						<Text size={13} lightgray>
							총 {eventStore.eventCount} 개
						</Text>
						<Row>
							<Row onClick={reservationStatusClick}>
								{isReservationSort ? (
									<Icon icon="checkOvalOn" size={20} />
								) : (
									<Icon icon="checkOvalOff" size={20} />
								)}
								<Space row={9} />
								<Text>모바일 예약</Text>
							</Row>
							<Space row={15} />
							<Divider height={13} width={2} backgroundColor={"#E6E6E6"} />
							<Space row={15} />
							<Row onClick={FilterClick}>
								<Icon icon="sort" size={20} />
								<Space row={6} />
								<Text>{eventStore.filter}</Text>
							</Row>
						</Row>
					</Row>
				)}
			</Observer>
		</SpaceContainer>
	);
};
