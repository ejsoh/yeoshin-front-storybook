import { VerificationType } from "models/entities";
import { flow } from "mobx-state-tree";
import { getActionFetcher } from "helper/getActionFetcher";
import { validationHelper } from "helper/validateFormatHelper";
import { verifyId } from "constantDatas";

type Values<T> = T[keyof T];
type VerificationItems = Values<VerificationType>;

export const VerificationAction = (self: VerificationItems) => {
	const valid = validationHelper;

	const setFirstpassword = (pwd: string) => {
		const isValid = valid(pwd, 5)("minLength");
		self.firstPassword = isValid;
		isMatch();
	};

	const setSecondPassword = (pwd: string) => {
		const isValid = valid(pwd, 5)("minLength");
		self.secondPassword = isValid;
		self.passwordMatch = isValid.result;
		isMatch();
	};

	// 비밀번호 매치 결과를 저장한다.
	const isMatch = () => {
		const isMatch =
			self.firstPassword.value === self.secondPassword.value &&
			self.secondPassword.result &&
			self.firstPassword.result;
		self.passwordMatch = isMatch;
	};

	const setEmail = (email: string) => {
		const isValidEmail = valid(email)("email");
		self.email = isValidEmail;
	};

	const setId = async (id: string) => {
		const validResult = valid(id, 3)("minLength", "special");
		validResult.result
			? flow(function* () {
					let response;
					try {
						response = yield getActionFetcher({
							success: res => {
								const isUsedId = res.data.results.memberCnt > 0;
								return {
									value: id,
									result: isUsedId ? false : true,
									msg: isUsedId ? "이미 사용 중인 아이디 입니다." : "",
								};
							},
							fail: err => {
								console.log(err);
							},
							url: verifyId(id),
						});
					} catch (error) {
						console.error("Failed to fetch projects", error);
					}
					return (self.id = validResult.result ? response : validResult);
			  })()
			: (self.id = validResult);
	};
	const setRecommendId = (id: string) => {
		const isValidId = valid(id, 3)("minLength");
		self.recommendId = isValidId;
		self.isDisabled = { ...self.isDisabled, recommendId: false };
	};

	const setMobileNumber = (phoneNumber: string) => {
		const isValidSmsNumber = valid(phoneNumber, 9)("minLength", "number");
		self.mobileNumber = isValidSmsNumber;
		self.isDisabled = { ...self.isDisabled, mobile: false };
	};

	const setConfirmNumber = (phoneNumber: string) => {
		const isValidSmsConfirmNumber = valid(phoneNumber)("number");
		self.confirmNumber = isValidSmsConfirmNumber;
	};

	const setName = (name: string) => {
		const isValidName = valid(name, 1)("minLength");
		self.name = isValidName;
	};

	const setAgreeSms = (agree: boolean) => {
		self.isAgreeSms = agree;
	};

	const setAgreeEmail = (agree: boolean) => {
		self.isAgreeEmail = agree;
	};

	const setDisabled = (disabled: VerificationType["isDisabled"]) => {
		self.isDisabled = { ...disabled };
	};

	// 유효성검사가 완료된 정보를 key 단위로 직접 저장하는 메서드
	const setter = (
		item: string,
		info: { result: boolean; msg: string; value: string }
	) => {
		self[item] = { ...info };
	};

	// 유효성 검사가 완료된 정보를 객체 단위로 저장하는 메서드
	const setPartial = (items: { [key: string]: string }) => {
		Object.entries(items).forEach(([key, value]) => {
			const typeCheck = typeof self[key];
			self[key] =
				typeCheck === "object"
					? { ...self[key], result: value !== "", value: value }
					: value;
		});
	};

	// 저장된 정보를 리셋하는 메서드
	const reset = (init: VerificationType) => {
		Object.entries(init).forEach(([key, value]) => {
			self[key] = value;
		});
	};

	return {
		setFirstpassword,
		setSecondPassword,
		isMatch,
		setEmail,
		setId,
		setRecommendId,
		setMobileNumber,
		setConfirmNumber,
		setName,
		setAgreeSms,
		setAgreeEmail,
		setter,
		setDisabled,
		setPartial,
		reset,
	};
};
