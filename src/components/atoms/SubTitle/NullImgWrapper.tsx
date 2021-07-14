import styled from "@emotion/styled/macro";
import React from "react";

export type NullImgWrapperProps = {
	size?: string;
	imgUrl?: string;
	maxWidth?: string;
	objectFit?: string;
	width?: string;
	height?: string;
	right?: string; // onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	children?: React.ReactNode;
};

// TODO: 기본적으로 100% 이고, size 가 있을때 가로세로 정비율로 맞춰지면서 이미지 랩핑 되게 의도
const CustomNullImgWrapper = styled.div<NullImgWrapperProps>`
	width: ${props => props.size};
	height: ${props => props.size};
	right: ${props => props.size};
	top: ${props => props.size};
	bottom: ${props => props.size};
	margin: auto;
	img {
		display: block;
	}
`;

export const NullImgWrapper = ({
	imgUrl = "",
	size,
	width,
	height,
	maxWidth = "",
	objectFit,
	children,
}: NullImgWrapperProps) => {
	return (
		<CustomNullImgWrapper
			size={size}
			// imgUrl={imgUrl}
			maxWidth={maxWidth}
			width={width}
			height={height}
			objectFit={objectFit}
		>
			{children}
		</CustomNullImgWrapper>
	);
};
