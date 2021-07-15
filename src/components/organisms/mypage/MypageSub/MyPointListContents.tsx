import { Button, InputText } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import React, { useState } from "react";

import { AxiosResponse } from "axios";
import { MyPointListDomain } from "pages/mypage/MyPointList";
import { Pagination } from "components/molecules";
import { SpaceContainer } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { ValidationText } from "components/molecules/anchors/ValidationAnchor";

const PointContainer = styled.div`
	padding: 20px 10px;
	background-color: #e6e6e6;
	position: relative;
	${ValidationText} {
		position: absolute;
		bottom: 0;
	}
`;

const PointHistory = styled.div`
	background-color: #fff;
	font-size: 13px;
	color: #333;
	font-size: 13px;
	color: #333;
`;

const Badge = styled.div`
	background-color: #464646;
	color: #fff;
	font-weight: bold;
	border-radius: 30px;
	padding: 5px 10px;
	font-size: 11px;
`;

const containerStyle = css`
	background-color: #f5f5f5;
	border-bottom: 1px solid #d4d4d4;
`;

const exchangeButton = css`
	border-radius: 0 !important;
	padding: 13px 0;
	border: 0 !important;
	background-color: #fd5ba0;
	font-size: 13px !important;
	width: 100px !important;
`;

const firstLine = css`
	border-bottom: 1px solid #eee;
	height: auto;
`;
const secondLine = css`
	border-top: 1px dashed #eee;
	padding: 10px;
`;

export const MyPointListContents = observer(() => {
	const [key, setKey] = useState("");
	const { getPaging, exchangePoint } = MyPointListDomain();
	const { fetchStore, userInfoStore, interactionStore } = useInjection(mapper);
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setKey(event.target.value);
	const onClick = React.useCallback(() => {
		setKey("");
		exchangePoint(key);
	}, [key]);
	const setPage = (index: number) => getPaging(index);
	return (
		<>
			<SpaceContainer column={20} css={containerStyle}>
				<Text center medium>
					나의 참여점수 : {userInfoStore.getUserInfo().point}점
				</Text>
			</SpaceContainer>

			<PointContainer>
				<PointHistory>
					<SpaceContainer column={10} row={10}>
						<Row span={[1, 1]}>
							<Text gray left>
								로그인 : {fetchStore.fetchStore().loginCount}회
							</Text>
							<Text gray left>
								토크작성 : {fetchStore.fetchStore().talkCount}회
							</Text>
						</Row>
					</SpaceContainer>
					<Row
						css={css`
							border-top: 1px solid #d4d4d4;
						`}
					>
						<InputText
							type="number"
							name=""
							id=""
							placeholder="전환할 포인트를 입력하세요"
							value={key}
							onChange={onChange}
						/>
						<Button
							filled
							css={exchangeButton}
							onClick={onClick}
							disabled={key === ""}
						>
							전환하기
						</Button>
					</Row>
				</PointHistory>
				<ValidationText left>
					{interactionStore.getValidationMessage().point}
				</ValidationText>
			</PointContainer>

			{fetchStore.fetchStore().data &&
				fetchStore.fetchStore().data.map((item: AxiosResponse["data"]) => {
					return (
						<Column key={item.date} css={firstLine}>
							<Row between space={[5, 10]}>
								<Text small lightgray>
									{item.date}
								</Text>
								<Badge>{item.point}점</Badge>
							</Row>
							<Text left gray small css={secondLine}>
								{item.title}
							</Text>
						</Column>
					);
				})}

			<Pagination total={fetchStore.fetchStore().totalCount} event={setPage} />
		</>
	);
});
