import { useAuth } from "hooks";
import { Button } from "components/atoms";
import React from "react";
import { getCookie } from "services/utils/cookies";
import { pngImage } from "components/atoms/Icon/Icon";
import styled from "@emotion/styled/macro";
import { getQueryParam } from "helper";

const MemberjoinComPage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	height: 100vh;
`;

const ButtonBotton = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	button {
		height: 56px;
		border-radius: 0;
		border: 0;
	}
`;
const LocalImgwrap = styled.div`
	display: block;
	position: absolute;
	top: 37px;
	right: 0;
	left: 0;
	margin: auto;
	width: 75px;
	height: 20px;
`;

const Content = styled.div`
	font-size: 32px;
	color: #ff4e84;
	line-height: 36px;
	letter-spacing: -1.6px;
	font-weight: 300;
	white-space: pre-line;
`;

const Desc = styled.div`
	margin-top: 13px;
	font-size: 16px;
	color: #999;
	line-height: 20px;
	font-weight: 300;
	letter-spacing: -0.8px;
`;

const MemberJoinComPage = ({ ...rest }) => {
	const name = getQueryParam("id");
	const auth = useAuth();

	const goLogin = () => {
		const token = getCookie("accessToken");
		const isLoginSuccess = token !== undefined;

		return auth.signIn(() => {
			window.location.replace("https://yeoshin.co.kr/");
		}, isLoginSuccess);
	};
	return (
		<MemberjoinComPage {...rest}>
			<LocalImgwrap>
				<img src={pngImage("logo")} alt="" />
			</LocalImgwrap>
			<Content>
				{`${name} 여신님, 
				회원가입을 축하합니다.`}
			</Content>
			<Desc>
				신규가입 쿠폰이 발급되었습니다. <br />
				지금 바로 병의원 이벤트에서 사용하세요!
			</Desc>
			<ButtonBotton>
				<Button onClick={() => goLogin()} filled>
					로그인
				</Button>
			</ButtonBotton>
		</MemberjoinComPage>
	);
};

export default MemberJoinComPage;
