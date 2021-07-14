import { Column, Row } from "components/atoms/Grid";
import { Space } from "components/atoms/Spacing";
import { useAuth, useInjection } from "hooks";
import { Icon } from "components/atoms/Icons/Icon";
import { KaKaoBtn } from "components/organisms/sns/KaKaoBtn";
import { mapper } from "models/RootStore";
import React from "react";
import { Text } from "components/atoms/Message";
import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";

const InviteContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const myPageGeneralMenu = [
	{
		icon: "findHospital",
		title: "병원목록",
		url: "/findHospitals",
	},
	{
		icon: "event",
		title: "여신이벤트",
		url: "/yeoshinEvents",
	},
];

export const MyPageGeneralMenuList = () => {
	const auth = useAuth();

	const onClick = () => {
		auth.user()
			? (window.location.href =
					"https://yeoshin.co.kr/?pn=product.receipt.form")
			: interactionStore.setIsAlert(
					"로그인 후 이용해 주세요.",
					() => (window.location.href = "/login")
			  );
	};

	const { interactionStore } = useInjection(mapper);
	return (
		<Row space={[20, 0]}>
			<Column fullWidth>
				<InviteContainer>
					<KaKaoBtn title={"친구초대"} icon={"invite"} />
				</InviteContainer>
			</Column>

			<Column fullWidth>
				<div onClick={onClick}>
					<Icon icon={"receipt"} size={48} />
					<Space column={4} />

					<Text size={11} center>
						영수증 후기
					</Text>
				</div>
			</Column>
			<>
				{myPageGeneralMenu.map(item => (
					<Column fullWidth key={item.icon}>
						<Link to={item.url}>
							<Icon icon={item.icon} size={48} />
							<Space column={4} />

							<Text size={11} center>
								{item.title}
							</Text>
						</Link>
					</Column>
				))}
			</>
		</Row>
	);
};
