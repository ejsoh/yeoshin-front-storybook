import { Link, useHistory } from "react-router-dom";
import { useAuth, useInjection } from "hooks";

import { BasketCount } from "../mypage/MypageMain/MyPageComponents";
import { CartUrl } from "constantDatas/linkUrls";
import { Icon } from "components/atoms";
import React from "react";
import { Row } from "components/atoms/Grid";
import { SpaceContainer } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
import { ToggleEvent } from "components/molecules";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";

export type HeaderProps = {
	themes?: string;
	text?: string;
	color?: string;
	location?: string;
	isNav?: boolean;
	customLink?: JSX.Element;
};

const BasketContainer = styled.a`
	padding: 18px;
`;
const BasketInnerContainer = styled.div`
	position: relative;
	width: 20px;
	height: 20px;
	justify-content: center;
	align-items: center;
	display: flex;
`;
const CustomHeader = styled.div`
	text-align: center;
	box-sizing: border-box;
	font-size: 16px;
	display: flex;

	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	-webkit-transform-style: preserve-3d;
	padding-right: 7px;
	top: 0px;
	max-width: 1024px;
	margin: 0 auto;
	align-items: center;
	background-color: #fff;
	z-index: 99;
	width: 100%;
	min-width: 278px;
	position: fixed;
	border-bottom: 1px solid #f7f7f7;
	&::after {
		content: "";
	}
`;

const navStyle = css`
	border: 0;
	background-size: 10px 10px;
	padding-right: 40px !important;
`;

const UserWish = observer(() => {
	const { userInfoStore } = useInjection(mapper);

	const cartFormatter = React.useCallback(
		() =>
			parseInt(userInfoStore.getUserInfo().cartCnt) >= 100
				? "99+"
				: userInfoStore.getUserInfo().cartCnt,
		[userInfoStore.getUserInfo().cartCnt]
	);

	return (
		<BasketContainer href={CartUrl}>
			<BasketInnerContainer>
				<Icon icon="basket" />
				<BasketCount>{cartFormatter()}</BasketCount>
			</BasketInnerContainer>
		</BasketContainer>
	);
});

const Nav = ({ location }: { location?: string }) => {
	const history = useHistory();

	return (
		<ToggleEvent condition={location !== undefined && location !== ""}>
			<Link to={location ?? ""}>
				<Icon css={navStyle} icon="arrowLeftBlack" size={20} />
			</Link>
			<Icon
				icon="arrowLeftBlack"
				css={navStyle}
				size={20}
				event={history.goBack}
			/>
		</ToggleEvent>
	);
};

export const Header = ({
	text,
	location,
	isNav = true,
	customLink,
}: HeaderProps) => {
	const auth = useAuth();

	return (
		<>
			<CustomHeader>
				<Row
					between
					css={css`
						width: 100%;
						padding: 0 3px 0 20px;
						min-height: 56px;
					`}
				>
					<Row>
						<>{isNav && <Nav location={location} />}</>
						<Text weight={500} large>
							{text}
						</Text>
					</Row>
					<>{auth.user() && !isNav && <UserWish />}</>
					<>{customLink && customLink}</>
				</Row>
			</CustomHeader>
			<SpaceContainer column={30}></SpaceContainer>
		</>
	);
};

export const MainHeader = ({ icon }: { icon: JSX.Element }) => {
	const auth = useAuth();

	return (
		<>
			<CustomHeader>
				<Row between fullWidth>
					<SpaceContainer row={18} column={18}>
						<Icon
							event={() =>
								window.location.pathname !== "/" && (window.location.href = "/")
							}
							icon="yeoshinMainLogo"
						/>
					</SpaceContainer>

					<Row>
						<SpaceContainer row={12} column={12}>
							{icon}
						</SpaceContainer>
						<>{auth.user() && <UserWish />}</>
					</Row>
				</Row>
			</CustomHeader>
			<SpaceContainer column={30}></SpaceContainer>
		</>
	);
};

export const MyPageHeader = ({
	text,
	location,
	isNav = true,
	customLink,
}: HeaderProps) => {
	const auth = useAuth();

	return (
		<>
			<CustomHeader>
				<Row
					between
					css={css`
						width: 100%;
						padding: 0 3px 0 20px;
						min-height: 56px;
					`}
				>
					<Row as="a" href="https://yeoshin.co.kr">
						<Icon icon="arrowLeftBlack" css={navStyle} size={20} />
						<Text weight={500} large>
							{text}
						</Text>
					</Row>
					<>{auth.user() && <UserWish />}</>
					<>{customLink && customLink}</>
				</Row>
			</CustomHeader>
			<SpaceContainer column={30}></SpaceContainer>
		</>
	);
};
