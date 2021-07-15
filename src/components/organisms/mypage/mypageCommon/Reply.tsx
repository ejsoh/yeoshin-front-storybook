import React from "react";
import { Icon } from "components/atoms";
import { Text } from "components/atoms/Text";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { mapper } from "models/RootStore";
import { useInjection } from "hooks";
import { useScrollEvent } from "hooks/useLazyLoading";
import { ReviewDomain } from "pages/mypage/CommonDomain";

export const Reply = ({
	id,
	index,
	comment,
	date,
	lastItem,
}: {
	id: string;
	comment: string;
	date: string;
	lastItem: number;
	index: number;
}) => {
	const { interactionStore } = useInjection(mapper);
	const { loading, isEnd } = useScrollEvent(index.toString());
	const { getPaging } = ReviewDomain();

	React.useCallback(() => {
		lastItem - 1 === parseInt(loading) &&
			getPaging(interactionStore.getCurrentPageIndex() + 1);
	}, [loading]);

	return (
		<SpaceContainer ref={isEnd} column={15} row={15} borderTop="#eee">
			<Text left>{id}</Text>
			<SpaceContainer columns={[5, 15]}>
				<Text gray left>
					{comment}
				</Text>
			</SpaceContainer>
			<Text left small lightgray>
				<Icon icon={"tv_time"} format="png" size={12} />
				<Space row={5} />
				{date}
			</Text>
		</SpaceContainer>
	);
};
