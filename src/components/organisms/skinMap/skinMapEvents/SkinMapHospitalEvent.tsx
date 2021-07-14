import { Column, Row } from "components/atoms/Grid";
import { Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { SkinMapEventHospitalItem } from "./SkinMapEventHospitalItem";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { box } from "./SkinMapEventItems";
import { HospitalSwipeContainer } from "./SkinMapEventComponents";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const hospitalName = css`
	width: 100%;
	white-space: nowrap;
`;

const mapper = ({ skinMapStore }: RootStoreModel) => ({
	skinMapStore,
});

export const SkinMapHospitalEvent = observer(() => {
	const { skinMapStore } = useInjection(mapper);
	const hospitalShowEvent = () => () =>
		skinMapStore.setIsHospitalShow(!skinMapStore.gethospitalShow());
	return (
		<Column>
			<Row between css={box} onClick={hospitalShowEvent}>
				<Text medium left bold size={14} css={hospitalName}>
					{skinMapStore.getSkinMapText().hospital}
				</Text>
				<Row between>
					<NumberText small gray bold>
						{skinMapStore.getStoreCount().hospital}
					</NumberText>
					<Text lightgray>건</Text>
					<Space row={9}></Space>
					<Icon
						size={10}
						icon={skinMapStore.gethospitalShow() ? "upArrow" : "downArrow"}
					></Icon>
				</Row>
			</Row>
			<OnlyTruthyShow condition={skinMapStore.gethospitalShow()}>
				<HospitalSwipeContainer>
					<SkinMapEventHospitalItem />
				</HospitalSwipeContainer>
			</OnlyTruthyShow>
		</Column>
	);
});
