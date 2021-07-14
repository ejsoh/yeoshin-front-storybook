import { Column, Row } from "components/atoms/Grid";
import { useAuth, useInjection } from "hooks";
import React, { useCallback } from "react";
import { Space, SpaceBorder, SpaceContainer } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { Icon } from "components/atoms";

const searchFilterList = [
	{ title: "추천순", filterValue: "추천순" },
	{ title: "신규순", filterValue: "신규순" },
	{ title: "리뷰순", filterValue: "리뷰순" },
	{ title: "가격순", filterValue: "가격순" },
	{ title: "거리순", filterValue: "거리순" },
];

export const SearchFilterBottomSheet = observer(() => {
	const { interactionStore } = useInjection(mapper);

	// NOTE : 팝업닫기
	const closePopup = () => {
		interactionStore.setIsSearchtFilterShow(false);
	};
	// NOTE : 필터설정 후 팝업닫기
	const clickFilterMenu = (filterValue: string) => {
		interactionStore.setSearchFilter(filterValue);
		interactionStore.setIsSearchtFilterShow(false);
	};
	return (
		<FilterBackground>
			<FilterContainer>
				<SpaceContainer row={16} column={14}>
					<Column>
						<Row between>
							<Text size={19}>정렬방법</Text>
							<Icon icon="close_black" size={24} event={closePopup} />
						</Row>
					</Column>
					<Space column={14} />
					{searchFilterList.map((item: any, index: number) => (
						<SpaceContainer key={index} column={17}>
							{interactionStore.searchFilter == item.title ? (
								<Row onClick={() => clickFilterMenu(item.filterValue)}>
									<Icon icon={"radioButtonOn"} size={20} />
									<Space row={28} />
									<Text size={15} pink>
										{item.title}
									</Text>
								</Row>
							) : (
								<Row onClick={() => clickFilterMenu(item.filterValue)}>
									<Icon icon={"radioButtonOff"} size={20} />
									<Space row={28} />
									<Text size={15}>{item.title}</Text>
								</Row>
							)}
						</SpaceContainer>
					))}
				</SpaceContainer>
			</FilterContainer>
		</FilterBackground>
	);
});

const FilterBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100vw;
	height: 100vh;
	background-color: rgba(61, 61, 61, 0.8);
	display: flex;
	align-items: flex-end;
`;

const FilterContainer = styled.div`
	z-index: 9998;
	width: 100%;
	background-color: white;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
	animation: SlideFromBottom 0.3s linear;
	-webkit-animation: SlideFromBottom 0.3s linear;
	-o-animation: SlideFromBottom 0.3s linear;
	@keyframes SlideFromBottom {
		0% {
			transform: translateY(336px);
		}
		100% {
			transform: translateY(0);
		}
	}
`;
