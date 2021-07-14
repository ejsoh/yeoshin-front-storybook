import { Button, Icon, InteractionIcon, SpinIcon } from "components/atoms";
import { ButtonWrap, Swipe, ToggleEvent } from "components/molecules";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Row } from "components/atoms/Grid";
import { alternative } from "helper";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { filterChips } from "pages/skinMap";
import loadingDot from "assets/jsonIcons/loadingDot.json";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { skinMapStore } from "models/stores";

type SkinMapFilter = {
	reSearch: () => void;
	filterEvent: (item: string) => void;
};

const hiddenSearchButton = css`
	flex-wrap: nowrap;
	position: relative;
	left: 0px;
	animation: width 0.5s linear;
	position: relative;
	& > div:first-of-type {
		z-index: 999;
		margin-right: 8px;
	}
`;

const showSearchButton = css`
	flex-wrap: nowrap;
	position: relative;
	left: -130px;
	transition: 0.5s;

	position: relative;
	& > div:first-of-type {
		z-index: 999;
	}
`;

const loading = css`
	width: 111px;
	background: #ef4b81;
	border-radius: 100px;
	align-items: center;
	justify-content: center;
	z-index: 999;

	& > * {
		z-index: 999;
	}
`;

const searchContainer = css`
	z-index: 999;
	width: 111px;
`;

const searchArea = css`
	z-index: 999;
	font-size: 13px;
	padding: 5px 0;
`;

const customButton = css`
	padding: 6px 12px;
	box-sizing: border-box;
	margin-right: 8px;
	min-height: 30px;
	font-size: 13px;
	z-index: 9;
	img {
		margin-right: 5px;
	}
`;

const filterHidden = css`
	position: relative;
	margin-left: 20px;
	z-index: 9;
`;
const fiilterShow = css`
	position: relative;
	z-index: 9;
	padding-left: 5px;
`;

const mapper = ({ skinMapStore, interactionStore }: RootStoreModel) => ({
	skinMapStore,
	interactionStore,
});

// 시술맵 필터
export const SkinMapFilter = observer(
	({ reSearch, filterEvent }: SkinMapFilter) => {
		const { interactionStore } = useInjection(mapper);
		return (
			<Row
				isOverFlow
				css={css`
					padding: 0 0.9em;
					${alternative({
						is: interactionStore.getIsShow(),
						truthy: hiddenSearchButton,
						falsy: showSearchButton,
					})}
				`}
			>
				{interactionStore.getIsShow() ? (
					<ButtonWrap css={searchContainer}>
						<Button filled round medium onClick={reSearch} css={searchArea}>
							<SpinIcon name="refresh"></SpinIcon>이 지역검색
						</Button>
					</ButtonWrap>
				) : (
					<ButtonWrap css={loading}>
						<InteractionIcon
							jsonIcon={loadingDot}
							iconHeight={"36"}
							iconWidth={"60"}
						/>
					</ButtonWrap>
				)}
				<ToggleEvent condition={skinMapStore.getHospital().length <= 0}>
					<></>
					<Swipe
						itemCount={
							interactionStore.getIsShow()
								? filterChips.length + 1
								: filterChips.length
						}
						itemWidth={126}
						isSwipe={true}
						reset={interactionStore.getIsShow() && true}
						css={alternative({
							is: interactionStore.getIsShow(),
							truthy: fiilterShow,
							falsy: filterHidden,
						})}
					>
						{filterChips.map((item, index: number) => (
							<FilterChipItems
								item={item}
								key={item.title + index}
								filterEvent={filterEvent}
							/>
						))}
					</Swipe>
				</ToggleEvent>
			</Row>
		);
	}
);

const FilterChipItems = ({
	filterEvent,
	item,
}: {
	filterEvent: (item: string) => void;
	item: { filter: string; icon: string; title: string };
}) => {
	const { skinMapStore } = useInjection(mapper);
	const filter = (filter: string) => () => filterEvent(filter);
	return (
		<ButtonWrap
			css={css`
				z-index: 9;
			`}
		>
			<Button
				round
				noBorder={skinMapStore.getFilterKeyword().indexOf(item.filter) <= -1}
				onClick={filter(item.filter)}
				css={customButton}
			>
				<Icon icon={item.icon}></Icon>
				{item.title}
			</Button>
		</ButtonWrap>
	);
};
