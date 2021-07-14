import { Column, Row } from "components/atoms/Grid";
import { useInjection, useLazyLoading } from "hooks";

import { AxiosResponse } from "axios";
import { Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useSwipeable } from "react-swipeable";
import { yeoshinTvLink } from "constantDatas/linkUrls";
import { openTv } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";

const Container = styled.div`
	overflow: hidden;
	overscroll-behavior: none;
	position: relative;
`;

const TvContainer = styled.div`
	position: relative;
	max-width: 100px;
	&::after {
		content: "";
		min-width: 80px;
		height: auto;
		position: absolute;
		left: 0;
		right: 0;
		background-color: #0000001c;
		top: 0;
	}
`;
const innerContents = css`
	min-width: 272px;
	padding: 0 10px;
`;

const ItemContents = styled.img`
	width: 100px;
	height: auto;
	border-radius: 4px;
	background-color: #ececec;
	object-fit: cover;
	border-radius: 4px;
	min-width: 100px;
	overflow: hidden;
`;

const buttonStyle = css`
	position: absolute;
	bottom: 0;
	right: 0;
	margin: 10px;
	box-sizing: border-box;
`;

const contentsDivider = css`
	padding-bottom: 8px;
	width: 172px;
	border-bottom: 1px solid #f7f7f7;
`;

export const YeoshinTv = observer(() => {
	const { mainStore } = useInjection(mapper);
	const [index, setIndex] = React.useState({
		direction: "",
		isTransition: false,
	});
	const handlers = useSwipeable({
		onSwipedLeft: e => {
			const copied = [...mainStore.getData().tv];
			const shiftItem = copied.shift();
			copied.push(shiftItem);

			mainStore.setResponse({
				...mainStore.getData(),
				...{ tv: copied },
			});
			setIndex({ ...index, isTransition: false });
		},
		onSwipedRight: e => {
			const copied = [...mainStore.getData().tv];
			const popItem = copied.pop();
			copied.unshift(popItem);

			mainStore.setResponse({
				...mainStore.getData(),
				...{ tv: copied },
			});
			setIndex({ ...index, isTransition: false });
		},
		onSwipeStart: e => {
			(e.dir === "Right" || e.dir === "Left") &&
				setIndex({ direction: e.dir, isTransition: true });
		},
		preventDefaultTouchmoveEvent: true,
	});

	const tvClick = (title: string) => {
		return () => {
			openTv(title);
			eventTracking("여신티비 클릭", {
				tvTitle: title,
			});
		};
	};

	return (
		<Container {...handlers}>
			<Row
				between
				css={css`
					position: relative;
					width: 1200px;
					display: flex;
					flex-wrap: nowrap;
					overflow: hidden;
					${index.direction === "Right" ? "left: 0;" : "left: -536px;"}
					${index.isTransition
						? "transition: 0.3s;"
						: index.isTransition === undefined
						? "transition: 0s; left:-536px;"
						: "transition: 0s; left:-268px;"}
				`}
			>
				{mainStore.getData().tv &&
					mainStore
						.getData()
						.tv.slice(0, 5)
						.map((item: AxiosResponse["data"]) => (
							<Row
								as="a"
								href={yeoshinTvLink(item.key)}
								key={item.key + "tv"}
								css={innerContents}
								onClick={tvClick(item.title)}
							>
								<TvContainer>
									<YeoshinItems url={item.img} />
									<Icon icon="playBtn" css={buttonStyle} />
								</TvContainer>
								<Space row={12} />
								<Column css={contentsDivider}>
									<Text left ellipsis line={2}>
										{item.title}
									</Text>
									<Space column={4} />
									<Row>
										<Text left lightgray>
											조회수
										</Text>
										<Space row={4} />
										<NumberText bold>{item.count}</NumberText>
									</Row>
								</Column>
							</Row>
						))}
			</Row>
		</Container>
	);
});

const YeoshinItems = ({
	url,
	lastItem,
	productcode,
	call,

	...rest
}: {
	url: string;

	productcode?: string;
	lastItem?: string;
	call?: () => void;
}) => {
	const { loadingSrc, getImage } = useLazyLoading(url);

	return <ItemContents src={loadingSrc} ref={getImage} {...rest} />;
};
