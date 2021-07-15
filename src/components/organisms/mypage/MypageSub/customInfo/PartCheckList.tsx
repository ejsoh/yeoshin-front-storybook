import { Icon } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import React from "react";
import { removeDuplicateItemsByKey } from "helper";
import { useInjection } from "hooks";
import { SubTitle } from "../../mypageCommon/MyPageAtoms";
import { AxiosResponse } from "axios";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import styled from "@emotion/styled/macro";
import { CustomInfoDomain } from "pages/mypage/CustomInfo";

const RoundCheckbox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 10px;
	justify-content: space-evenly;
	min-width: 60px;
	border: 1px solid #e6e6e6;
	box-sizing: border-box;
	border-radius: 100px;
	font-size: 13px;
	margin: 4px;
`;
const selectedItems = css`
	border: 1px solid #ef4b81;
	& > div {
		color: #ef4b81;
	}
`;

export const PartCheckList = ({ part }: { part: string[] }) => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { partFilter } = CustomInfoDomain();
	const checkItem = (key: string, itemIndex: number) => {
		const copied = { ...fetchStore.fetchStore().body.data };
		const partList = [
			...[
				{
					id: itemIndex,
					name: fetchStore.fetchStore().body.data[key][itemIndex].name,
					isSelected: !fetchStore.fetchStore().body.data[key][itemIndex]
						.isSelected,
				},
			],
			...fetchStore.fetchStore().body.data[key],
		];

		copied[key] = removeDuplicateItemsByKey(partList, "name").sort(
			(a: { [key: string]: number }, b: { [key: string]: number }) =>
				a.id - b.id
		);

		fetchStore.setResponse({
			...fetchStore.fetchStore(),
			body: {
				...fetchStore.fetchStore().body,
				data: {
					...copied,
				},
			},
		});

		partFilter().length > 0 && interactionStore.setValidationMessage({});
	};
	return (
		<Column>
			<SubTitle>
				{part[1]}({fetchStore.fetchStore().body.count[part[0]]})
			</SubTitle>
			<Row isWrap space={[0, 5]}>
				{fetchStore.fetchStore().body.data &&
					fetchStore
						.fetchStore()
						.body.data[part[0]].map(
							(item: AxiosResponse["data"], index: number) => (
								<RoundCheckbox
									key={item.name + part}
									onClick={() => checkItem(part[0], index)}
									css={item.isSelected && selectedItems}
								>
									<Icon
										size={10}
										icon="arrowBottom"
										color={item.isSelected ? "pink" : "lightgray"}
									/>
									<Text padding={"0 0 0 5"} center>
										{item.name}
									</Text>
								</RoundCheckbox>
							)
						)}
			</Row>
		</Column>
	);
};
