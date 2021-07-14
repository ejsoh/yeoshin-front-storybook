import { ToggleEvent } from "components/molecules";
import React from "react";
import styled from "@emotion/styled/macro";

const ImageContainer = styled.img`
	width: auto;
	min-width: 100px;
	height: 100%;
`;

const EmptyImageContainer = styled.div`
	background-color: #e4e4e4;
	width: auto;
	min-width: 100px;
	height: 100%;
`;

export const ThumbnailImageWrapper = ({ ...rest }) => {
	const [isErrorImage, setIsErrorImage] = React.useState(false);
	return (
		<ToggleEvent condition={isErrorImage}>
			<EmptyImageContainer />
			<ImageContainer onError={e => setIsErrorImage(!isErrorImage)} {...rest} />
		</ToggleEvent>
	);
};
