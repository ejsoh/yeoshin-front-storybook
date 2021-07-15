import { useAuth, useFormHandler, useInjection } from "hooks";
import { Icon } from "components/atoms";
import { InputWrap } from "components/molecules";
import React, { useCallback } from "react";
import { SearchDomain } from "pages/main/MainDomain";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { searchLinkUrl } from "constantDatas/linkUrls";
import styled from "@emotion/styled/macro";
import { searchKeyword } from "services/utils/analystics/googleAnalystics";
import { Column, Row } from "components/atoms/Grid";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { SelectedMenu } from "components/molecules/menu/SelectedMenu";
import { Text } from "components/atoms/Text";
import { useState } from "react";
import { UnSelectedMenu } from "components/molecules/menu/UnSelectedMenu";
import { Divider } from "components/atoms/Divider/Divider";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const MainSearchContainer = styled.div`
	position: sticky;
	top: 0;
	left: 0;
	box-sizing: border-box;
	background-color: #fff;
	z-index: 9999;
	padding: 10px 0;
`;

export const SearchInputContainer = styled.div`
	margin: 16px;
	background-color: #fff;

	img {
		filter: invert(0%) sepia(1%) saturate(4%) hue-rotate(320deg) brightness(96%)
			contrast(104%);
	}
	&:focus-within {
		.close {
			filter: invert(48%) sepia(56%) saturate(2375%) hue-rotate(310deg)
				brightness(92%) contrast(104%);
		}
	}
`;

export const SearchInput = observer(() => {
	const { interactionStore } = useInjection(mapper);

	const auth = useAuth();

	const goBack = () => {
		interactionStore.setPopUpEventShow(false);
		interactionStore.setIsSearchResultShow(false);
		(document.activeElement as HTMLElement).blur();
	};

	const formValue = useFormHandler({
		setValue: {
			keyword: e => {
				interactionStore.setInputValue({ keyword: e });
			},
		},
		getValue: {
			keyword: interactionStore.getInputValues().keyword ?? "",
		},
		event: (e, value) => enterEvent(e),
	});

	const enterEvent = useCallback(
		(e: React.KeyboardEvent) => {
			const keyword = interactionStore.getInputValues().keyword;
			if (e.key === "Enter") {
				searchKeyword(keyword);
				interactionStore.setIsSearchResultShow(true);

				// auth.user()
				// 	? setSearchKeyword(keyword)
				// 	: (window.location.href = searchLinkUrl(keyword));
			}
		},
		[interactionStore.getInputValues().keyword]
	);

	const emptyInput = useCallback(() => {
		interactionStore.setInputValue({ keyword: "" });
		interactionStore.setIsSearchResultShow(false);
	}, [interactionStore.getInputValues().keyword !== ""]);

	const { getFormProps } = formValue;

	const searchSubMenu = [
		{ title: "이벤트" },
		{ title: "영상" },
		{ title: "병원" },
	];
	const [menuIndex, setMenuIndex] = useState<number>(0);

	// NOTE : 모바일 예약가능 정렬
	const [isReservationSort, setIsReservationSort] = useState<boolean>(false);
	const reservationStatusClick = useCallback(() => {
		if (!isReservationSort) {
			setIsReservationSort(!isReservationSort);
		} else {
			// NOTE : 초기화

			setIsReservationSort(!isReservationSort);
		}
	}, [isReservationSort]);

	// NOTE : 필터 오픈
	const FilterClick = () => {
		interactionStore.setIsSearchtFilterShow(true);
	};

	// NOTE : 결과창 메뉴 선택
	// TODO : 할일
	const SeachResultMenuClick = (index: number) => {
		interactionStore.setSearchResultMenu(searchSubMenu[index].title);
	};

	return (
		<MainSearchContainer>
			<SearchInputContainer>
				<InputWrap
					beforeIcon={
						<Icon
							event={goBack}
							css={css`
								padding: 13px;
							`}
							size={14}
							icon="arrowLeftBlack"
						/>
					}
					placeholder="어떤 시술을 찾으세요?"
					afterIcon={<Icon size={14} event={emptyInput} icon="close" />}
					isFocus={interactionStore.getPopEventShow()}
					{...getFormProps("keyword")}
				/>
			</SearchInputContainer>
			<OnlyTruthyShow condition={interactionStore.isSearchResultShow}>
				<Column>
					<SpaceContainer row={16} borderBottom={"#E6E6E6"}>
						<Row>
							{searchSubMenu.map((item: any, index: number) => (
								<>
									{interactionStore.searchResultMenu ==
									searchSubMenu[index].title ? (
										<SelectedMenu
											key={index}
											title={item.title}
											onClick={() => SeachResultMenuClick(index)}
											margin={[0, 20, 0, 0]}
										/>
									) : (
										<UnSelectedMenu
											key={index}
											title={item.title}
											onClick={() => SeachResultMenuClick(index)}
											margin={[0, 20, 0, 0]}
										/>
									)}
								</>
							))}
						</Row>
					</SpaceContainer>
					<Space column={12} />
					<SpaceContainer row={16} column={8}>
						<Row between>
							<Text size={13} lightgray>
								총 1,020 개
							</Text>
							<OnlyTruthyShow
								condition={interactionStore.searchResultMenu == "이벤트"}
							>
								<Row>
									<Row onClick={reservationStatusClick}>
										{isReservationSort ? (
											<Icon icon="checkOvalOn" size={20} />
										) : (
											<Icon icon="checkOvalOff" size={20} />
										)}
										<Space row={9} />
										<Text>모바일 예약</Text>
									</Row>
									<Space row={15} />
									<Divider height={13} width={2} backgroundColor={"#E6E6E6"} />
									<Space row={15} />
									<Row onClick={FilterClick}>
										<Icon icon="sort" size={20} />
										<Space row={6} />
										<Text>추천순</Text>
									</Row>
								</Row>
							</OnlyTruthyShow>
						</Row>
					</SpaceContainer>
				</Column>
			</OnlyTruthyShow>
		</MainSearchContainer>
	);
});
