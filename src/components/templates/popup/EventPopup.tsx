import { Text } from "components/atoms/Message";
import styled from "@emotion/styled/macro";
import React from "react";

import { Column, Row } from "components/atoms/Grid";
import { SpaceContainer } from "components/atoms/Spacing";
import { Button } from "components/atoms";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { mapper } from "models/RootStore";
import { AxiosResponse } from "axios";
import { Popup } from "..";
import { SearchDomain } from "pages/main/MainDomain";

const EventPopContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: auto;
	overflow: hidden;
	left: 0;
	top: 0;
	z-index: 11;
	background-color: #fff;
	border-radius: 15px;
	button {
		border: 0;
		border-radius: 0;
		font-size: 14px;
	}
`;

const ReviewPopUp = () => {
	const { writeLater } = SearchDomain();
	const { mainStore } = useInjection(mapper);
	const onClick = React.useCallback(() => {
		mainStore.setResponse({
			...mainStore.getData(),
			...{ myPopup: [] },
		});
		window.location.href = "https://yeoshin.co.kr/?pn=mypage.order.list";
	}, [mainStore.getData().myPopup.length > 0]);
	return (
		<EventPopContainer>
			<Column>
				<SpaceContainer row={20} borderBottom={"#ddd"}>
					<Text
						borderBottom={"black"}
						center
						size={16}
						padding={"15"}
						weight={500}
					>
						새로운 메세지
					</Text>
					<SpaceContainer column={20}>
						<Text small left gray>
							후기를 작성할 수 있습니다.
						</Text>
						<Text left small gray>
							포토후기 작성시 2,000포인트가 적립됩니다.
						</Text>
					</SpaceContainer>
				</SpaceContainer>
				<Row>
					<Button large onClick={writeLater}>
						다음에
					</Button>
					<Button onClick={onClick} filled large>
						작성하기
					</Button>
				</Row>
			</Column>
		</EventPopContainer>
	);
};

export const EventPopUp = observer(() => {
	const { mainStore } = useInjection(mapper);

	return (
		<>
			{mainStore.getData().myPopup &&
				mainStore
					.getData()
					.myPopup.map((item: AxiosResponse["data"]) => (
						<Popup key={item.key}>
							{item.type === "REVIEW" ? <ReviewPopUp /> : <ReviewPopUp />}
						</Popup>
					))}
		</>
	);
});
