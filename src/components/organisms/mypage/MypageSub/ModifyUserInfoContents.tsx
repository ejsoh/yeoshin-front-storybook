import {
	ButtonContainer,
	SnsWrap,
	WithDraw,
	sexButton,
} from "./ModifyUserInfoStyle";
import { InputWrap, InputWrapWithButton } from "components/molecules";
import { Text } from "components/atoms/Text";
import { useFormHandler, useInjection } from "hooks";
import { Button } from "components/atoms";
import { Checkboxs } from "components/molecules/inputWrap/CheckBox";
import { DateSelectBox } from "components/molecules/inputWrap/SelectBoxWrap";
import { ModifyUserInfoDomain } from "pages/mypage/ModifyUserInfo";
import React, { useCallback } from "react";
import { Row } from "components/atoms/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { InputListContainer } from "components/molecules/inputWrap/InputListContainer";
import { Validation } from "components/molecules/anchors/ValidationAnchor";
import styled from "@emotion/styled/macro";
import { ConnectSns } from "components/organisms/sns/Sns";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import { validationHelper } from "helper";
const SexualButton = styled(Button)`
	${sexButton}
`;

export const ModifyUserInfoContents = observer(() => {
	const {
		timerStore,
		userInfoStore,
		verificationStore,
		interactionStore,
	} = useInjection(mapper);
	const {
		checkNickName,
		infoValidation,
		sendSms,
		confirmNumber,
		snsConnect,
	} = ModifyUserInfoDomain();

	const userInfo = userInfoStore.getUserInfo();
	const setInfo = (key: string, value: string) =>
		userInfoStore.setUserInfoSpecific(key, value);
	const valid = verificationStore.getVerification();

	const formValue = useFormHandler({
		setValue: {
			newNickName: text => setInfo("newNickName", text),
			email: text => setInfo("email", text),
			birth: text => setInfo("birth", text),
			mobile: text => verificationStore.setPartial({ mobileNumber: text }),
			confirmNumber: verificationStore.setConfirmNumber,
			password: verificationStore.setSecondPassword,
			name: text => setInfo("name", text),
		},
		getValue: {
			newNickName: userInfo.newNickName,
			email: userInfo.email,
			birth: userInfo.birth,
			password: verificationStore.getVerification().secondPassword.value,
			mobile: verificationStore.getVerification().mobileNumber.value,
			name: userInfo.name,
		},
	});

	const { getFormProps } = formValue;
	const passRefConfig = {
		target: interactionStore.getValidationMessage(),
		targets: ["name", "nickname", "email", "mobile"],
		inputValue: getFormProps,
		textPadding: "0 0 0 5px",
	};

	const selectFemale = () => {
		setInfo("sex", "F");
	};

	const selectMale = () => {
		setInfo("sex", "M");
	};

	const checkDuplicate = useCallback(() => {
		checkNickName(userInfo.newNickName);
	}, [userInfo.newNickName]);

	const makePublicBirthday = useCallback(() => {
		setInfo("birthdayView", userInfo.birthdayView === "Y" ? "N" : "Y");
	}, []);

	const acceptMarketing = useCallback(() => {
		setInfo("smsCheck", userInfo.smsCheck === "Y" ? "N" : "Y");
	}, []);

	const acceptEmail = useCallback(() => {
		setInfo("emailCheck", userInfo.emailCheck === "Y" ? "N" : "Y");
	}, []);

	return (
		<InputListContainer>
			<Text center pink medium>
				SNS연동
			</Text>

			<SnsWrap>
				<ConnectSns
					isGetId={(id: string, type: string) => snsConnect(id, type)}
					naver={userInfo.nvJoin === "Y"}
					kakao={userInfo.koJoin === "Y"}
					facebook={userInfo.fbJoin === "Y"}
					apple={userInfo.appleJoin === "Y"}
				/>

				<Text center pink medium>
					정보수정
				</Text>
			</SnsWrap>

			<Validation
				{...passRefConfig}
				current="name"
				text={interactionStore.getValidationMessage().name}
			>
				<Row span={[3, 1]} isWrap>
					<InputWrap labelText={"이름"} {...getFormProps("name")} />
					<ButtonContainer>
						<SexualButton
							filledGray={userInfo.sex !== "F"}
							onClick={selectFemale}
						>
							여성
						</SexualButton>
						<SexualButton
							filledGray={userInfo.sex !== "M"}
							onClick={selectMale}
						>
							남성
						</SexualButton>
					</ButtonContainer>
				</Row>
			</Validation>

			<Validation
				{...passRefConfig}
				current="nickname"
				text={interactionStore.getValidationMessage().nickname}
			>
				<InputWrapWithButton
					input={{
						labelText: "닉네임",
						...getFormProps("newNickName"),
					}}
					button={{
						name: "중복체크",
						onClick: checkDuplicate,
						disabled:
							userInfo.newNickName === "" ||
							!validationHelper(userInfo.newNickName, 2)("minLength").result,
					}}
				/>
			</Validation>

			<Row span={[3, 1]} isWrap>
				<DateSelectBox label={"생년월일"} />
				<Button
					padding={13}
					onClick={makePublicBirthday}
					filledGray={userInfo.birthdayView === "N"}
				>
					{userInfo.birthdayView === "Y" ? "공개" : "비공개"}
				</Button>
			</Row>

			<InputWrap
				single
				labelText={"아이디"}
				value={userInfo.id}
				disabled={true}
			/>

			<InputWrap
				single
				labelText={"비밀번호"}
				placeholder={"변경을 원할 경우에 입력하세요"}
				type={"password"}
				errText={valid.secondPassword.msg}
				{...getFormProps("password")}
			/>
			<Validation
				{...passRefConfig}
				current="mobile"
				text={interactionStore.getValidationMessage().mobile}
			>
				<InputWrapWithButton
					input={{
						labelText: "휴대폰",
						pattern: "[0-9]*",
						type: "number",
						placeholder: "예) 0100000000",
						...getFormProps("mobile"),
					}}
					button={{
						name: valid.isDisabled.mobile ? "인증완료" : "인증요청",
						onClick: sendSms,
					}}
					errText={valid.mobileNumber.msg}
				/>
			</Validation>
			<OnlyTruthyShow condition={timerStore.isShowView()}>
				<InputWrapWithButton
					input={{
						labelText: "인증확인",
						maxLength: 13,
						type: "number",
						pattern: "[0-9]*",
						afterIcon: (
							<Text
								pink
								small
								css={css`
									min-width: auto !important;
									&::after {
										border-right: 0 !important;
									}
								`}
							>
								{timerStore.isShowView() &&
									new Date(timerStore.timerView() * 1000)
										.toISOString()
										.substr(14, 5)}
							</Text>
						),
						placeholder: "인증번호",
						...getFormProps("confirmNumber"),
					}}
					button={{
						name: "번호확인",
						onClick: confirmNumber,
					}}
					errText={valid.confirmNumber.msg}
				/>
			</OnlyTruthyShow>
			<Validation
				{...passRefConfig}
				current="email"
				text={interactionStore.getValidationMessage().email}
			>
				<InputWrap single labelText={"이메일"} {...getFormProps("email")} />
			</Validation>

			<Row evenly space={[20, 0]}>
				<Text>{"마케팅수신동의"}</Text>
				<Row>
					<Checkboxs
						labelText="SMS"
						onChange={acceptMarketing}
						checked={userInfo.smsCheck === "Y"}
					/>
					<Checkboxs
						labelText="이메일"
						onChange={acceptEmail}
						checked={userInfo.emailCheck === "Y"}
					/>
				</Row>
			</Row>

			<Button large filled onClick={infoValidation}>
				{"저장하기"}
			</Button>
			<WithDraw />
		</InputListContainer>
	);
});
