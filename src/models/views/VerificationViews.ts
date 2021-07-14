import { checkAllPass, checkEmptyHelper } from "helper/checkEmptyHelper";

import { VerificationType } from "models/entities";

export const VerificationViews = (self: VerificationType) => ({
	getVerification: () => {
		return self;
	},
	getValidationResult: () => {
		const nonNull = [
			self.id.value,
			self.name.value,
			self.email.value,
			self.secondPassword.value,
			self.mobileNumber.value,
		];

		const result = [
			self.id.result,
			self.passwordMatch,
			self.name.result,
			self.isDisabled.mobile,
			self.email.result,
		];
		return !(checkAllPass(result) && checkEmptyHelper(nonNull));
	},
	getValidationSnsResult: () => {
		const nonNull = [
			self.encId,
			self.snsType,
			self.name.value,
			self.email.value,
			self.mobileNumber.value,
		];

		const result = [
			self.encId !== "",
			self.name.result,
			self.isDisabled.mobile,
			self.email.result,
		];

		return !(checkAllPass(result) && checkEmptyHelper(nonNull));
	},

	getJoinMemberInfo: () => {
		const joinInfo = {
			memberId: self.id.value,
			memberPw: self.secondPassword.value,
			name: self.name.value,
			mobileNumber: self.mobileNumber.value,
			email: self.email.value,
			smsAgreeYn: self.isAgreeSms ? "Y" : "N",
			emailAgreeYn: self.isAgreeEmail ? "Y" : "N",
			recommendId: self.isDisabled.recommendId ? self.recommendId.value : "",
			uuid: "",
		};
		return joinInfo;
	},
	getSnsJoinMemberInfo: () => {
		const joinInfo = {
			snsType: self.snsType,
			encId: self.encId,
			name: self.name.value,
			mobileNumber: self.mobileNumber.value,
			email: self.email.value,
			smsAgreeYn: self.isAgreeSms ? "Y" : "N",
			emailAgreeYn: self.isAgreeEmail ? "Y" : "N",
			recommendId: self.isDisabled.recommendId ? self.recommendId.value : "",
			uuid: "",
		};
		return joinInfo;
	},
});
