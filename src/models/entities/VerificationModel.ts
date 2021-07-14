import { Instance, types } from "mobx-state-tree";

export type VerificationType = Instance<typeof VerificationProps>;

const verificationResult = types.model({
	result: types.boolean,
	msg: types.string,
	value: types.string,
});

export const VerificationProps = types.model({
	id: verificationResult,
	firstPassword: verificationResult,
	secondPassword: verificationResult,
	passwordMatch: types.boolean,
	name: verificationResult,
	mobileNumber: verificationResult,
	confirmNumber: verificationResult,
	email: verificationResult,
	recommendId: verificationResult,
	isValidFormat: verificationResult,
	isJoinmember: verificationResult,
	isDisabled: types.model({
		mobile: types.boolean,
		getPoint: types.boolean,
		recommendId: types.boolean,
	}),

	isAgreeSms: types.boolean,
	isAgreeEmail: types.boolean,
	snsType: types.string,
	encId: types.string,
});
