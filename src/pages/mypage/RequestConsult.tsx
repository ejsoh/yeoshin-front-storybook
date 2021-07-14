import { CONSULTATIONLIST, NOTICE } from "constantDatas/api";
import { Seo, queryParams } from "helper";
import { postMethod, useApiData } from "hooks/apiMethod";
import { DetailPageTemplate } from "components/templates/MyPages/DetailPageTemplate";
import React from "react";
import { RequestConsultContents } from "components/organisms/mypage/MypageSub/RequestConsultContents";
import { mapper } from "models/RootStore";
import { noticeMapper } from "services/mapper/subPageMapper/noticeMapper";
import { useInjection } from "hooks";
import { useHistory } from "react-router";

export const RequestConsult = () => {
	const { fetchStore } = useInjection(mapper);
	React.useEffect(() => {
		fetchStore.setState("done");
	}, []);
	return (
		<DetailPageTemplate
			location={"/myConsult"}
			header={"문의 남기기"}
			seo={<Seo title="문의 남기기" />}
			contents={<RequestConsultContents />}
		/>
	);
};

export const ServicePartnerDomain = () => {
	const { setApiCall } = useApiData();
	const { fetchStore, interactionStore } = useInjection(mapper);

	const sendService = () => {
		const service = postMethod({
			url: queryParams(NOTICE, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse(noticeMapper(res));
			},
			fail: () => {
				fetchStore.setResponse({ data: false });
			},
			body: { title: "", content: "" },
		});
		setApiCall({ call: [service] });
	};

	return { sendService };
};

export const RequestConsultDomain = () => {
	const { interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();
	const history = useHistory();
	const sendData = (form: FormData) => {
		const excute = () =>
			postMethod({
				url: CONSULTATIONLIST,
				isFormData: true,
				body: form,
				success: () => {
					interactionStore.setIsAlert(
						`문의가 정상적으로 등록되었습니다.

빠른 답변드리도록 노력하겠습니다.

감사합니다.`,
						() => history.goBack()
					);
				},
				fail: err => {
					interactionStore.setIsAlert(err.msg);
				},
			});
		setApiCall({ call: [excute()], stateAlwaysDone: true });
	};
	return { sendData };
};
