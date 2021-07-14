import { Button, Icon } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import { CouponAndEventArea, MainIconContainer } from "./MyPageComponents";
import React from "react";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { Link } from "react-router-dom";
import { Text } from "components/atoms/Message";
import { MyPageDomain } from "pages/mypage/MyPage";
import { NumberText } from "components/atoms/Typo/Typo";
import { ellipsis } from "helper";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";

type Grade = { grade: string };

const InfoBox = styled(Column)`
	border: 1px solid rgba(61, 61, 61, 0.1);
	box-sizing: border-box;
	border-radius: 4px;
	overflow: hidden;
`;
const PointListContainer = styled(Row)`
	margin: 0 16px;
	padding: 14px 0;
`;

const ExchangeButton = styled(Button)`
	min-width: auto !important;
	padding: 0 12px;
	width: auto;
	margin: 4px 0;
`;

const UserImageContainer = styled.div<Grade>`
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 32px;
	height: 32px;
	${props =>
		props.grade &&
		`background: url(images/icons/${props.grade}.svg) no-repeat center
		center`};
	background-size: cover;
`;

export const MyPageLoggedIn = observer(() => {
	const { userInfoStore } = useInjection(mapper);
	const { getGrade } = MyPageDomain();

	const maxCount = (number: string) => {
		return number.length > 2 ? "99+" : number;
	};
	return (
		<SpaceContainer row={15}>
			<Row between space={[18, 0]}>
				<Row>
					<UserImageContainer
						grade={userInfoStore.getUserInfo().rank}
						onClick={getGrade}
					/>
					<Space row={10} />
					<Column>
						<Text size={15} gray left>
							{ellipsis(userInfoStore.getMyPageInfo().name, 9, "...")}
						</Text>
						<Text lightgray left size={11}>
							{userInfoStore.getMyPageInfo().mgsName}님
						</Text>
					</Column>
				</Row>

				<Link to="/modifyUserInfo">
					<Button round gray padding={4} minWidth={73}>
						<Text gray>정보수정</Text>
					</Button>
				</Link>
			</Row>

			<InfoBox>
				<PointListContainer between isWrap borderBottom={"#f7f7f7"}>
					<Link to="/pointList">
						<Row space={[10, 0]}>
							<Text size={29} bold lightgray>
								P
							</Text>
							<Space row={8} />
							<NumberText size={29} bold>
								{userInfoStore.getMyPageInfo().point}
							</NumberText>
						</Row>
					</Link>
					<Column>
						<CouponAndEventArea
							title={"보유 쿠폰"}
							value={maxCount(`${userInfoStore.getMyPageInfo().couponCnt}`)}
							unit={"장"}
							// link={"/coupon"}
							link={
								"https://yeoshin.co.kr/?_mobilemode=chk&pn=mypage.coupon.list"
							}
						/>
						<CouponAndEventArea
							title={"찜 이벤트"}
							value={maxCount(`${userInfoStore.getMyPageInfo().wishCnt}`)}
							unit={"건"}
							link={"/myWishList"}
						/>
					</Column>
				</PointListContainer>

				<MainIconContainer count={userInfoStore.getMyPageInfo().payCnt} />

				<Row
					space={[6, 16]}
					between
					isWrap
					styles={`
						background-color: #f7f7f7;
					`}
				>
					<Text left lightgray bold>
						전환가능 포인트
					</Text>
					<Link to="/myPoint">
						<ExchangeButton round gray>
							<Row>
								<Text bold lightgray>
									P
								</Text>
								<NumberText bold padding={"0 3"}>
									{userInfoStore.getMyPageInfo().action}
								</NumberText>
								<Icon size={10} icon={"grayRightArrow"}></Icon>
							</Row>
						</ExchangeButton>
					</Link>
				</Row>
			</InfoBox>
			<Space column={8} />
		</SpaceContainer>
	);
});
