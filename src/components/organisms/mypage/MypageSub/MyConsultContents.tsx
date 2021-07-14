import { Column, Row } from "components/atoms/Grid";
import { NoResults, Pagination, ToggleEvent } from "components/molecules";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { AxiosResponse } from "axios";
import { ConsultDomain } from "pages/mypage/MyConsultList";
import { Icon } from "components/atoms";
import React from "react";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
type BadgeProps = { isShow: boolean };
const Badge = styled.div<BadgeProps>`
	background-color: #474747;
	border-radius: 20px;
	color: #fff;
	font-size: 12px;
	padding: 3px 20px;
	font-weight: bold;
	margin: 0 3px;
	${props => props.isShow && "background-color: rgb(253, 91, 160);"}
`;

const ConsultContainer = styled.div`
	margin: 10px 0;
	border-top: 1px solid #eee;
`;

const itemContainer = css`
	padding: 10px;
	border-bottom: 1px solid #eee;
	width: 100%;
`;

const List = styled.div`
	display: flex;
	overflow-y: auto;
	margin-top: 10px;
`;

type ButtonProps = { margin: string };

const Button = styled.a<ButtonProps>`
	width: 100% !important;
	background: #f1f1f1;
	font-size: 12px;
	letter-spacing: -1px;
	border: 1px solid #cecece;
	color: #666;
	width: 200px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${props => props.margin}px;
`;

const ImageContainer = styled.img`
	max-width: 300px;
	height: auto;
	margin: 0 auto;
`;

export const MyConsultContents = observer(() => {
	const { fetchStore } = useInjection(mapper);
	const { getPaging } = ConsultDomain();
	const [state, setState] = React.useState({ id: "", isShow: false });
	const setIndex = (index: number) => getPaging(index);
	return (
		<List>
			<Column fullWidth>
				<SpaceContainer column={10} row={10}>
					<Button margin={"10px 0"} href="/oftenQuestions">
						자주묻는 질문(환불, 유효기간 등)
					</Button>
					<Row between>
						<Button margin={"0 8px 0 0"} href="https://pf.kakao.com/_xdPxiru">
							카톡 상담하기
						</Button>

						<Button margin={"0"} href="/reqeustConsult">
							문의 남기기
						</Button>
					</Row>
				</SpaceContainer>
				<ToggleEvent condition={fetchStore.fetchStore().data}>
					<ConsultContainer>
						{fetchStore.fetchStore().data &&
							fetchStore
								.fetchStore()
								.data.map((item: AxiosResponse["data"]) => (
									<Column key={item.key}>
										<Row
											onClick={() => {
												setState({ id: item.key, isShow: false });
												(!state.isShow || item.key !== state.id) &&
													setState({ id: item.key, isShow: true });
											}}
										>
											<Column css={itemContainer}>
												<Row>
													<Badge isShow={item.status === "답변완료"}>
														{item.status}
													</Badge>
													<Text size={11} gray>
														{item.date}
													</Text>
												</Row>
												<SpaceContainer column={5} row={5}>
													<Text lightgray left>
														{item.title}
													</Text>
												</SpaceContainer>
											</Column>
											<SpaceContainer row={10}>
												<Icon
													size={10}
													icon={state.isShow ? "upArrow" : "downArrow"}
												/>
											</SpaceContainer>
										</Row>

										{state.isShow && state.id === item.key && (
											<Column
												css={css`
													background-color: #e1e1e1;
												`}
											>
												<Column>
													<Text left size={18} padding={"15"}>
														{item.title}
													</Text>

													<Text
														size={12}
														left
														gray
														padding={"15px 15px 20"}
														preLine
													>
														{item.content}
													</Text>

													<ImageContainer src={item.image} />
													<Space column={30} />
													<OnlyTruthyShow
														condition={item.status === "답변완료"}
													>
														<SpaceContainer row={10} column={10}>
															<Text pink left>
																답변내용 ({item.adminDate})
															</Text>
															<Space column={5} />
															<Text gray left>
																{item.adminContent}
															</Text>
														</SpaceContainer>
													</OnlyTruthyShow>
												</Column>
											</Column>
										)}
									</Column>
								))}

						<OnlyTruthyShow condition={fetchStore.fetchStore().totalCount > 10}>
							<Pagination
								total={fetchStore.fetchStore().totalCount}
								event={setIndex}
							/>
						</OnlyTruthyShow>
					</ConsultContainer>
					<NoResults text="등록된 글이 없습니다." />
				</ToggleEvent>
			</Column>
		</List>
	);
});
