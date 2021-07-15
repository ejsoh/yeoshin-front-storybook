import styled from "@emotion/styled/macro";

const MarkerBase = styled.div`
	position: relative;
	background-size: cover;
	width: 24px;
	height: 24px;
	background-color: #fff;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0px 11px 13px #c3c3c3;
	&::after {
		content: "";
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: #fff;
		bottom: -2px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 13px;
	}
`;

const SectorContainer = styled.div`
	position: absolute;
	width: 22px;
	height: 22px;
	z-index: 9;
	display: flex;
	justify-content: center;
	aling: center;
	align-items: center;
	border-radius: 50%;
	position: relative;
	overflow: hidden;
`;

type MarkerProps = {
	image: string;
};

const LeftTopIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	background-size: cover;
	width: 11px;
	height: 11px;
	transform: rotate(0deg);
	position: absolute;
	left: 0;
	top: 0;
`;

const RightTopIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	background-size: cover;
	width: 11px;
	height: 11px;
	transform: rotate(90deg);
	position: absolute;
	right: 0;
	top: 0;
`;
const RightBottomIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	background-size: cover;
	width: 11px;
	height: 11px;
	transform: rotate(180deg);
	position: absolute;
	right: 0;
	bottom: 0;
`;
const LeftBottomIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	background-size: cover;
	width: 11px;
	height: 11px;
	transform: rotate(270deg);
	position: absolute;
	left: 0;
	bottom: 0;
`;

const MarkerContainer = styled.div`
	position: absolute;
	width: 22px;
	height: 22px;
	z-index: 9;
	display: flex;
	justify-content: center;
	aling: center;
	align-items: center;
	border-radius: 100px;
	overflow: hidden;
`;
const LeftSectorIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	width: 15px;
	height: 15px;
	left: 50%;
	top: 50%;
	margin-top: -15px;
	margin-left: -15px;
	transform-origin: 100% 100%;
	transform: rotate(-31deg) skew(-30deg);
`;

const RightSectorIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	width: 15px;
	height: 15px;
	left: 50%;
	top: 50%;
	margin-top: -15px;
	margin-left: -15px;
	transform-origin: 100% 100%;
	transform: rotate(89deg) skew(-30deg);
`;

const BottomSectorIcon = styled.div<MarkerProps>`
	background-color: ${props => props.image};
	width: 15px;
	height: 15px;
	left: 50%;
	top: 50%;
	margin-top: -15px;
	margin-left: -15px;
	transform-origin: 100% 100%;
	transform: rotate(210deg) skew(-30deg);
`;

export {
	MarkerBase,
	SectorContainer,
	MarkerContainer,
	LeftTopIcon,
	RightTopIcon,
	RightBottomIcon,
	LeftBottomIcon,
	LeftSectorIcon,
	RightSectorIcon,
	BottomSectorIcon,
};
