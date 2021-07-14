import { getMethod, postMethod, putMethod, useApiData } from "hooks/apiMethod";
import { interactionStore, verificationStore } from "models/stores";
import { CustomInfo } from "components/organisms/mypage/MypageSub/ModifyUserInfoStyle";
import { CustomPageTemplate } from "components/templates/MyPages/CustomPageTemplate";
import { Header } from "components/organisms";
import { MYINFO_MODIFY } from "constantDatas/api";
import MemberJoinDomain from "pages/joinMember/domain";
import { ModifyUserInfoContents } from "components/organisms/mypage";
import React from "react";
import { Seo } from "helper";
import {
	checkUserInfoEntity,
	updateUserInfo,
} from "services/utils/checkUserInfoEntity";
import { mapper } from "models/RootStore";
import { useInjection } from "hooks";
import { validationState } from "components/molecules/anchors/ValidationAnchor";
import qs from "qs";
import { SNS_CONNECTION, verifyNickname } from "constantDatas/api/accounts";

export const ModifyUserInfo = () => {
	const { fetchStore, userInfoStore, timerStore } = useInjection(mapper);

	React.useEffect(() => {
		checkUserInfoEntity(() => {
			userInfoStore.setUserInfoSpecific(
				"newNickName",
				userInfoStore.getUserInfo().nickname
			);
			fetchStore.setState("done");
			verificationStore.setSecondPassword("");
		});
		return () => {
			interactionStore.setValidationMessage({});
			timerStore.SetToggleShow(false);
			timerStore.setIsStart(false);
		};
	}, []);

	return (
		<CustomPageTemplate
			header={
				<Header
					text={"내 정보수정"}
					location={"/myPage"}
					customLink={<CustomInfo />}
				/>
			}
			seo={<Seo title="내 정보수정" />}
			contents={<ModifyUserInfoContents />}
		/>
	);
};

export const ModifyUserInfoDomain = () => {
	const { verificationStore, userInfoStore } = useInjection(mapper);
	const { smsSetConfirmNumber, verifySms } = MemberJoinDomain();
	const { setApiCall } = useApiData();
	const valid = validationState();

	const checkNickName = (nickname: string) => {
		const goCheck = getMethod({
			url: verifyNickname(nickname),
			success: res => {
				const availableNickname = res.results.nicknameCnt <= 0;

				userInfoStore.setChecked("isCheckedNickName", availableNickname);

				interactionStore.setValidationMessage({
					nickname: valid.usedNickname(availableNickname),
				});
				availableNickname &&
					userInfoStore.setUserInfoSpecific("nickname", nickname);
			},
			fail: () => console.log("fail"),
		});

		nickname === userInfoStore.getUserInfo().nickname
			? interactionStore.setValidationMessage({
					nickname: valid.sameNickname(
						nickname === userInfoStore.getUserInfo().nickname
					),
			  })
			: setApiCall({ call: [goCheck], stateAlwaysDone: true });
	};

	const goModify = () => {
		const currentDate = new Date().getFullYear();
		const data = userInfoStore.getUserInfo();
		const date = interactionStore.getDate();
		const parsing = (result: string) => {
			return verificationStore.getVerification().mobileNumber.value === ""
				? "000-0000-0000"
				: result.slice(0, 3) +
						"-" +
						result.slice(3, 7) +
						"-" +
						result.slice(7, 15);
		};

		const sendData = {
			sex: data.sex,
			name: data.name,
			birthy: date.year.toString(),
			birthm: date.month.toString(),
			birthd: date.day.toString(),
			age: `${currentDate - date.year + 1}`,
			nickname: data.nickname,
			mobileNumber: parsing(
				verificationStore.getVerification().mobileNumber.value
			),
			email: data.email,
			smsAgreeYn: data.smsCheck,
			emailAgreeYn: data.emailCheck,
			birthdayView: data.birthdayView,
		};
		const result = verificationStore.getVerification().secondPassword.value !==
			"" && {
			memberPw: verificationStore.getVerification().secondPassword.value,
		};

		return postMethod({
			url: MYINFO_MODIFY,
			body: { ...sendData, ...result },
			success: () => {
				interactionStore.setIsAlert("수정이 완료 되었습니다.");
			},
			fail: err => console.log(err),
		});
	};

	const infoValidation = () => {
		const data = userInfoStore.getUserInfo();
		console.log(data.newNickName);
		switch (true) {
			case data.name === "":
				return interactionStore.setValidationMessage({
					name: valid.name(false),
				});
			case data.nickname === "" ||
				data.newNickName === "" ||
				!userInfoStore.getIsCheckedNickName() ||
				data.nickname !== data.newNickName:
				return interactionStore.setValidationMessage({
					nickname: valid.checkNickname(false),
				});
			case data.mobile === "" ||
				verificationStore.getVerification().mobileNumber.value === "" ||
				(data.mobile !==
					verificationStore.getVerification().mobileNumber.value &&
					!verificationStore.getVerification().isDisabled.mobile):
				return interactionStore.setValidationMessage({
					mobile: valid.mobile(false),
				});
			case data.email === "":
				return interactionStore.setValidationMessage({
					email: valid.email(false),
				});
			default:
				return setApiCall({ call: [goModify()] });
		}
	};

	const sendSms = () => {
		verificationStore.setter("confirmNumber", {
			result: false,
			value: "",
			msg: "",
		});

		return verifySms();
	};

	const confirmNumber = () => {
		smsSetConfirmNumber();
	};

	const snsConnect = (id: string, type: string) => {
		const connect = () =>
			putMethod({
				url: SNS_CONNECTION,
				body: qs.stringify({ snsType: type, encId: id }),
				hasCustomHeader: {
					"content-type": "application/x-www-form-urlencoded",
				},
				success: () => {
					interactionStore.setIsAlert("연동이 완료 되었습니다.", () => {
						window.location.href = "/modifyUserInfo";
					});
				},
				fail: err => {
					interactionStore.setIsAlert(err.msg, () => {
						window.history.replaceState({}, "goback", "/myPage");
						window.location.href = "/modifyUserInfo";
					});
				},

				chainingExcute: () => updateUserInfo().cacheSync,
			});

		setApiCall({ call: [connect()] });
	};

	return {
		checkNickName,
		goModify,
		sendSms,
		confirmNumber,
		infoValidation,
		snsConnect,
	};
};
