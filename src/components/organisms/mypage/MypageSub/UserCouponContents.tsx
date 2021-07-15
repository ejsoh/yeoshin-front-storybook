import { Column, Row } from "components/atoms/Grid";
import { NoResults, Pagination, ToggleEvent } from "components/molecules";
import React, { useState } from "react";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { AxiosResponse } from "axios";
import { CouponDomain } from "pages/mypage/UserCoupon";
import { NumberText } from "components/atoms/Typo/Typo";
import { RootStoreModel } from "models/RootStore";
import { Text } from "components/atoms/Text";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { Button, InputText } from "components/atoms";
import { PaginationDomain } from "pages/mypage/CommonDomain";
import { ValidationText } from "components/molecules/anchors/ValidationAnchor";
import { observer } from "mobx-react-lite";

const CouponAdd = styled.div`
	padding: 20px 10px;
	background-color: #fff;
	border: 1px solid black;
	position: relative;
	${ValidationText} {
		position: absolute;
		bottom: 0;
	}
`;

const CouponLink = styled.a`
	display: flex;
	width: 250px;
	padding: 6px 10px;
	background: #f1f1f1;
	letter-spacing: -1px;
	border: 1px solid #cecece;
	justify-content: center;
	align-items: center;
	margin: 10px auto;
`;

const couponItems = css`
	position: relative;
	padding: 10px;
	font-size: 13px;
	line-height: 18px;
	border-bottom: 1px solid #eee;
	width: 100%;
`;

const couponName = css`
	border-bottom: 1px dashed #ccc;
	background: #ededed;
	border-top: 1px solid #ccc;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
	padding: 3px;
`;

const couponUseCommon = css`
	border-radius: 50px;
	padding: 0 15px;
`;
const couponIsNotUsed = css`
	${couponUseCommon}
	background-color: #fc5b9f;
`;
const couponUsed = css`
	${couponUseCommon}
	background-color: #b4b4b4;
`;

const customButton = `
border: 0;
background-color: black;
color: #fff;
padding: 13px 0;
letter-spacing: -1px;
font-weight: bold;
width: 70px;
min-width: 70px;
border-radius: 0;
font-size: 13px;`;

const mapper = ({
	verificationStore,
	fetchStore,
	interactionStore,
}: RootStoreModel) => ({
	verificationStore,
	interactionStore,
	fetchStore,
});

export const UserCouponContents = observer(() => {
	const [code, setCode] = useState("");
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { registCoupon } = CouponDomain();
	const { getPaging } = PaginationDomain();
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setCode(event.target.value);
	const registerCouponEvent = (code: string) => () => {
		setCode("");
		registCoupon(code);
	};
	const setPage = (index: number) => getPaging(index);
	return (
		<>
			<CouponLink href="https://yeoshin.co.kr/?pn=product.list&cuid=830#listpg=1">
				<Text gray>가심비 넘치는 [3만원이하]시술 보러가기!</Text>
			</CouponLink>
			<SpaceContainer row={10} column={10} background="#eee">
				<CouponAdd>
					<SpaceContainer columns={[20, 20]}>
						<Text center large bold>
							쿠폰번호 등록
						</Text>
					</SpaceContainer>
					<Row between border="black">
						<InputText
							placeholder="쿠폰 번호를 등록해주세요."
							value={code}
							onChange={onChange}
						/>

						<Button
							custom={customButton}
							disabled={code === ""}
							onClick={registerCouponEvent(code)}
						>
							쿠폰등록
						</Button>
					</Row>
					<ValidationText left>
						{interactionStore.getValidationMessage().coupon}
					</ValidationText>
				</CouponAdd>
			</SpaceContainer>

			<ToggleEvent condition={fetchStore.fetchStore().data}>
				<>
					{fetchStore.fetchStore().data &&
						fetchStore.fetchStore().data.map((item: AxiosResponse["data"]) => {
							return (
								<Column key={item.key} css={couponItems}>
									<Row between>
										<Row>
											<Text gray small>
												사용가능기간
											</Text>

											<NumberText size={11} letterSpacing={-1} padding={"5"}>
												( ~ {item.limit} )
											</NumberText>

											<Text
												size={11}
												bold
												white
												css={item.isUse === "Y" ? couponUsed : couponIsNotUsed}
											>
												{item.isUse === "Y" ? "사용완료" : "사용가능"}
											</Text>
										</Row>
										<NumberText letterSpacing={-1} small bold>
											{item.price.toLocaleString()} 원
										</NumberText>
									</Row>
									<Space column={5} />
									<Text letterSpacing={-1} gray small center css={couponName}>
										{item.name}
									</Text>
								</Column>
							);
						})}
				</>
				<NoResults text="쿠폰이 없습니다." />
			</ToggleEvent>

			<Pagination total={fetchStore.fetchStore().totalCount} event={setPage} />
		</>
	);
});
