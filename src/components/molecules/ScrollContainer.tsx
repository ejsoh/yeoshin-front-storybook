import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { useSwipeable } from "react-swipeable";
export const ScrollContainer = observer(
	({ children }: { children: JSX.Element[] | JSX.Element }) => {
		const { interactionStore } = useInjection(mapper);
		const [currentScroll, setScroll] = React.useState(0);
		const handlers = useSwipeable({
			onSwipedUp: e => {
				const result = currentScroll + e.absY;
				result <= 210 &&
					!interactionStore.getMainBannerIsShow() &&
					interactionStore.setMainBannerIsShow(true);
				setScroll(result);
			},
		});
		return (
			<div
				css={css`
					overflow-x: hidden;
				`}
				{...handlers}
			>
				{children}
			</div>
		);
	}
);
