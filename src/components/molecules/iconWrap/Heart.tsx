import { Icon, InteractionIcon } from "components/atoms";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { ToggleEvent } from "components/molecules";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import heartIcon from "assets/jsonIcons/heart.json";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { UserDomain } from "pages/skinMap/userDomain";
import { AUTH_TOKEN } from "services/utils/requestConfig";

const HeartContainer = styled.div`
	justify-content: flex-end;
	display: flex;
	height: 23px;
	margin-right: 2.12px;
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	padding: 7px;
`;
const emptyHeart = css`
	width: 26.22px;
	height: 26px;
`;

const mapper = ({ userInfoStore, interactionStore }: RootStoreModel) => ({
	userInfoStore,
	interactionStore,
});
export const HeartIcon = observer(({ code }: { code: string }) => {
	const { userInfoStore, interactionStore } = useInjection(mapper);
	const { hospitalAddLike, hospitalDisLike } = UserDomain();
	const recommendHospital = () => {
		!AUTH_TOKEN
			? interactionStore.setIsAlert(
					"로그인 후 이용해 주세요.",
					() => (window.location.href = "/login")
			  )
			: userInfoStore.getUserLikeList().indexOf(code) >= 0
			? hospitalDisLike(code)
			: hospitalAddLike(code);
	};
	return (
		<HeartContainer onClick={() => recommendHospital()}>
			<ToggleEvent
				condition={userInfoStore.getUserLikeList().indexOf(code) >= 0}
			>
				<InteractionIcon
					jsonIcon={heartIcon}
					loop={false}
					iconHeight={"23"}
					iconWidth={"26"}
				/>
				<Icon icon="emptyHeart" size={20} css={emptyHeart}></Icon>
			</ToggleEvent>
		</HeartContainer>
	);
});
