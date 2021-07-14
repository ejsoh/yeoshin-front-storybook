import { Button, Icon } from "components/atoms";
import { Column } from "components/atoms/Grid";
import { Link } from "react-router-dom";
import React from "react";
import { Space, SpaceBorder } from "components/atoms/Spacing";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";

const NeedLogin = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	p {
		font-size: 14px;
		color: #494949;
	}
	${Column} {
		width: 100%;
		padding: 10px 24px;
	}
`;
const MyPageLoginText = styled.div`
	font-size: 29px;
	color: #3d3d3d;
	line-height: 37px;
	span {
		font-weight: bold;
	}
`;
const iconP = css`
	margin: 23px 0;
	justify-content: flex-start !important;
`;

export const MypageNotLoggedIn = () => {
	return (
		<NeedLogin>
			<Column>
				<Icon icon="pointIcon" size={32} css={iconP} />
				<MyPageLoginText>
					<span>수수료 없는 결제</span>와
				</MyPageLoginText>
				<MyPageLoginText>포인트 혜택까지!</MyPageLoginText>
			</Column>

			<Link
				to="/login"
				css={css`
					width: 95%;
					margin: 16px 0;
				`}
			>
				<Button filled large>
					로그인 및 회원가입
				</Button>
			</Link>
			<SpaceBorder />
			<Space column={16} />
		</NeedLogin>
	);
};
