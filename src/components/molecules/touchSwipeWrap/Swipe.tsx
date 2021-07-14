import React from "react";
import { RootStoreModel } from "models/RootStore";
/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { useSwipeable } from "react-swipeable";
type SwipeType = {
	itemCount: number;
	itemWidth: number;
	children: JSX.Element[];
	isPage?: boolean;
	restWidth?: number;
	reset?: boolean;
	isSwipe?: boolean;
	css?: SerializedStyles | undefined;
};
type SwipeProps = {
	swipeWidth: string;
	swipe: string;
};

const SwipeContainer = styled.div<SwipeProps>`
	z-index: 999;
	display: flex;
	flex-direction: row;
	overflow: hidden;
	transition: left 0.2s;

	left: ${props => props.swipe}px;
	width: ${props => props.swipeWidth};
`;

const mapper = ({ interactionStore }: RootStoreModel) => ({
	interactionStore,
});

export const Swipe = observer(
	({
		itemCount,
		itemWidth,
		children,
		isPage,
		reset,
		restWidth = 24,
		isSwipe = false,
		...rest
	}: SwipeType) => {
		const [move, setMove] = React.useState({ width: 0, reset: false });
		const { interactionStore } = useInjection(mapper);
		const currentIndex = interactionStore.getSwipeIndex();
		const totalWidth = itemCount * itemWidth + restWidth;

		React.useEffect(() => {
			setMove({ reset: !reset ? false : true, width: 0 });
		}, [itemCount, reset]);

		const slide = (dir: { deltaX: number }) => {
			const itemsWidth = totalWidth;
			const displayWidth = window.innerWidth;
			const width = itemsWidth - displayWidth;
			const min = move.width + dir.deltaX >= 0 ? 0 : move.width + dir.deltaX;
			const max = -min > width ? -width : min;

			displayWidth < itemsWidth && setMove({ reset: false, width: max });
		};

		const pageLeft = () => {
			const count = itemCount - 1;

			const currentMove =
				move.width === -(count * itemWidth)
					? -(count * itemWidth)
					: -itemWidth + move.width;
			interactionStore.setSwipeAction(
				currentIndex === itemCount ? itemCount : currentIndex + 1
			);
			setMove({ reset: false, width: currentMove });
		};

		const pageRight = () => {
			const currentMove = move.width === 0 ? 0 : itemWidth + move.width;
			interactionStore.setSwipeAction(
				currentIndex === 0 ? 0 : currentIndex - 1
			);
			setMove({ reset: false, width: currentMove });
		};

		const handlers =
			isSwipe &&
			useSwipeable({
				onSwipedLeft: e => (isPage ? pageLeft() : slide(e)),
				onSwipedRight: e => (isPage ? pageRight() : slide(e)),
				preventDefaultTouchmoveEvent: true,
				trackMouse: true,
			});
		const size = () => {
			switch (true) {
				case window.innerHeight < 737:
					return move.width - move.width * 0.1;
				default:
					return move.width;
			}
		};
		return (
			<SwipeContainer
				{...handlers}
				swipeWidth={isSwipe ? `${totalWidth}px` : "auto"}
				swipe={size().toString()}
				css={css`
					${move.reset && "transition: 0s !important;"}
				`}
				{...rest}
			>
				{children}
			</SwipeContainer>
		);
	}
);
