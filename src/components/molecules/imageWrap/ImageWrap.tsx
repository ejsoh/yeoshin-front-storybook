import { useInjection, useLazyLoading } from "hooks";
import React from "react";
import { mapper } from "models/RootStore";
import styled from "@emotion/styled/macro";
import { isEmpty, isNotEmpty } from "helper/checkEmptyHelper";

type ImageProps = {
	isNotLoading: boolean;
};

const ImageStyle = styled.img<ImageProps>`
	box-sizing: border-box;
	${props => props.isNotLoading && "visibility: hidden;"}
	width: 100px;
	height: 100px;
	margin-right: 16px;
	border-radius: 4px;
	border: 1px solid #3d3d3d1a;
`;

const ImageContainer = styled.div`
	background-color: #f7f6f6;
	width: 100px;
	height: 100px;
	margin-right: 16px;
	border-radius: 4px;
`;
const ImageWrap = ({
	url,
	lastItem,
	productcode,
	excute,
}: {
	url: string;
	productcode?: string;
	lastItem?: string;
	excute?: (index: number) => void;
}) => {
	const { loadingSrc, getImage } = useLazyLoading(url);
	const { mainStore } = useInjection(mapper);
	const imageLoading = React.useCallback(() => {
		isNotEmpty(loadingSrc) &&
			lastItem &&
			lastItem === productcode &&
			excute &&
			(excute(mainStore.getMainIndex() + 1),
			mainStore.setMainIndex(mainStore.getMainIndex() + 1));
	}, [loadingSrc]);

	React.useEffect(() => {
		imageLoading();
	}, [loadingSrc]);

	return (
		<ImageContainer>
			<ImageStyle
				isNotLoading={isEmpty(loadingSrc)}
				src={loadingSrc}
				alt={"yeoshinImage"}
				ref={getImage}
			/>
		</ImageContainer>
	);
};

export default React.memo(ImageWrap);
