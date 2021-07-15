import { useHistory } from "react-router-dom";
import {
	faceBookInit,
	faceBookLoginHelper,
	kakaoLoginHelper,
	naverLoginHelper,
} from "helper/snsHelper";
import AppleLogin from "react-apple-login";
import React, { useCallback } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Icon, pngImage } from "components/atoms/Icon/Icon";
import styled from "@emotion/styled/macro";
import { useAuth } from "hooks";
import { naverInitial } from "helper/snsHelper/naverLogin";
import { deviceInfo } from "services/utils/checkUserInfoEntity";

const Img = css`
	width: 55px;
	height: 55px;
	display: flex;
	overflow: hidden;
`;

export const SnsLoginContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	justify-content: space-evenly;
	max-width: 320px;
	padding-top: 40px;
	margin: 0 auto;
`;

const Naver = styled.div`
	margin: 0 7px;
	img {
		${Img}
	}
	#naverIdLogin {
		visibility: hidden;
	}
`;
const Kakao = styled.a`
	margin: 0 7px;
	img {
		${Img}
	}
`;
const Facebook = styled.div`
	margin: 0 7px !important;
	cursor: pointer;
	img {
		${Img}
	}
	&:span > iframe {
		opacity: 0 !important;
		width: 55px !important;
		height: 55px !important;
	}
`;
const Apple = styled.div`
	border-radius: 30px;
	background: #fff;
	overflow: hidden;
`;

const unCheckedIcon = css`
	opacity: 0.3;
	-webkit-filter: grayscale(100%);
	filter: grayscale(100%);
`;

export const SnsContainer = ({
	naver = true,
	kakao = true,
	facebook = true,

	...rest
}: {
	naver?: boolean;
	kakao?: boolean;
	facebook?: boolean;
}) => {
	const history = useHistory();
	const auth = useAuth();
	const device = deviceInfo();

	React.useEffect(() => {
		naverLoginHelper(history, auth, "login");

		!device.isInapp && faceBookInit();
	}, [auth, history]);

	const kakaoLogin = useCallback(() => {
		device.isInapp
			? window.location.replace(`${window.location.origin}/SnsLoading/kakao`)
			: kakaoLoginHelper(history, auth);
	}, []);

	const faceBookLogin = useCallback(() => {
		device.isInapp
			? window.location.replace(`${window.location.origin}/SnsLoading/facebook`)
			: faceBookLoginHelper(history, auth).getStatus();
	}, []);

	return (
		<SnsLoginContainer {...rest}>
			{!device.isAos && (
				<Apple>
					<AppleLogin
						clientId="com.ghsoft.ios.GoddessTicket.Web"
						redirectURI={`${window.location.origin}/appleLogin`}
						responseType="id_token code"
						responseMode="fragment"
						render={({ onClick }) => (
							<Icon icon="WhiteLogoSquare" event={onClick} size={70} />
						)}
					/>
				</Apple>
			)}

			<Naver
				css={css`
					${!naver && unCheckedIcon}
				`}
				id="naverIdLogin"
			></Naver>

			<Kakao
				id="custom-login-btn"
				css={css`
					${!kakao && unCheckedIcon}
				`}
				onClick={kakaoLogin}
			>
				<img src={pngImage("sns_talk")} />
			</Kakao>

			<Facebook
				css={css`
					${!facebook && unCheckedIcon}
				`}
				className="fb-login-button"
				data-size="large"
				id="fb-root"
				data-width=""
				data-button-type="continue_with"
				data-layout="default"
				data-auto-logout-link="false"
				data-use-continue-as="false"
				onClick={faceBookLogin}
			>
				<img src={pngImage("sns_facebook")} />
			</Facebook>
		</SnsLoginContainer>
	);
};

export const ConnectSns = ({
	naver = false,
	kakao = false,
	facebook = false,
	apple = false,
	isGetId,
	...rest
}: {
	naver?: boolean;
	kakao?: boolean;
	facebook?: boolean;
	apple?: boolean;
	isGetId: (id: string, type: string) => void;
}) => {
	const history = useHistory();
	const auth = useAuth();
	const device = deviceInfo();

	React.useEffect(() => {
		naverInitial();

		!device.isInapp && faceBookInit();
	}, [auth, history]);

	const kakaoLoginConnect = useCallback(() => {
		device.isInapp
			? history.push(`${window.location.origin}/SnsLoading/kakao`)
			: kakaoLoginHelper(history, auth, (id: string, type: string) =>
					isGetId(id, type)
			  );
	}, []);

	const facebookLoginConnect = useCallback(() => {
		device.isInapp
			? history.push(`${window.location.origin}/SnsLoading/facebook`)
			: faceBookLoginHelper(history, auth, (id: string, type: string) =>
					isGetId(id, type)
			  ).getStatus();
	}, []);

	return (
		<SnsLoginContainer {...rest}>
			{!device.isAos && (
				<Apple>
					<AppleLogin
						clientId="com.ghsoft.ios.GoddessTicket.Web"
						redirectURI={`${window.location.origin}/appleLogin`}
						responseType="id_token code"
						responseMode="fragment"
						render={({ onClick }) => (
							<Icon
								icon="WhiteLogoSquare"
								css={css`
									${!apple && unCheckedIcon}
								`}
								event={onClick}
								size={70}
							/>
						)}
					/>
				</Apple>
			)}
			<Naver
				css={css`
					${!naver && unCheckedIcon}
				`}
				id="naverIdLogin"
			></Naver>

			<Kakao
				id="custom-login-btn"
				css={css`
					${!kakao && unCheckedIcon}
				`}
				onClick={kakaoLoginConnect}
			>
				<img src={pngImage("sns_talk")} />
			</Kakao>

			<Facebook
				css={css`
					${!facebook && unCheckedIcon}
				`}
				className="fb-login-button"
				data-size="large"
				id="fb-root"
				data-width=""
				data-button-type="continue_with"
				data-layout="default"
				data-auto-logout-link="false"
				data-use-continue-as="false"
				onClick={facebookLoginConnect}
			>
				<img src={pngImage("sns_facebook")} />
			</Facebook>
		</SnsLoginContainer>
	);
};
