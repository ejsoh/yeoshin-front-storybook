import React from "react";
import { Row } from "components/atoms/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

export const Title = styled.div`
	font-size: 15px;
	padding: 13px 15px 0;
	display: flex;
	justify-content: space-between;
`;

export const SubTitle = styled.div`
	font-size: 13px;
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	margin-top: 14px;
`;

const SwitchButtonItems = styled.div`
	width: 50%;
	height: 100%;
	border-radius: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const selectedItemsUserSexual = css`
	background-color: #3d3d3d;
	color: #fff;
`;

const SwitchButtonContainer = styled(Row)`
	margin: 4px;
	min-width: 76px;
	background-color: #f7f7f7;
	border-radius: 100px;
	height: 36px;
	color: #a8a8a8;
	transition: 0.5s;
`;
export const SwitchButton = ({
	event,
	right,
	left,
	current,
}: {
	event: () => void;
	right: string;
	left: string;
	current: boolean;
}) => {
	return (
		<SwitchButtonContainer between onClick={event}>
			<SwitchButtonItems css={current && selectedItemsUserSexual}>
				{right}
			</SwitchButtonItems>
			<SwitchButtonItems css={!current && selectedItemsUserSexual}>
				{left}
			</SwitchButtonItems>
		</SwitchButtonContainer>
	);
};
