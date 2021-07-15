import {
	GradeBottomSheet,
	MyPageBanner,
	MyPageColumnMenu,
	MyPageGeneralMenuList,
	ServicePartnerBanner,
} from "./MyPageComponents";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import React from "react";
import { Row } from "components/atoms/Grid";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const serviceCenterContainer = css`
	background: #f7f7f7;
`;

export const MypageContents = observer(() => {
	const { userInfoStore } = useInjection(mapper);
	return (
		<SpaceContainer row={15}>
			<MyPageBanner />
			<MyPageGeneralMenuList />
			<Space column={40} />
			<Row isWrap space={[12, 16]} between css={serviceCenterContainer}>
				<Text pink>고객센터</Text>
				<Text>평일(월~금) 오전 10시~오후 5시 운영</Text>
			</Row>
			<SpaceContainer column={10}>
				<MyPageColumnMenu />
			</SpaceContainer>
			<ServicePartnerBanner />
			<Space column={28} />
			<OnlyTruthyShow condition={userInfoStore.getUserGrade().isShow}>
				<GradeBottomSheet />
			</OnlyTruthyShow>
		</SpaceContainer>
	);
});
