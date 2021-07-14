import { Column, Row } from "components/atoms/Grid";
import { Space } from "components/atoms/Spacing";
import { useAuth } from "hooks";
import { Icon } from "components/atoms/Icons/Icon";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { interactionStore } from "models/stores";
import { useHistory } from "react-router-dom";

const myPageColumnMenu = [
	{
		icon: "book",
		title: "이용 가이드",
		url: "/yeoshinGuide",
	},
	{
		icon: "headPhone",
		title: "상담내역",
		url: "/myConsult",
	},
	{
		icon: "faq",
		title: "FAQ",
		url: "/oftenQuestions",
	},
	{
		icon: "notice",
		title: "공지사항",
		url: "/notice",
	},
];

export const MyPageColumnMenu = () => {
	const auth = useAuth();
	const history = useHistory();
	const onClick = (title: string, url: string) => {
		return () =>
			title === "상담내역" && !auth.user()
				? interactionStore.setIsAlert(
						"로그인 후 이용해 주세요.",
						() => (window.location.href = "/login")
				  )
				: history.push(url);
	};
	return (
		<Column
			css={css`
				img {
					height: 20px;
					width: 20px;
				}
			`}
		>
			{myPageColumnMenu.map(item => (
				<div onClick={onClick(item.title, item.url)} key={item.icon}>
					<Row space={[12, 11]}>
						<Icon size={20} icon={item.icon} />
						<Space row={12} />
						<NumberText size={15} weight={400}>
							{item.title}
						</NumberText>
					</Row>
				</div>
			))}
		</Column>
	);
};
