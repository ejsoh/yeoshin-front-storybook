import { Column, Row } from "components/atoms/Grid";
import { useInjection } from "hooks";
import { HeartIcon } from "components/molecules";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { ellipsis } from "helper";
import {
	HOSPITAL_EMPTY_IMAGE,
	HOSPITAL_HREF,
	HOSPITAL_IMAGE,
} from "constantDatas";
import { SkinMapHospitalImageLoading } from "./SkinMapHospitalImageLoading";
import { HospitalCard } from "./SkinMapEventComponents";

const mapper = ({ skinMapStore }: RootStoreModel) => ({
	skinMapStore,
});

const contentsStyle = css`
	justify-content: center;
	margin: 0 0 0 10px;
`;

export const SkinMapEventHospitalItem = observer(() => {
	const { skinMapStore } = useInjection(mapper);
	const hospital = skinMapStore.getSkinMapRestuls().hospital;

	return (
		<>
			{hospital.map(i => (
				<EventItemsMapper
					i={i}
					key={i.key + "event"}
					count={skinMapStore.getStoreCount().hospital === 1}
					lastItem={
						skinMapStore.getSkinMapRestuls().hospital[
							skinMapStore.getSkinMapRestuls().hospital.length - 1
						].key
					}
				/>
			))}
		</>
	);
});

const EventItemsMapper = ({
	i,
	count,
	lastItem,
}: {
	i: {
		hospitalImage: string;
		isYeoshin: boolean;
		key: string;
		starPoint: string;
		customername: string;
		review: string;
		eventCount: string;
	};
	count: boolean;
	lastItem: string;
}) => {
	return (
		<HospitalCard
			css={css`
				${count && "width: 100%;"}
			`}
		>
			<SkinMapHospitalImageLoading
				href={HOSPITAL_HREF(i.key)}
				url={
					i.hospitalImage === ""
						? HOSPITAL_EMPTY_IMAGE
						: HOSPITAL_IMAGE(i.hospitalImage)
				}
				size={i.hospitalImage === "" ? "26px" : "cover"}
				point={i.starPoint}
				code={i.key}
				lastItem={lastItem}
			/>

			<Column css={contentsStyle}>
				{i.isYeoshin && <HeartIcon code={i.key} />}
				<Space column={10} />
				<Text left size={12}>
					{ellipsis(i.customername, 7, "...")}
				</Text>
				<Row>
					<Text size={12} gray>
						후기
					</Text>
					<Space row={4} />
					<NumberText size={12} gray bold>
						{ellipsis(i.review, 4)}
					</NumberText>
					<Space row={8} />
					<Text size={12} gray>
						이벤트
					</Text>
					<Space row={4} />
					<NumberText size={12} gray bold>
						{ellipsis(i.eventCount, 4)}
					</NumberText>
				</Row>
			</Column>
		</HospitalCard>
	);
};
