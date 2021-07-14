import { rootStore } from "../../models/RootStore";
import { timer } from "helper";

export const failMsg = (err: { [key: string]: string }) => {
	console.log(JSON.stringify(err.msg));
};

export const verifyRecommandMapper = (args: {
	[key: string]: { [key: string]: number };
}) => {
	const store = rootStore;
	const isRecommend = args.results.memberCnt > 0;
	const message = isRecommend ? "" : "일치하는 아이디가 없습니다.";

	store.verificationStore.setDisabled({
		...store.verificationStore.getVerification().isDisabled,
		recommendId: isRecommend,
	});

	store.verificationStore.setter("recommendId", {
		...store.verificationStore.getVerification().recommendId,
		msg: message,
	});
};

export const verifySmsMapper = (args: {
	[key: string]: { [key: string]: string };
}) => {
	const store = rootStore;
	const result = args.results;
	const getPoint = result.isDeleted === "Y" ? true : false;

	store.timerStore.SetToggleShow(true);

	store.timerStore.setIsStart(true);

	store.verificationStore.setDisabled({
		...store.verificationStore.getVerification().isDisabled,
		getPoint: getPoint,
	});

	store.verificationStore.setter("mobileNumber", {
		...store.verificationStore.getVerification().mobileNumber,
		msg: result.msg,
	});
};

export const confirmNumberMapper = (args: {
	[key: string]: { [key: string]: string };
}) => {
	const store = rootStore;
	const isSuccess = args.results.verifyStatus === "Y" ? true : false;
	const message = isSuccess ? "인증되었습니다." : "인증번호를 확인해주세요";

	// 인증 토글 닫는다.
	store.timerStore.SetToggleShow(!isSuccess);

	// 인증 확인 저장
	store.verificationStore.setDisabled({
		...store.verificationStore.getVerification().isDisabled,
		mobile: isSuccess,
	});

	// 스토어에 인증확인 정보를 저장한다.
	store.verificationStore.setter("confirmNumber", {
		value: "",
		result: isSuccess,
		msg: message,
	});

	// 인증 성공 시, 타이머가 종료하고, 모바일 메세지를 삭제한다.
	isSuccess &&
		(timer({}).stop(),
		store.timerStore.setIsStart(false),
		store.verificationStore.setter("mobileNumber", {
			...store.verificationStore.getVerification().mobileNumber,
			msg: "",
		}));
};
