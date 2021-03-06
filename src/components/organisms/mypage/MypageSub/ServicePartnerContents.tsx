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
				<InputWrap labelText="??????" {...getFormProps("name")} />
				<InputWrap labelText="?????????" {...getFormProps("mobile")} />
				<InputWrap labelText="?????????" {...getFormProps("email")} />
				<InputWrap labelText="????????????" {...getFormProps("title")} />

				<TextArea
					css={css`
						min-height: 150px;
					`}
					placeholder="??????????????? ???????????????"
					onChange={onChange}
				></TextArea>

				<Collectiondiv>
					{`?????? ??? ?????? ?????? : ????????????
					 ?????? ??? ?????? ?????? : ??????/??????????????? ????????? ?????? 
					 ???????????? : ??????(?????????), ???????????????, ??????????????? 
					 ???????????? : ??????????????? ???????????? ?????? ??? ??????????????? ?????????
					????????? ?????? ????????? ?????? ?????? ???????????????. `}
				</Collectiondiv>
				<Row onClick={setValue}>
					<CheckBox checked={value.isChecked} />
					<Space row={10} />
					<Text>???????????? ?????? ??? ??????????????? ???????????????.</Text>
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
					????????????
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
