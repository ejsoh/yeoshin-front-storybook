import { Column, Row } from "components/atoms/Grid";
import { HeartIcon } from "components/molecules";
import { Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { ellipsis } from "helper";
import {
	HOSPITAL_EMPTY_IMAGE,
	HOSPITAL_HREF,
	HOSPITAL_IMAGE,
} from "constantDatas";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const hospitalSecondSection = css`
	box-sizing: border-box;
	justify-content: center;
	align-items: flex-start;
	overflow: hidden;
`;
type HospitalImg = { img: string; imgSize: string };

const HospitalImage = styled.div<HospitalImg>`
	min-width: 40px;
	height: 40px;
	border: 1px solid #e6e6e6;
	border-radius: 100px;
	margin-right: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	background: #e6e6e6;
	background: url(${props => props.img}) no-repeat center center #e6e6e6;
	background-size: ${props => props.imgSize};
`;
const hospitalInfo = css`
	padding: 0 0 0 16px;
	position: relative;
	height: 70px;
	justify-content: space-between;
`;

const InfoContainer = styled(Row)`
	height: 100%;
	flex: 2;
`;

const HospitalInfoContainer = styled.div`
	overflow-y: scroll;
	height: 100%;
	width: 100%;
	&::before {
		content: "";
		height: 74px;
		width: 100%;
		display: flex;
	}
`;

const HeartContainer = styled.div`
	& > div {
		position: unset;
	}
`;

const alignText = css`
	width: 100%;
	-webkit-box-align: initial;
`;

const mapper = ({ skinMapStore }: RootStoreModel) => ({
	skinMapStore,
});

export const HospitalInfo = () => {
	const { skinMapStore } = useInjection(mapper);
	const info = skinMapStore.getSkinMapRestuls().hospital;

	return (
		<HospitalInfoContainer>
			{info.map(item => (
				<HospitalInfoMapper item={item} key={item.key} />
			))}
		</HospitalInfoContainer>
	);
};

const HospitalInfoMapper = ({
	item,
}: {
	item: {
		hospitalImage: string;
		customername: string;
		review: string;
		key: string;
		eventCount: string;
		starPoint: string;
		starCount: string;
	};
}) => {
	return (
		<Row between css={hospitalInfo}>
			<InfoContainer as={"a"} href={HOSPITAL_HREF(item.key)}>
				<HospitalImage
					img={
						item.hospitalImage === ""
							? HOSPITAL_EMPTY_IMAGE
							: HOSPITAL_IMAGE(item.hospitalImage)
					}
					imgSize={item.hospitalImage === "" ? "15px" : "cover"}
				></HospitalImage>
				<Column css={hospitalSecondSection}>
					<Text left size={15} ellipsis css={alignText}>
						{ellipsis(item.customername, 7, "...")}
					</Text>
					<Space column={2} />
					<Row css={alignText}>
						<Text left lightgray>
							후기
						</Text>
						<Space row={4} />
						<NumberText gray>
							{parseInt(item.review) >= 100 ? "100+" : item.review}
						</NumberText>
						<Space row={12}></Space>
						<Text left lightgray>
							이벤트
						</Text>
						<Space row={4} />
						<NumberText gray ellipsis>
							{parseInt(item.eventCount) >= 100 ? "100+" : item.eventCount}
						</NumberText>
					</Row>
					<OnlyTruthyShow condition={!isNaN(parseInt(item.starPoint))}>
						<Row>
							<Icon icon={"star"}></Icon>
							<NumberText small bold>
								{item.starPoint}
							</NumberText>
							<NumberText small gray>
								({item.starCount})
							</NumberText>
						</Row>
					</OnlyTruthyShow>
				</Column>
			</InfoContainer>
			<HeartContainer>
				<HeartIcon code={item.key} />
			</HeartContainer>
		</Row>
	);
};
