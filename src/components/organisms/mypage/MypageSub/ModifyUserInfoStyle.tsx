import styled from "@emotion/styled/macro";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Text } from "components/atoms/Text";
import { Link } from "react-router-dom";

const WithDrawContainer = styled.div`
	padding: 70px 0 30px;
	color: #a8a8a8;
	font-size: 13px;
	line-height: 1.5;
	font-weight: 300;
	display: flex;
	flex-direction: column;
`;

export const SnsWrap = styled.div`
	border-bottom: 1px solid #cccbcb;
	border-top: 1px solid #cccbcb;
	padding: 20px 0 20px;
	margin: 10px auto 30px;
	flex-direction: column;

	& > div:first-of-type {
		padding: 0;
		margin-bottom: 20px;
		justify-content: space-between;
	}
`;

export const ModifyContainer = styled.div`
	padding: 0 15px;
`;

export const ModifySubTitle = css`
	display: inline-block;
	width: 185px;
	margin-top: 8px;
	padding-bottom: 20px;
	color: #ff4e84;
	font-weight: 500;
	letter-spacing: -0.5px;
	border-bottom: 1px solid #cccbcb;
`;
export const ModifySubTitleTop = styled.div`
	${ModifySubTitle}
	margin-top: 8px;
`;
export const ModifySubTitleBottom = styled.div`
	${ModifySubTitle}
	margin-top: 25px;
`;

export const sexButton = css`
	white-space: pre;
	padding: 13px 7px;
	width: 48.5% !important;
	min-width: 45px !important;
`;

export const ButtonContainer = styled.div`
	min-width: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: space-between;
`;

export const WithDraw = () => {
	return (
		<WithDrawContainer>
			여신님 너무 아쉬워요 <br />
			<Text lightgray left>
				회원탈퇴를 원하시면
				<Link
					to="/withDraw"
					css={css`
						padding: 0 0 0 5px;
						text-decoration: underline;
					`}
				>
					여기
				</Link>
				를 눌러주세요
			</Text>
		</WithDrawContainer>
	);
};

const customInfoStyle = css`
	border: 1px solid #ef4b81;
	border-radius: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ef4b81;
	padding: 8px;
	box-sizing: border-box;
	font-size: 13px;
	white-space: break-spaces;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 999;
	margin: 15px;
`;

export const CustomInfo = () => {
	return (
		<Link to="/customInfo" css={customInfoStyle}>
			맞춤정보
		</Link>
	);
};
