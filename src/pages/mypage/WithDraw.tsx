import { postMethod, useApiData } from "hooks/apiMethod";

import { DetailPageTemplate } from "components/templates/MyPages/DetailPageTemplate";
import { MEMBER_WITHDRAW } from "constantDatas/api";
import React from "react";
import { Seo } from "helper";
import { WithDrawContents } from "components/organisms/mypage";
import { checkUserInfoEntity } from "services/utils/checkUserInfoEntity";
import { logout } from "services";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { aceUserInfo } from "services/utils/analystics/aceCounter";

export const WithDraw = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();
	const password = interactionStore.getInputValues().password;
	const confirmWithDraw = () => {
		password
			? interactionStore.setIsConfirm(
					"정말 탈퇴 하시겠습니까?",
					true,
					true,
					() => goWithDraw()
			  )
			: interactionStore.setValidationMessage({
					pwd: "패스워드를 입력해 주세요.",
			  });
	};
	const goWithDraw = () => {
		aceUserInfo("var _jn = 'withdraw';");
		const callWithdraw = () =>
			postMethod({
				url: MEMBER_WITHDRAW,
				body: { memberPw: password },
				success: res => {
					interactionStore.setIsAlert("이용해 주셔서 감사합니다.", () =>
						logout()
					);
				},
				fail: err => {
					interactionStore.setIsAlert(err.msg);
				},
			});
		setApiCall({ call: [callWithdraw()] });
	};

	React.useEffect(() => {
		checkUserInfoEntity(() => {
			fetchStore.setState("done");
		});
	}, []);

	return (
		<DetailPageTemplate
			location=""
			header={"회원탈퇴"}
			seo={<Seo title="회원탈퇴" />}
			contents={<WithDrawContents withdraw={confirmWithDraw} />}
		/>
	);
});
