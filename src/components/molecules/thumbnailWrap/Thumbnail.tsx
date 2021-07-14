import { useInjection, useLazyLoading } from "hooks";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Row } from "components/atoms/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { DomainConnector } from "pages/skinMap/domainConnector";
import { SkinMapDomain } from "pages/skinMap/domain";
import { observer } from "mobx-react-lite";

type ThumbnailProps = { url: string };

const ThumbnailContainer = styled.div<ThumbnailProps>`
	height: 130px;
	p {
		width: 100px;
		letter-spacing: -0.5px;
		font-size: 12px;
		padding: 2px 0;
		word-wrap: normal;
		width: 100px;
		overflow: hidden;
	}
	&::before {
		content: "";
		display: flex;
		height: 76px;
		width: 76px;
		background: url(${props => props.url}) no-repeat center center #f7adad1a;
		border-radius: 4px;
		transition: 0.2s;
		background-size: contain;
		box-sizing: border-box;
		border: 1px solid #eae5e5;
	}
`;

const ImageContainer = styled.img`
	position: absolute;
	z-index: -1;
	width: 1px;
	visibility: hidden;
`;

const rowCustomStyle = css`
	align-items: end;
	position: absolute;
	top: 0;
	& > * {
		margin-right: 10px;
	}
`;

const EmptyContainer = styled.div`
	display: flex;
	height: 96px;
	width: 96px;
	background: rgb(61 61 61 / 10%);
	border-radius: 4px;
	background-size: contain;
	box-sizing: border-box;
	border: 1px solid #eae5e5;
`;

const mapper = ({
	fetchStore,
	userInfoStore,
	skinMapStore,
}: RootStoreModel) => ({
	fetchStore,
	userInfoStore,
	skinMapStore,
});

export const CPMThumbnail = observer(
	({
		url,
		description,
		productcode,
		lastItem,
	}: {
		url: string;
		description: JSX.Element;
		productcode: string;
		lastItem?: string;
	}) => {
		const { fetchStore, skinMapStore } = useInjection(mapper);
		const { loadingSrc, getImage } = useLazyLoading(url);
		const { hospitalEventCall } = SkinMapDomain();
		const { getProduct } = DomainConnector();
		React.useEffect(() => {
			loadingSrc !== "" &&
				lastItem === productcode &&
				(getProduct(
					skinMapStore.getSkinMapSearchState() === "detail"
						? () => hospitalEventCall(skinMapStore.getProductIndex() + 1)
						: undefined
				),
				skinMapStore.setProductIndex(skinMapStore.getProductIndex() + 1));
		}, [loadingSrc]);

		return (
			<ThumbnailContainer url={loadingSrc ?? url}>
				<ImageContainer alt={"eventImage"} src={loadingSrc} ref={getImage} />
				{description}
				{fetchStore.getState() !== "done" && (
					<Row css={rowCustomStyle}>
						{Array(6).map((index: number) => (
							<EmptyContainer key={"repeat" + index} />
						))}
					</Row>
				)}
			</ThumbnailContainer>
		);
	}
);
