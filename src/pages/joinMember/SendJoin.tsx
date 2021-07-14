import { AxiosResponse } from "axios";
import {
	JOINMEMBER_URL,
	LOGIN_URL,
	SNS_JOINMEMBER_URL,
	SNS_LOGIN_URL,
} from "constantDatas/api";
import { useInjection } from "hooks";

import { mapper } from "models/RootStore";
import { failMsg } from "services/mapper/verificationMapper";
import { postMethod, useApiData } from "hooks/apiMethod";
import { deviceInfo } from "services/utils/checkUserInfoEntity";
import { aceUserInfo } from "services/utils/analystics/aceCounter";
import { pixelTracking } from "services/utils/analystics/pixel";
import { getIpAction } from "services/utils/getIp";

export const JoinMembers = (getInfo: AxiosResponse["data"], isSns: boolean) => {
	const { setApiCall } = useApiData();
	const device = deviceInfo();
	const { verificationStore, userInfoStore, interactionStore } = useInjection(
		mapper
	);

	const joinUs = (ip: string) => {
		const deviceType = device.deviceType;

		const uuid = device.isInapp && { uuid: device.appInfo().uuid };

		const snsUrl = {
			join: SNS_JOINMEMBER_URL(deviceType),
			login: SNS_LOGIN_URL(deviceType),
			body: {
				encId: getInfo.encId,
				snsType: getInfo.snsType,
				...uuid,
			},
		};
		const generalUrl = {
			join: JOINMEMBER_URL(deviceType),
			login: LOGIN_URL(deviceType),
			body: {
				memberId: getInfo.memberId,
				memberPw: getInfo.memberPw,
				...uuid,
			},
		};
		const joinInfo = isSns ? snsUrl : generalUrl;
		userInfoStore.setUserName(getInfo.name);
		const path = window.location.origin;
		aceUserInfo(
			`var _jid = '${isSns ? getInfo.encId : getInfo.memberId}'; 
			var _jn='join';`
		);
		pixelTracking({
			event: "Join",
			value: isSns ? getInfo.encId : getInfo.memberId,
			joinType: isSns ? getInfo.snsType : "web",
			inviteId: getInfo.recommendId,
		});

		const login = postMethod({
			url: joinInfo.login,
			body: {
				...joinInfo.body,
				ipAddress: ip,
			},
			success: () =>
				window.location.replace(
					`${path}/memberJoinComplete?id=${getInfo.name}`
				),
			fail: err => interactionStore.setIsAlert(err.msg),
		});

		const sendJoinInfo = () =>
			postMethod({
				url: joinInfo.join,
				body: { ...getInfo, ...uuid, ipAddress: ip },
				success: () => {
					console.log("success");
				},
				fail: failMsg,
				chainingExcute: () => login,
			});
		return setApiCall({ call: [sendJoinInfo()], stateAlwaysPending: true });
	};

	const sendJoin = () => {
		verificationStore.getVerification().isDisabled.getPoint &&
		getInfo.recommendId !== ""
			? interactionStore.setIsAlert(
					"탈퇴 이력이 있어, 가입에 한해 추천인 포인트가 적립되지 않습니다.",
					() => getIpAction(joinUs)
			  )
			: getIpAction(joinUs);
	};
	return { sendJoin };
};
