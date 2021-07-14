import { Seo, queryParams } from "helper";
import { getMethod, useApiData } from "hooks/apiMethod";

import { DetailPageTemplate } from "components/templates/MyPages/DetailPageTemplate";
import { NOTICE } from "constantDatas/api";
import { NoticeContents } from "components/organisms/mypage/MypageSub/NoticeContents";
import { NoticeDetailContents } from "components/organisms/mypage/MypageSub/NoticeDetailContents";
import React from "react";
import { SubPageTemplate } from "components/templates";
import { mapper } from "models/RootStore";
import { noticeMapper } from "services/mapper/subPageMapper/noticeMapper";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";

export const Notice = observer(() => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	React.useEffect(() => {
		interactionStore.setPageInfo({ url: NOTICE, mapper: noticeMapper });
	}, []);
	const getNotice = getMethod({
		url: queryParams(NOTICE, [
			["pageNum", interactionStore.getCurrentPageIndex().toString()],
			["listMaxCount", "10"],
		]),
		success: res => {
			fetchStore.setResponse(noticeMapper(res));
		},
		fail: () => fetchStore.setResponse({ data: false }),
	});
	useApiData({ call: [getNotice] });
	return (
		<SubPageTemplate
			header={"공지사항"}
			seo={<Seo title="공지사항" />}
			contents={<NoticeContents />}
		/>
	);
});

export const NoticeDetail = observer(() => {
	const { fetchStore } = useInjection(mapper);
	React.useEffect(() => {
		fetchStore.setState("done");
	}, []);
	return (
		<DetailPageTemplate
			location={"/notice"}
			header={"공지사항"}
			seo={<Seo title={"공지사항"} />}
			contents={<NoticeDetailContents />}
		/>
	);
});
