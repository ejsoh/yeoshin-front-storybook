import React from "react";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
export type PopupProps = {
	themes?: string; // 팝업 형식에 대한 theme
	Animation?: string; // 애니메이션
	color?: string;
	types?: string;
	isOpen?: boolean;
	event?: () => void;
	children?: React.ReactNode;
	onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onOpen?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const PopupStyle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: #3d3d3d9e;

	.dim {
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		top: 0;
		left: 0;
		z-index: 10;
	}
`;

const PopInsideContainer = styled.div`
	text-align: center;
	height: 100%;
	text-align: center;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	&:after {
		display: inline-block;
		height: 100%;
		vertical-align: middle;
		content: "";
	}
`;

export const Popup = ({
	Animation,
	color,
	children,
	types,
	isOpen = false,
	event,
	...props
}: PopupProps) => {
	return (
		<PopupStyle>
			<PopInsideContainer>{children}</PopInsideContainer>
			<div className="dim"></div>
		</PopupStyle>
	);
};

export const ToastPopupContainer = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	position: absolute;
	text-align: center;
	z-index: 9;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	overflow: hidden;
	left: 0;
`;

export const ToastLeftPopupContainer = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	position: absolute;
	justify-content: flex-end;
	z-index: 9;
	right: 0;
	margin-top: 10px;
	overflow: hidden;
`;

export const ToastPopupItems = styled.div`
	display: flex;
	overflow: hidden;
	border-radius: 4px;
	color: #fff;
	padding: 10px 15px;
	background-color: #3d3d3d;
	opacity: 0.8;
`;

export const ToastPopupLeftItems = styled.div`
	display: flex;
	overflow: hidden;
	border-radius: 4px;
	color: #fff;
	padding: 10px 15px;
	background-color: #3d3d3d;
	transition: 0.5s;
	position: relative;
	opacity: 0.8;
`;

const fadeInEvent = css`
	animation: fadeIn 0.5s ease-in-out;
	transform: scale(1);
	@keyframes fadeIn {
		0% {
			transform: scale(0);
			display: none;
		}
		100% {
			transform: scale(1);
			display: flex;
		}
	}
`;

const fadeOutEvent = css`
	transform: scale(0);
	transition: 0.5s;
`;

export const ToastPopup = ({
	text,
	isShow,
}: {
	text: string;
	isShow: boolean;
}) => {
	return (
		<ToastPopupContainer css={isShow ? fadeInEvent : fadeOutEvent}>
			<ToastPopupItems>
				<Text white>{text}</Text>
			</ToastPopupItems>
		</ToastPopupContainer>
	);
};
