import { VerificationAction } from "models/actions";
import { VerificationProps } from "models/entities";
import { VerificationViews } from "models/views";
import { getQueryParam } from "helper";

export const VerificationStore = VerificationProps.actions(
	VerificationAction
).views(VerificationViews);

const isAddRecommendId = getQueryParam("friendid") === "" ? false : true;

const initvalue = {
	result: false,
	msg: "",
	value: "",
};
export const verificationItems = {
	id: initvalue,
	firstPassword: initvalue,
	secondPassword: initvalue,
	passwordMatch: false,
	name: initvalue,
	mobileNumber: initvalue,
	confirmNumber: initvalue,
	email: initvalue,
	recommendId: {
		result: isAddRecommendId,
		msg: "",
		value: getQueryParam("friendid"),
	},
	isValidFormat: initvalue,
	isJoinmember: initvalue,
	isDisabled: {
		mobile: false,
		getPoint: false,
		recommendId: isAddRecommendId,
	},
	isAgreeSms: true,
	isAgreeEmail: true,
	snsType: "",
	encId: "",
};
export const verificationStore = VerificationStore.create(verificationItems);
