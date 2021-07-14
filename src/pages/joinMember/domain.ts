import { VERIFY_SMS_CONFIRM, VERIFY_SMS_URL, recommendId } from "constantDatas";
import {
	confirmNumberMapper,
	failMsg,
} from "services/mapper/verificationMapper";
import { useGetDataApi, useInjection, usePostDataApi } from "hooks";
import { verifyRecommandMapper, verifySmsMapper } from "services";

import { RootStoreModel } from "models/RootStore";
import { observable } from "mobx";
import { timer } from "helper";

const mapper = ({ verificationStore, timerStore }: RootStoreModel) => ({
	verificationStore,
	timerStore,
});

const MemberJoinDomain = () => {
	const { verificationStore, timerStore } = useInjection(mapper);
	const { setGetData } = useGetDataApi({});
	const { setPostData } = usePostDataApi({});

	// 인증번호 요청
	const verifySms = () => {
		const requestSms = () => {
			timer({}).start;
			setPostData({
				url: VERIFY_SMS_URL,
				body: {
					mobileNumber: verificationStore.getVerification().mobileNumber.value,
				},
				success: verifySmsMapper,
				fail: (err: { errorName: string; msg: string }) => {
					verificationStore.setter("mobileNumber", {
						...verificationStore.getVerification().mobileNumber,
						msg: err.msg,
					});
				},
				isPending: false,
			});
		};
		// 인증번호 요청 중이 아니면 인증을 요청하고, 요청 중이라면 인증번호를 다시 보내겠냐는 컨펌창을 화면에 출력한다.
		if (!timerStore.isStartView()) {
			requestSms();
		} else {
			if (window.confirm("인증번호를 다시 보내시겠습니까?")) {
				timer({}).stop();
				requestSms();
			}
		}
	};

	// 인증번호 확인 요청
	const smsSetConfirmNumber = () => {
		setPostData({
			url: VERIFY_SMS_CONFIRM,
			body: {
				verifyCode: verificationStore.getVerification().confirmNumber.value,
				mobileNumber: verificationStore.getVerification().mobileNumber.value,
			},
			success: confirmNumberMapper,
			fail: failMsg,
			isPending: false,
		});
	};

	// 추천인
	const verifyRecommand = () => {
		setGetData({
			url: recommendId(verificationStore.getVerification().recommendId.value),
			success: verifyRecommandMapper,
			fail: failMsg,
		});
	};

	// sms동의
	const agreeSms = () => {
		verificationStore.setAgreeSms(
			!verificationStore.getVerification().isAgreeSms
		);
	};

	// 이메일 동의
	const agreeEmail = () => {
		verificationStore.setAgreeEmail(
			!verificationStore.getVerification().isAgreeEmail
		);
	};

	// 체크박스 리스트
	const checkList = [
		{
			text: "SMS/앱",
			forText: "sms",
			event: agreeSms,
			checked: verificationStore.getVerification().isAgreeSms,
		},
		{
			text: "이메일",
			forText: "email",
			event: agreeEmail,
			checked: verificationStore.getVerification().isAgreeEmail,
		},
	];

	return observable({
		verifySms,
		smsSetConfirmNumber,
		verifyRecommand,
		agreeSms,
		agreeEmail,
		checkList,
	});
};

export default MemberJoinDomain;
