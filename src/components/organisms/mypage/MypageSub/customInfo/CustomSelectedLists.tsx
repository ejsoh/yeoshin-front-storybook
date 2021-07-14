import React from "react";
import { Icon } from "components/atoms";
import { useInjection } from "hooks";
import { Text } from "components/atoms/Message";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";

const CloseIcon = styled(Icon)`
	background-color: #ef4b81;
	border-radius: 100px;
	height: 20px;
	width: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const AreaSelectRound = styled.div`
	border: 1px solid #ef4b81;
	border-radius: 100px;
	font-size: 13px;
	padding: 5px 12px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 4px;
	letter-spacing: -1px;
`;
const AreaSelectedContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 0 25px 5px;
	flex-wrap: wrap;
`;

export const SelectedAreaLists = observer(() => {
	const { fetchStore } = useInjection(mapper);

	const closeEvent = (item: string) => () => {
		const copied = [...fetchStore.fetchStore().selectedArea];
		copied.splice(fetchStore.fetchStore().selectedArea.indexOf(item), 1);
		fetchStore.setResponse({
			...fetchStore.fetchStore(),
			selectedArea: copied,
		});
	};

	return (
		<AreaSelectedContainer>
			{fetchStore.fetchStore().selectedArea.map((item: string) => (
				<AreaSelectRound key={item}>
					<Text pink bold padding={"0 5"}>
						{item.replace("|", " ")}
					</Text>
					<CloseIcon event={closeEvent(item)} icon="whiteClose" size={10} />
				</AreaSelectRound>
			))}
		</AreaSelectedContainer>
	);
});
