import styled from "@emotion/styled/macro";
import React from "react";

export type ImgWrapperProps = {
	imgUrl?: string;
	width?: string;
	height?: string;
	children?: JSX.Element;
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const ImgWrapper = ({
	width,
	height,
	imgUrl = "",
	children,
	...rest
}: ImgWrapperProps) => {
	return (
		<CustomImgWrapper width={width} height={height} {...rest}>
			<>
				<img src={imgUrl} alt="" />
				{children}
			</>
		</CustomImgWrapper>
	);
};

const CustomImgWrapper = styled.div<ImgWrapperProps>`
	position: relative;
	img {
		display: block;
		width: ${props => props.width};
		height: ${props => props.height};
	}
`;
