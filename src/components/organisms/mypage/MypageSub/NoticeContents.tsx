import { Space, SpaceContainer } from "components/atoms/Spacing";

import { AxiosResponse } from "axios";
import { Icon } from "components/atoms";
import { PaginationDomain } from "pages/mypage/CommonDomain";
import { Pagination } from "components/molecules";
import React from "react";
import { RootStoreModel } from "models/RootStore";
import { Row } from "components/atoms/Grid";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";

const NoticeList = styled.div`
	padding: 5px 0;
	li {
		position: relative;
		border-bottom: 1px solid #eee;
		a {
			display: block;
			padding: 8px 85px 12px 15px;
		}
		.text {
			color: #999;
			font-size: 14px;
			font-weight: 300;
			span {
				color: #fd5ba0;
				font-size: 11px;
			}
		}
		.date {
			position: absolute;
			color: #ccc;
			right: 0;
			top: 50%;
			margin: -8px 30px 0 0;
			font-size: 11px;
			font-weight: 200;
		}
		.shop_icon {
			position: absolute;
			top: 50%;
			right: 0;
			margin: -7px 10px 0 0;
			width: 7px;
			height: 15px;
			background-size: 320px;
			background-position: -145px -30px;
		}
	}
`;

type NoticeType = {
	NoticeData?: never[] | [];
};
const mapper = ({ fetchStore, interactionStore }: RootStoreModel) => ({
	fetchStore,
	interactionStore,
});
export const NoticeContents = observer(({ NoticeData }: NoticeType) => {
	const { fetchStore } = useInjection(mapper);
	const { getPaging } = PaginationDomain();
	const setPage = (index: number) => getPaging(index);
	return (
		<>
			<NoticeList>
				<>
					{fetchStore.fetchStore().data &&
						fetchStore.fetchStore().data.map((item: AxiosResponse["data"]) => {
							return (
								<SpaceContainer
									column={15}
									css={css`
										border-bottom: 1px solid #eee;
									`}
									row={5}
									key={item.link}
								>
									<a
										href={`https://yeoshin.co.kr/?_mobilemode=chk&pn=board.view&_uid=${item.link}`}
									>
										<Row between span={[2, 1]} space={[0, 10]}>
											<Text left lightgray>
												{item.title}
											</Text>

											<Row
												css={css`
													justify-content: flex-end;
												`}
											>
												<Text small lightgray letterSpacing={-1}>
													[{item.date}]
												</Text>
												<Space row={10} />
												<Icon icon={"arrowRight"} size={13} />
											</Row>
										</Row>
									</a>
								</SpaceContainer>
							);
						})}
				</>

				<Pagination
					total={fetchStore.fetchStore().totalCount}
					event={setPage}
				/>
			</NoticeList>
		</>
	);
});
