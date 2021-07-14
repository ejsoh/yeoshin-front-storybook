import { Column, Row } from "components/atoms/Grid";
import { useAuth, useInjection } from "hooks";

import React, { useCallback } from "react";
import { RecentlyKeywordItem } from "./searchComponents/RecentlyKeywordItem";
import { RecommendKeyword } from "./searchComponents/RecommendKeyword";
import { SearchDomain } from "pages/main/MainDomain";
import { SearchInput } from "./searchComponents/SearchInput";
import { SpaceBorder } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
import { TitleLabel } from "../main/mainComponents/TitleLabel";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useSwipeable } from "react-swipeable";
import { SearchResult } from "./searchComponents/SearchResult";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import { SearchFilterBottomSheet } from "./searchComponents/SearchFilterBottomSheet";

const SearchContainer = styled.div`
	top: 0;
	bottom: 0;
	position: fixed;
	overflow-y: scroll;
	overflow-x: hidden;
`;

const fadeIn = css`
	z-index: 9999;
	top: 0;
	width: 100%;
	background-color: #fff;
	left: 0;
	animation: searchFadeIn 0.3s linear;
	@keyframes searchFadeIn {
		0% {
			left: 100%;
		}
		100% {
			left: 0;
		}
	}
`;
const fadeOut = css`
	z-index: 9999;
	top: 0;
	width: 100%;
	background-color: #fff;
	left: 100%;
	transition: 0.3s;
`;

export const SearchContents = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { deleteKeyword } = SearchDomain();

	const auth = useAuth();

	const goBack = useCallback(() => {
		(document.activeElement as HTMLElement).blur();
		interactionStore.setPopUpEventShow(false);
	}, [interactionStore.getPopEventShow()]);

	const handlers = useSwipeable({
		onSwipedRight: e => goBack(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: false,
	});
	const deleteKeywordEvent = () => {
		return () => {
			deleteKeyword();
		};
	};
	return (
		<SearchContainer
			css={interactionStore.getPopEventShow() ? fadeIn : fadeOut}
		>
			<SearchInput />
			<Column
				styles={`position: relative;
				`}
			>
				{auth.user() &&
					fetchStore.fetchStore().recentlyKeyword &&
					fetchStore.fetchStore().recentlyKeyword.length !== 0 && (
						<>
							<TitleLabel
								title="최근 검색어"
								rightContents={
									<Text onClick={deleteKeywordEvent} lightgray>
										전체삭제
									</Text>
								}
							/>
							<Row isScroll>
								{fetchStore.fetchStore().recentlyKeyword &&
									fetchStore
										.fetchStore()
										.recentlyKeyword.map((item: string) => (
											<RecentlyKeywordItem key={item} name={item} />
										))}
							</Row>
						</>
					)}
				{interactionStore.isSearchResultShow ? (
					<SearchResult />
				) : (
					<Column {...handlers}>
						<SpaceBorder />
						<RecommendKeyword />
					</Column>
				)}
				<OnlyTruthyShow condition={interactionStore.isSearchFilterShow}>
					<SearchFilterBottomSheet />
				</OnlyTruthyShow>
			</Column>
		</SearchContainer>
	);
});
