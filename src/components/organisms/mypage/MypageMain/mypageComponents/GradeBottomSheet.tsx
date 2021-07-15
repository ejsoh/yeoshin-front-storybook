import { Column, Row } from "components/atoms/Grid";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { useInjection } from "hooks";
import { Icon } from "components/atoms/Icon/Icon";
import { MyPageDomain } from "pages/mypage/MyPage";
import React from "react";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";

const GradeBottomSheetContainer = styled.div`
	background-color: rgb(61 61 61 / 80%);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	height: 100%;
	width: 100%;
	overflow: hidden;
	animation: fadeOut 0.3s linear;
	@keyframes fadeOut {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
const GradeBottomSheetInnerContainer = styled.div`
	background-color: #fff;
	position: absolute;
	width: 100%;
	bottom: 0;
	z-index: 9999;
	border-radius: 16px 16px 0px 0px;
	overflow: hidden;
	animation: eventFadeIn 0.3s linear;
	@keyframes eventFadeIn {
		0% {
			bottom: -500px;
		}
		100% {
			bottom: 0;
		}
	}
`;

const GradeTab = styled.div`
	background-color: #fff;
	padding: 19px 16px;
	display: flex;
	justify-content: space-between;
`;

export const GradeBottomSheet = observer(() => {
	const { userInfoStore } = useInjection(mapper);
	const { closeGrade } = MyPageDomain();
	return (
		<GradeBottomSheetContainer onClick={closeGrade}>
			<GradeBottomSheetInnerContainer>
				<Column>
					<GradeTab>
						<Text left size={19}>
							등급별 조건
						</Text>
						<Icon
							event={closeGrade}
							css={css`
								filter: grayscale(100%);
								cursor: pointer;
							`}
							icon="close"
							size={15}
						/>
					</GradeTab>
					{userInfoStore.getUserGrade().grade.map(item => (
						<Row key={item.name}>
							<SpaceContainer column={24} row={24}>
								<Icon icon={item.rank} size={24} />
							</SpaceContainer>
							<Column>
								<Text size={15} left>
									{item.name}
								</Text>
								<Space column={6} />
								<Text left lightgray>
									{item.rank === "new"
										? "제한없음"
										: `4개월이내 리뷰개수 ${item.condition}개이상`}
								</Text>
							</Column>
						</Row>
					))}
				</Column>
			</GradeBottomSheetInnerContainer>
		</GradeBottomSheetContainer>
	);
});
