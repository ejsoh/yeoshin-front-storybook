import { Column, Row } from "components/atoms/Grid";
import { Link } from "react-router-dom";
import { Space } from "components/atoms/Spacing";
import { Icon } from "components/atoms/Icon/Icon";
import React from "react";
import { Text } from "components/atoms/Text";
import styled from "@emotion/styled/macro";
import { Countcommon } from "./commonStyle";
import { useInjection } from "hooks";
import { mapper } from "models/RootStore";
import { NumberText } from "components/atoms/Typo/Typo";

const MyPageIconData = [
	{
		icon: "check",
		title: "결제내역",
		url: "",
		link: "https://yeoshin.co.kr/?pn=mypage.order.list",
	},
	{
		icon: "pencil",
		title: "MY후기",
		url: "",
		link: "https://yeoshin.co.kr/?pn=mypage.review.list",
	},
	{
		icon: "question",
		title: "문의내역",
		url: "",
		link: "https://yeoshin.co.kr/?pn=mypage.posting.list",
	},
	{
		icon: "like",
		title: "단골병원",
		url: "/myHospitals",
	},
];
const PayCount = styled.div`
	${Countcommon}
	left: 26px;
`;

const CountBadge = styled(NumberText)`
	background-color: #ef4b81;
	width: auto;
	position: absolute;
	padding: 2px 5px;
	border-radius: 50px;
	right: -5px;
	top: -5px;
`;
const Container = styled.div`
	position: relative;
`;

export const MainIconContainer = ({ count }: { count: string }) => {
	const { userInfoStore } = useInjection(mapper);
	return (
		<Row evenly space={[19, 0]}>
			{MyPageIconData.map(item =>
				item.link ? (
					<a href={item.link} key={item.icon}>
						<Column>
							<Container>
								<Icon size={32} icon={item.icon} />
								{item.icon === "check" && (
									<CountBadge size={12} white>
										{userInfoStore.getMyPageInfo().payCnt}
									</CountBadge>
								)}
							</Container>
							<Space column={8} />
							<Text size={11} center>
								{item.title}
							</Text>
						</Column>
					</a>
				) : (
					<Link to={item.url} key={item.icon}>
						<Column>
							<Container>
								<Icon size={32} icon={item.icon} />
								{item.icon === "check" && (
									<CountBadge size={12} white>
										{userInfoStore.getMyPageInfo().payCnt}
									</CountBadge>
								)}
							</Container>
							<Space column={8} />
							<Text size={11} center>
								{item.title}
							</Text>
							{item.icon === "check" && <PayCount>{count}</PayCount>}
						</Column>
					</Link>
				)
			)}
		</Row>
	);
};
