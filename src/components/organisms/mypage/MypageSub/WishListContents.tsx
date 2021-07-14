import { Column, Row } from "components/atoms/Grid";
import { NoResults, Pagination, ToggleEvent } from "components/molecules";
import React from "react";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { AxiosResponse } from "axios";
import { useInjection } from "hooks";
import { mapper } from "models/RootStore";
import { Text } from "components/atoms/Message";
import { WishDomain } from "pages/mypage/WishList";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { PaginationDomain } from "pages/mypage/CommonDomain";
import styled from "@emotion/styled/macro";
import { ThumbnailImageWrapper } from "components/molecules/imageWrap/ThumbnailImageWrapper";

const WishEventImageContainer = styled.div`
	width: auto;
	min-width: 100px;
	height: 100px;
	margin-right: 10px;
`;

const WishButtonCommon = css`
	border-radius: 0;
	padding: 8px 10px;
	font-size: 13px;
	font-weight: normal;
	margin-right: 5px;
	display: flex;
	justify-content: center;
`;

const WishEventButton = styled.button`
	${WishButtonCommon}
	color: #fff;
	background-color: #aaaaaa;
	border: 1px solid #aaaaaa;
	min-width: 90px;
`;
const EventDeleteButton = styled.button`
	${WishButtonCommon}
	color: #666;
	background-color: #f1f1f1;
	border: 1px solid #cecece;

	min-width: 70px;
`;

const LinkButton = WishEventButton.withComponent("a");

export const WishListContents = observer(() => {
	const { fetchStore } = useInjection(mapper);
	const { wishDelete } = WishDomain();
	const { getPaging } = PaginationDomain();
	const wishDeleteEvent = (key: string) => () => wishDelete(key);
	const setPage = (index: number) => getPaging(index);
	return (
		<ToggleEvent condition={fetchStore.fetchStore().data}>
			<>
				{fetchStore.fetchStore().data &&
					fetchStore
						.fetchStore()
						.data.map((item: AxiosResponse["data"], index: number) => {
							return (
								<SpaceContainer
									key={item.key + index}
									row={10}
									column={10}
									borderBottom={"#eee"}
								>
									<Row between>
										<WishEventImageContainer>
											<ThumbnailImageWrapper
												src={`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/${item.image}`}
												alt={item.title}
											/>
										</WishEventImageContainer>

										<Column fullWidth>
											<Text size={11} left gray ellipsis>
												{item.location}
											</Text>
											<Text left ellipsis>
												{item.title}
											</Text>
											<Text left pink bold>
												{item.price.toLocaleString()} 원
											</Text>
											<Space column={10} />
											<Row>
												<LinkButton
													href={`https://yeoshin.co.kr/?pn=product.view&pcode=${item.key}`}
												>
													이벤트 보기
												</LinkButton>
												<EventDeleteButton onClick={wishDeleteEvent(item.key)}>
													찜 삭제
												</EventDeleteButton>
											</Row>
										</Column>
									</Row>
								</SpaceContainer>
							);
						})}
				<Pagination
					total={fetchStore.fetchStore().totalCount}
					event={setPage}
				/>
			</>
			<NoResults text={"찜한 이벤트 없습니다."} />
		</ToggleEvent>
	);
});
