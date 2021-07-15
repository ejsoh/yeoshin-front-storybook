import { Icon } from "components/atoms";
import { KAKAOTALK_ID } from "constantDatas/snsLoginInfo";
import React from "react";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useAuth, useInjection } from "hooks";
import { mapper } from "models/RootStore";
const InviteDescription = styled.div`
	color: #fff;
	background-color: #3d3d3d;
	font-size: 13px;
	display: flex;
	position: absolute;
	flex-wrap: nowrap;
	bottom: -40px;
	left: 0;
	padding: 8px;
	white-space: pre;
	align-items: center;
	border-radius: 4px;
	&::after {
		content: "";
		width: 8px;
		height: 8px;
		position: absolute;
		top: -6px;
		left: 18px;
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-bottom: 8px solid #3d3d3d;
	}
`;

export const KaKaoBtn = ({ icon, title }: { icon: string; title: string }) => {
	const { userInfoStore, interactionStore } = useInjection(mapper);
	const auth = useAuth();
	const shareKakaoLink = () => {
		if (window.Kakao) {
			const kakao = window.Kakao;
			if (!kakao.isInitialized()) {
				kakao.init(KAKAOTALK_ID);
			}
			!auth.user()
				? interactionStore.setIsAlert(
						"로그인 후 이용해 주세요.",
						() => (window.location.href = "/login")
				  )
				: kakao.Link.sendCustom({
						templateId: 49023,
						installTalk: true,
						templateArgs: {
							name: userInfoStore.getMyPageInfo().name,
							friendid: userInfoStore.getUserInfo().id,
						},
				  });
		}
	};

	return (
		<div
			css={css`
				position: relative;
			`}
			className="kakao_share"
			onClick={shareKakaoLink}
		>
			<Icon icon={icon} size={48} />
			<Space column={4} />

			<Text size={11} center>
				{title}
			</Text>
			<InviteDescription>
				추천하고 서로 <Text pink>5,000</Text>점 바로적립!
			</InviteDescription>
		</div>
	);
};
