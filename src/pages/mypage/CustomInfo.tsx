import {
	GET_DEFAULT_AREA,
	GET_MEMBER_AREA,
	GET_MEMBER_BODY,
	GET_MEMBER_INFO_MODIFY,
} from "constantDatas/api";
import {
	areaMapper,
	customInfoMapper,
} from "services/mapper/subPageMapper/customInfoMapper";
import { getMethod, putMethod, useApiData } from "hooks/apiMethod";

import { CustomInfoContents } from "components/organisms/mypage/MypageSub/CustomInfoContents";
import { DetailPageTemplate } from "components/templates/MyPages/DetailPageTemplate";
import { ModifyUserInfoDomain } from "./ModifyUserInfo";
import React from "react";
import { Seo } from "helper";
import { checkUserInfoEntity } from "services/utils/checkUserInfoEntity";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { validationState } from "components/molecules/anchors/ValidationAnchor";

export const CustomInfo = observer(() => {
	const { getBodyPart, getDefaultArea } = CustomInfoDomain();
	const { userInfoStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();

	React.useEffect(() => {
		checkUserInfoEntity(() => {
			userInfoStore.setUserInfoSpecific(
				"newNickName",
				userInfoStore.getUserInfo().nickname
			);
		});
		setApiCall({ call: [getDefaultArea, getBodyPart] });
		return () => interactionStore.setValidationMessage({});
	}, []);

	return (
		<DetailPageTemplate
			location=""
			header={"맞춤정보 설정"}
			seo={<Seo title="맞춤정보 설정" />}
			contents={<CustomInfoContents />}
		/>
	);
});

export const CustomInfoDomain = () => {
	const { fetchStore, userInfoStore, interactionStore } = useInjection(mapper);
	const { setApiCall } = useApiData();
	const { goModify } = ModifyUserInfoDomain();
	const valid = validationState();
	const getBodyPart = getMethod({
		url: GET_MEMBER_BODY,
		success: res => {
			getArea();
			fetchStore.setResponse({
				...fetchStore.fetchStore(),
				...{ body: customInfoMapper(res) },
			});
		},
		fail: e => console.log(e),
	});

	const getArea = () => {
		const getArea = getMethod({
			url: GET_MEMBER_AREA,
			success: res =>
				fetchStore.setResponse({
					...fetchStore.fetchStore(),
					selectedArea: res.results,
				}),
			fail: err => console.log("fail"),
		});
		setApiCall({ call: [getArea] });
	};

	const getDefaultArea = getMethod({
		url: GET_DEFAULT_AREA,
		success: res =>
			fetchStore.setResponse({
				...fetchStore.fetchStore(),
				...{ defaultArea: areaMapper(res), selectedArea: [] },
			}),
		fail: err => fetchStore.setResponse({ data: false }),
	});

	const partFilter = () => {
		const getPart = (key: string) => {
			switch (true) {
				case key === "face":
					return "얼굴";
				case key === "skin":
					return "피부";
				case key === "body":
					return "바디";
				case key === "etc":
					return "기타";
			}
		};
		const result = [];
		for (const [key, value] of Object.entries(
			fetchStore.fetchStore().body.data
		)) {
			const filtered = (value as { [key: string]: string }[])
				.filter((item: { [key: string]: string }) => item.isSelected && item)
				.map((item: { [key: string]: string }) =>
					`${getPart(key)}|${item.name}`.trim()
				);
			result.push(filtered);
		}
		return result.flat();
	};

	const registerCustomInfo = () => {
		const bodyData = {
			attentionBodyPart: partFilter(),
			attentionArea: fetchStore.fetchStore().selectedArea,
		};

		const userBirthDay = new Date(
			`${interactionStore.getDate().year}/${interactionStore.getDate().month}/${
				interactionStore.getDate().day
			}`
		).toString();
		const lessThanToday =
			new Date(
				`${interactionStore.getDate().year}/${
					interactionStore.getDate().month
				}/${interactionStore.getDate().day}`
			).getTime() <= new Date().getTime();

		const goRegist = () =>
			putMethod({
				url: GET_MEMBER_INFO_MODIFY,
				body: JSON.stringify(bodyData),
				success: () => interactionStore.setValidationMessage({}),
				fail: e => alert(e.msg),
			});

		switch (true) {
			case userInfoStore.getUserInfo().nickname === "" ||
				!userInfoStore.getIsCheckedNickName() ||
				userInfoStore.getUserInfo().newNickName === "" ||
				userInfoStore.getUserInfo().nickname !==
					userInfoStore.getUserInfo().newNickName:
				return interactionStore.setValidationMessage({
					nickname: valid.checkNickname(false),
				});

			case userBirthDay === "Invalid Date" || !lessThanToday:
				return interactionStore.setValidationMessage({
					birth: valid.birth(false),
				});

			case partFilter().length <= 0:
				return interactionStore.setValidationMessage({
					part: valid.part(false),
				});

			case fetchStore.fetchStore().selectedArea.length <= 0:
				return interactionStore.setValidationMessage({
					area: valid.area(false),
				});

			default:
				return setApiCall({ call: [goRegist(), goModify()] });
		}
	};

	return {
		getBodyPart,
		getDefaultArea,
		getArea,
		registerCustomInfo,
		partFilter,
	};
};
