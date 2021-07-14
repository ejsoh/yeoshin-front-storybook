import { Column, Row } from "components/atoms/Grid";
import { Icon } from "components/atoms";
import React, { useCallback } from "react";
import styled from "@emotion/styled/macro";
import { useHistory } from "react-router-dom";
import { Text } from "components/atoms/Message";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const FooterContainer = styled(Row)`
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 1024px;
	background-color: #fff;
	height: 68px;
	transition: 0.3s;
	z-index: 99;
	border-top: 1px solid #f7f7f7;
`;
const NavContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	${Column} {
		position: relative;
	}
`;

const NavItemContainer = styled.div`
	background-color: #fff;
	overflow: hidden;
	left: 0;
	height: 30px;
	z-index: 9;
	bottom: 25px;
	position: absolute;
	width: 100%;
	transition: 0.3s;
	align-items: center;
	display: flex;
	justify-content: center;
`;

const FooterText = styled(Text)`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 8px;
	display: flex;
	width: 100%;
`;

export const navData = [
	{
		title: "시술맵",
		icon: "nav_location",
		url: "/skinMap",
	},
	{
		title: "이벤트",
		icon: "nav_event",
		url: "/event",
	},
	{ title: "홈", icon: "nav_home", url: "/" },
	{
		title: "시술후기",
		icon: "nav_review",
		location: "https://yeoshin.co.kr/?pn=service.review",
	},
	{ title: "MY", icon: "nav_mypage", url: "/myPage" },
];

const Footer = ({ currentPath }: { currentPath: string }) => {
	const isShowFooter = navData.some(item => item.url === currentPath);
	const history = useHistory();

	const hasValue = useCallback(
		(item: { [key: string]: string | undefined }) =>
			Object.values(item).includes(currentPath),
		[currentPath]
	);

	const onClick = useCallback(
		(location?: string, url?: string) => {
			return () =>
				location
					? (window.location.href = location)
					: url !== currentPath && history.push(url ?? "");
		},
		[currentPath]
	);
	return (
		<OnlyTruthyShow condition={isShowFooter}>
			<FooterContainer around>
				{navData.map(item => (
					<NavContainer
						key={item.icon}
						onClick={onClick(item.location, item.url)}
					>
						<Column fullWidth>
							<NavItemContainer>
								<Icon
									color={hasValue(item) ? "pink" : "lightgray"}
									size={28}
									icon={item.icon}
								/>
							</NavItemContainer>

							<FooterText size={11} lightgray pink={hasValue(item)}>
								{item.title}
							</FooterText>
						</Column>
					</NavContainer>
				))}
			</FooterContainer>
		</OnlyTruthyShow>
	);
};

export default Footer;
