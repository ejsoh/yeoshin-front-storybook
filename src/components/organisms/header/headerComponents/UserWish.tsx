import { Icon } from "components/atoms";
import { BasketCount } from "components/organisms/mypage/MypageMain/MyPageComponents";
import { useInjection } from "hooks";
import { observer } from "mobx-react-lite";
import { mapper } from "models/RootStore";
import React from "react";
import { CartUrl } from "constantDatas/linkUrls";
import styled from "@emotion/styled/macro";

export const UserWish = observer(() => {
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
