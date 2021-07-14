import { useInjection, useLazyLoading } from "hooks";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RootStoreModel } from "models/RootStore";
import { Row } from "components/atoms/Grid";
import { Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import {
	HospitalItemsEventContainer,
	ImageStyle,
} from "./SkinMapEventComponents";
import { DomainConnector } from "pages/skinMap/domainConnector";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const startContainer = css`
	background-color: rgb(61 61 61 / 85%);
	padding: 3px 0;
	width: 36px;
	position: absolute;
	top: -1px;
	right: -1px;
	z-index: 999;
	box-sizing: border-box;
	padding-left: 2px;
`;

const mapper = ({ skinMapStore }: RootStoreModel) => ({
	skinMapStore,
});

export const SkinMapHospitalImageLoading = ({
	url,
	point,
	href,
	code,
	size,
	lastItem,
}: {
	url: string;
	point: string;
	href: string;
	code: string;
	size: string;
	lastItem?: string;
}) => {
	const { loadingSrc, getImage } = useLazyLoading(url);
	const { skinMapStore } = useInjection(mapper);
	const { getHospital } = DomainConnector();
	React.useEffect(() => {
		loadingSrc !== "" &&
			lastItem === code &&
			getHospital(skinMapStore.getHospitalIndex() + 1);
	}, [loadingSrc]);

	return (
		<HospitalItemsEventContainer path={loadingSrc} size={size} href={href}>
			<ImageStyle src={loadingSrc} alt={loadingSrc} ref={getImage} />
			<OnlyTruthyShow condition={!isNaN(parseInt(point))}>
				<Row css={startContainer}>
					<Icon icon={"star"} size={16}></Icon>
					<NumberText size={10} bold white>
						{point}
					</NumberText>
				</Row>
			</OnlyTruthyShow>
		</HospitalItemsEventContainer>
	);
};
