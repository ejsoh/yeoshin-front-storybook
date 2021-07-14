import { COUPON_LIST, COUPON_REGIST } from "constantDatas/api";
import { Seo, queryParams } from "helper";
import { getMethod, putMethod, useApiData } from "hooks/apiMethod";

import React from "react";
import { SubPageTemplate } from "components/templates";
import { UserCouponContents } from "components/organisms/mypage/MypageSub/UserCouponContents";
import { getCouponMapper } from "services/mapper/subPageMapper/couponMapper";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import qs from "qs";
import { useInjection } from "hooks";

export const UserCoupon = observer(() => {
	const { getCouponList } = CouponDomain();
	useApiData({ call: [getCouponList] });

	return (
		<SubPageTemplate
			header={"나의쿠폰"}
			seo={<Seo title="나의쿠폰" />}
			contents={<UserCouponContents />}
		/>
	);
});

export const CouponDomain = () => {
	const { setApiCall } = useApiData();
	const { interactionStore, fetchStore } = useInjection(mapper);

	const getCouponList = () =>
		getMethod({
			url: queryParams(COUPON_LIST, [
				["pageNum", interactionStore.getCurrentPageIndex().toString()],
				["listMaxCount", "10"],
			]),
			success: res => {
				fetchStore.setResponse(getCouponMapper(res));
				interactionStore.setPageInfo({
					url: COUPON_LIST,
					mapper: getCouponMapper,
				});
			},
			fail: () => fetchStore.setResponse({ data: false }),
		});

	const registCoupon = (code: string) => {
		const regist = putMethod({
			url: COUPON_REGIST,
			body: qs.stringify({ couponNumber: code }),
			success: () => {
				interactionStore.setIsAlert("쿠폰 등록이 성공하였습니다.");
				setApiCall({ call: [getCouponList()], stateAlwaysDone: true });
			},
			fail: err => {
				interactionStore.setValidationMessage({
					coupon: err.msg,
				});
			},
			hasCustomHeader: { "content-type": "application/x-www-form-urlencoded" },
		});
		setApiCall({ call: [regist], stateAlwaysDone: true });
	};

	return { registCoupon, getCouponList };
};
