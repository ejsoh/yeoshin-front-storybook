import { Row } from "components/atoms/Grid";
import { Icon, TextArea } from "components/atoms";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { useAuth, useInjection } from "hooks";
import { AxiosResponse } from "axios";
import React from "react";
import { Reply } from "./Reply";
import { ReviewDomain } from "pages/mypage/CommonDomain";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { Checkboxs } from "components/molecules/inputWrap/CheckBox";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";

const ReplyContainer = styled.div`
	height: 70px;
	display: flex;
	flex-direction: row;
	font-size: 12px;
	border: 1px solid #d4d4d4;
	margin: 15px 0;
`;

const SendReply = styled.button`
	min-width: 75px;
	height: 100%;
	border: 0;
	border-left: 1px solid #d4d4d4;
	background-color: #fff;
`;
const subTitle = css`
	border-right: 1px solid #e1e1e1;
	padding: 4px 10px;
	width: 80px;
	background-color: #eeeeee;
`;

const EventState = styled.div`
	margin-left: 5px;
	background-color: red;
	color: #fff;
	padding: 3px 8px;
	font-size: 10px;
	letter-spacing: -1px;
`;
const TextAreaContainer = styled.div`
	margin-top: 20px;
	padding: 10px;
	box-sizing: border-box;
	background-color: #f1f1f1;
`;
export const EventDetailCommon = observer(
	({
		title,
		date,
		contents,
		no,
	}: {
		title: string;
		no: string;
		date: string;
		contents: JSX.Element;
	}) => {
		const { setReview } = ReviewDomain();
		const auth = useAuth();
		const borderColor = "#e1e1e1";
		const [comment, setComment] = React.useState({
			comment: "",
			isSecret: false,
		});
		const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
			setComment({ ...comment, comment: e.target.value });

		const checkValue = () =>
			setComment({ ...comment, isSecret: !comment.isSecret });

		const sendReply = React.useCallback(() => {
			return setReview(no, comment.comment, comment.isSecret ? "Y" : "N");
		}, [comment.isSecret, comment.comment]);

		const { fetchStore } = useInjection(mapper);
		return (
			<>
				<SpaceContainer column={10}>
					<Text center medium letterSpacing={-1}>
						{title}
					</Text>
				</SpaceContainer>
				<Row borderBottom={borderColor} borderTop={borderColor}>
					<Text left small gray css={subTitle}>
						이벤트 기간
					</Text>
					<Text left small textIndent={5}>
						{date}
					</Text>
				</Row>
				<Row borderBottom={borderColor}>
					<Text left small gray css={subTitle}>
						진행상태
					</Text>
					<EventState>이벤트 진행중</EventState>
				</Row>
				<Space column={10} />
				{contents}
				{auth.user() && (
					<TextAreaContainer>
						<ReplyContainer>
							<TextArea
								height={70}
								onChange={changeText}
								placeholder={
									"본 게시물의 취지에 맞지 않는 글은 예고 없이 삭제 및 수정될 수 있습니다."
								}
							></TextArea>
							<SendReply onClick={sendReply}>
								<Icon icon="tv_write" format="png" />
								<Text small center>
									댓글입력
								</Text>
							</SendReply>
						</ReplyContainer>
						<OnlyTruthyShow condition={no !== "361"}>
							<Checkboxs
								small
								labelText={"비공개 댓글로 등록합니다."}
								onChange={checkValue}
							></Checkboxs>
						</OnlyTruthyShow>
					</TextAreaContainer>
				)}
				{fetchStore.fetchStore().data &&
					fetchStore
						.fetchStore()
						.data.map((item: AxiosResponse["data"], index: number) => (
							<Reply
								key={item.key + item.id + item.date + index}
								id={item.id}
								comment={item.comment}
								date={item.date}
								index={index}
								lastItem={fetchStore.fetchStore().data.length}
							/>
						))}
			</>
		);
	}
);
