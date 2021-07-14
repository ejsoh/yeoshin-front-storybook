import styled from "@emotion/styled/macro";

export const EventContainer = styled.div`
	width: 100%;
	position: absolute;
	bottom: 0;
	z-index: 999;
	background-color: #fff;
	border-radius: 16px 16px 0px 0px;
	box-sizing: border-box;

	animation: eventFadeIn 0.3s linear;
	@keyframes eventFadeIn {
		100% {
			bottom: 0;
		}
	}
`;

export const NoResultContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	white-space: pre-line;
	text-align: center;
	line-height: 16px;
	height: 100%;
	font-size: 13px;
`;

export const HospitalCard = styled.div`
	background: #f7f7f7;
	border-radius: 4px;
	margin-left: 10px;
	&:first-of-type {
		margin: 0;
	}
	display: flex;
	line-height: 15px;
	flex-direction: row;
	min-width: 250px;
	height: 70px;
	position: relative;
	box-sizing: border-box;
`;

export const EventItemsContainer = styled.a`
	position: relative;
	&:first-of-type {
		margin: 0;
	}
	margin: 0 0 0 10px;
	border-radius: 4px;
	width: 76px;
	overflow: hidden;
	box-sizing: border-box;
	transition: 0.3s;
`;

export const EventSwipeContainer = styled.div`
	margin: 8px 10px 0;
	overflow-x: scroll;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
	}
	scroll-behavior: smooth;
	display: flex;
	position: relative;
	box-sizing: border-box;
	height: 140px;
`;

export const HospitalSwipeContainer = styled.div`
	margin: 8px 10px 0;
	overflow-x: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
	-webkit-overflow-scrolling: touch;
	&::-webkit-scrollbar {
		display: none;
	}
	scroll-behavior: smooth;
	display: flex;
	position: relative;
	box-sizing: border-box;
`;

type ThumbnailImage = { path: string; size: string };

export const HospitalItemsEventContainer = styled.a<ThumbnailImage>`
	border-radius: 4px;
	display: flex;
	position: relative;
	height: 70px;
	min-width: 86px;
	background: url(${props => props.path}) no-repeat center center;
	background-size: ${props => props.size};
	border-radius: 4px 0px 0px 4px;
	transition: 0.2s;
	border: 1px solid #eae5e5;
	box-sizing: border-box;
`;

export const ImageStyle = styled.img`
	position: absolute;
	z-index: -1;
	width: 1px;
	visibility: hidden;
`;
