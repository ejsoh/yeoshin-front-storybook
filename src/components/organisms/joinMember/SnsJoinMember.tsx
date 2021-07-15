import { Icon, isChecked } from "components/atoms/Icon/Icon";
import { InputWrap, InputWrapWithButton } from "components/molecules";
import { useFormHandler, useInjection } from "hooks";
import { Button } from "components/atoms";
import { Checkboxs } from "components/molecules/inputWrap/CheckBox";
import React from "react";
import { mapper } from "models/RootStore";
import { Row } from "components/atoms/Grid";
import { Text } from "components/atoms/Text";
import { observer } from "mobx-react-lite";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { InputListContainer } from "components/molecules/inputWrap/InputListContainer";
import { JoinMembers } from "pages/joinMember/SendJoin";

type CheckList = {
	text: string;
	event: () => void;
	forText: string;
	checked: boolean;
};

type JoinMemberTemplate = {
	smsProps: () => void;
	recommandProps: () => void;
	smsConfirmProps: () => void;
	checkList: CheckList[];
};

export const SnsJoinMemberContents = observer(
	({
		checkList,
		recommandProps,
		smsConfirmProps,
		smsProps,
	}: JoinMemberTemplate) => {
		const { verificationStore, timerStore } = useInjection(mapper);
		const getValidation = verificationStore.getVerification();

		const { sendJoin } = JoinMembers(
			verificationStore.getSnsJoinMemberInfo(),
			true
		);

		const formValue = useFormHandler({
			setValue: {
				email: verificationStore.setEmail,
				recommendId: verificationStore.setRecommendId,
				mobileNumber: verificationStore.setMobileNumber,
				name: verificationStore.setName,
				confirmNumber: verificationStore.setConfirmNumber,
			},
			getValue: {
				email: getValidation.email,
				recommendId: getValidation.recommendId,
				mobileNumber: getValidation.mobileNumber,
				name: getValidation.name,
				confirmNumber: getValidation.confirmNumber,
			},
		});
		const { getFormProps } = formValue;
		return (
			<InputListContainer>
				<InputWrap
					single
					labelText="이름"
					placeholder="실명을 입력해주세요"
					{...getFormProps("name", "value")}
				/>
				<InputWrapWithButton
					input={{
						labelText: "휴대폰",
						maxLength: 13,
						type: "number",
						pattern: "[0-9]*",
						placeholder: "예) 0100000000",
						icon: (
							<Icon
								format="png"
								icon={isChecked(getValidation.isDisabled.mobile)}
							/>
						),
						...getFormProps("mobileNumber", "value"),
					}}
					button={{
						name: getValidation.isDisabled.mobile ? "인증완료" : "번호인증",
						onClick: smsProps,
						disabled: !getValidation.mobileNumber.result,
					}}
					errText={getValidation.mobileNumber.msg}
				/>

				{timerStore.isShowView() && (
					<InputWrapWithButton
						input={{
							labelText: "인증확인",
							maxLength: 13,
							type: "number",
							pattern: "[0-9]*",
							inputmessage:
								timerStore.isShowView() &&
								new Date(timerStore.timerView() * 1000)
									.toISOString()
									.substr(14, 5),

							placeholder: "인증번호",
							...getFormProps("confirmNumber", "value"),
						}}
						button={{
							name: "번호확인",
							onClick: smsConfirmProps,
						}}
						errText={getValidation.confirmNumber.msg}
					/>
				)}
				<InputWrap
					single
					labelText="이메일"
					type="email"
					placeholder="email@example.com"
					errText={getValidation.email.msg}
					afterIcon={
						<Icon format="png" icon={isChecked(getValidation.email.result)} />
					}
					{...getFormProps("email", "value")}
				/>
				<Row evenly>
					<Text>{"마케팅수신동의"}</Text>
					<Row>
						{checkList.map((item, index: number) => (
							<Checkboxs
								key={index}
								labelText={item.text}
								checked={item.checked}
								onChange={item.event}
							></Checkboxs>
						))}
					</Row>
				</Row>
				<SpaceContainer columns={[10, 0]}>
					<Text pink left>
						{"선택사항"}
					</Text>
				</SpaceContainer>
				<InputWrapWithButton
					input={{
						labelText: "추천인",
						maxLength: 13,
						icon: (
							<Icon
								format="png"
								icon={isChecked(getValidation.isDisabled.recommendId)}
							/>
						),
						placeholder: "추천인 ID",
						errortext: getValidation.recommendId.msg,
						...getFormProps("recommendId", "value"),
					}}
					button={{
						name: getValidation.isDisabled.recommendId
							? "추천완료"
							: "아이디추천",
						onClick: recommandProps,
						disabled: !getValidation.recommendId.result,
					}}
					errText={getValidation.recommendId.msg}
				/>
				<Space column={30} />
				<Button
					large
					filled
					onClick={sendJoin}
					disabled={verificationStore.getValidationSnsResult()}
				>
					{"동의하고 가입하기"}
				</Button>
			</InputListContainer>
		);
	}
);
