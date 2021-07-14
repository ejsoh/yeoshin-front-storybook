import { postMethod, useApiData } from "hooks/apiMethod";

import React from "react";
import { SEND_SERVICE_PARTNER } from "constantDatas/api";
import { Seo } from "helper";
import { ServicePartnerContents } from "components/organisms/mypage/MypageSub/ServicePartnerContents";
import { SubPageTemplate } from "components/templates";
import { checkUserInfoEntity } from "services/utils/checkUserInfoEntity";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const ServicePartner = observer(() => {
	const { fetchStore, interactionStore, userInfoStore } = useInjection(mapper);
	React.useEffect(() => {
		checkUserInfoEntity(() => {
			interactionStore.setInputValue({
				name: userInfoStore.getUserInfo().name,
				mobile: userInfoStore.getUserInfo().mobile,
				email: userInfoStore.getUserInfo().email,
			});
		});
		fetchStore.setState("done");
	}, []);

	return (
		<SubPageTemplate
			header={"제휴/광고문의"}
			seo={<Seo title="제휴/광고문의" />}
			contents={<ServicePartnerContents />}
		/>
	);
});

export const ServicePartnerDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);

	const sendService = () => {
		const value = interactionStore.getInputValues();
		const partner = postMethod({
			url: SEND_SERVICE_PARTNER,
			success: res => {
				interactionStore.setIsAlert("등록되었습니다.");
			},
			fail: () => {
				fetchStore.setResponse({ data: false });
			},
			body: {
				menuCode: "partner",
				customerName: value.name,
				telephoneNumber: value.mobile,
				email: value.email,
				title: value.title,
				content: value.content,
			},
		});
		setApiCall({ call: [partner] });
	};

	return { sendService };
};
