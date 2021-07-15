import { Button, TextArea } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { useFormHandler, useInjection } from "hooks";

import { CheckBox } from "components/atoms/Input/InputCheckbox/InputCheckbox";
import { InputWrap } from "components/molecules";
import { RECAPTCHA_SITEKEY } from "constantDatas/common";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
import { ServicePartnerDomain } from "pages/mypage/ServicePartner";
import { Text } from "components/atoms/Text";
import { checkEmptyHelper } from "helper";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";

const PartnerContainer = styled.div`
	padding: 0 15px;
`;

export const ServicePartnerContents = observer(() => {
	const { interactionStore } = useInjection(mapper);
	const { sendService } = ServicePartnerDomain();
	const [sendData, setSendData] = React.useState(false);
	const formValue = useFormHandler({
		setValue: {
			title: e => {
				interactionStore.setInputValue({
					...interactionStore.getInputValues(),
					title: e,
				});
			},
			name: e => {
				interactionStore.setInputValue({
					...interactionStore.getInputValues(),
					name: e,
				});
			},
			mobile: e => {
				interactionStore.setInputValue({
					...interactionStore.getInputValues(),
					mobile: e,
				});
			},
			email: e => {
				interactionStore.setInputValue({
					...interactionStore.getInputValues(),
					email: e,
				});
			},
		},
		getValue: {
			name: interactionStore.getInputValues().name,
			mobile: interactionStore.getInputValues().mobile,
			email: interactionStore.getInputValues().email,
		},
	});

	const recaptcha = (value: string | null) => {
		value !== null && setSendData(true);
	};
	const setContent = (e: string) => {
		interactionStore.setInputValue({
			...interactionStore.getInputValues(),
			content: e,
		});
	};
	const value = interactionStore.getInputValues();
	const { getFormProps } = formValue;
	const setValue = () =>
		interactionStore.setInputValue({
			...interactionStore.getInputValues(),
			isChecked: !value.isChecked,
		});
	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		setContent(event.target.value);
	return (
		<PartnerContainer>
			<img
				src="https://yeoshin.co.kr/pages/images/companyservice2.jpg"
				alt=""
			/>

			<Column itemSpace={10}>
				<ReCAPTCHA
					hl={"ko"}
					sitekey={RECAPTCHA_SITEKEY ?? ""}
					onChange={event => recaptcha(event)}
				/>
				<InputWrap labelText="이름" {...getFormProps("name")} />
				<InputWrap labelText="휴대폰" {...getFormProps("mobile")} />
				<InputWrap labelText="이메일" {...getFormProps("email")} />
				<InputWrap labelText="문의제목" {...getFormProps("title")} />

				<TextArea
					css={css`
						min-height: 150px;
					`}
					placeholder="문의내용을 적어주세요"
					onChange={onChange}
				></TextArea>

				<Collectiondiv>
					{`수집 및 이용 주체 : 여신티켓
					 수집 및 이용 목적 : 제휴/광고문의의 접수와 상담 
					 수집항목 : 이름(상호명), 휴대폰번호, 이메일주소 
					 보유기간 : 원칙적으로 개인정보 수집 및 이용목적이 달성된
					후에는 해당 정보를 지체 없이 파기합니다. `}
				</Collectiondiv>
				<Row onClick={setValue}>
					<CheckBox checked={value.isChecked} />
					<Space row={10} />
					<Text>개인정보 수집 및 이용약관에 동의합니다.</Text>
				</Row>
			</Column>
			<SpaceContainer column={15}>
				<Button
					large
					filled
					disabled={
						!(
							sendData &&
							checkEmptyHelper([
								value.name,
								value.email,
								value.mobile,
								value.title,
								value.content,
								value.isChecked,
							])
						)
					}
					onClick={sendService}
				>
					문의하기
				</Button>
			</SpaceContainer>
		</PartnerContainer>
	);
});

const Collectiondiv = styled.div`
	padding: 10px;
	white-space: pre-line;
	font-size: 12px;
	box-sizing: border-box;
	color: #666;
	line-height: 17px;
	height: 80px;
	overflow-y: auto;
	border: 1px solid #d4d4d4;
`;
