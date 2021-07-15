import { Column, Row } from "components/atoms/Grid";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";

import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { HospitalInfo } from "./SkinMapHospitalInfoCotainer";
import { Space } from "components/atoms/Spacing";

const HospitalCardContainer = styled.div`
	box-sizing: border-box;
	height: 100%;
	width: 100%;
`;
const hospitalTopSection = css`
	position: absolute;
	z-index: 999999;
	height: 74px !important;
	padding: 16px;
	box-sizing: border-box;
	justify-content: space-between;
	border-bottom: 1px solid #f7f7f7;
	background-color: #fff;
`;
const textSpacing = css`
	flex-wrap: wrap;
	padding: 5px 0 0 0;
	& > * {
		margin: 0 2px;
	}
`;

const mapper = ({ skinMapStore }: RootStoreModel) => ({
	skinMapStore,
});

// 같은 좌표에 병원이 여러개 일 경우에 노출되는 병원 정보 아이템
export const SkinMapHospitalItems = observer(() => {
	const { skinMapStore } = useInjection(mapper);
	const info = skinMapStore.getSkinMapRestuls().hospital;
	const address = skinMapStore.getCurrentAddress();

	return (
		<HospitalCardContainer>
			<Column css={hospitalTopSection}>
				<Row>
					<Text size={19} left>
						병원찾기
					</Text>
					<Space column={2} />
					<NumberText size={18}>
						({info.length !== 0 && info.length})
					</NumberText>
				</Row>
				<Row css={textSpacing}>
					<Text lightgray>{address.city}</Text>
					<Text lightgray>{address.add2}</Text>
					<Text lightgray small>
						{address.add1}
					</Text>
				</Row>
			</Column>
			<HospitalInfo />
		</HospitalCardContainer>
	);
});
