import { SKIN_MAP, SKIN_MAP_HOSPITAL, SKIN_MAP_TOTAL } from "constantDatas/api";
import {
	onlyHospitalMapping,
	productMapping,
} from "services/mapper/skinMapMapper";
import { postMethod, useApiData } from "hooks/apiMethod";

import { AxiosResponse } from "axios";
import { DomainConnector } from "./domainConnector";
import { REMOTE_IP } from "services/utils/requestConfig";
import { RootStoreModel } from "models/RootStore";
import { SkinMapDb } from "./skinMapDb";
import { SkinMapKaKao } from "./skinMapKakao";
import { eventTracking } from "services/utils/analystics/amplitude";
import { removeDuplicateItemsByKey } from "helper";
import { useInjection } from "hooks";

const mapper = ({
	skinMapStore,
	interactionStore,
	userInfoStore,
}: RootStoreModel) => ({
	skinMapStore,
	interactionStore,
	userInfoStore,
});

export const SkinMapDomain = () => {
	const { skinMapStore, interactionStore, userInfoStore } = useInjection(
		mapper
	);
	const { dbUpdate, getHospitalLocationDb, isResult } = SkinMapDb();
	const { searchState, noSearchResult } = DomainConnector();
	const { setApiCall } = useApiData();
	const {
		getCenterLocation,
		getLocation,
		loadKakaoMap,
		removeKaKao,
		getQueryPosition,
	} = SkinMapKaKao();

	const getHospitalLocation = () => {
		getHospitalLocationDb(
			(hospital: AxiosResponse["data"]) => {
				removeKaKao();
				onlyHospitalMapping(hospital);
				loadKakaoMap(hospitalEvent);
			},
			() => noSearchResult({ excute: () => loadKakaoMap(hospitalEvent) })
		);
	};

	const commonSearch = (
		product: AxiosResponse["data"],
		hospital: AxiosResponse["data"],
		productSize: number,
		excute: () => void
	) => {
		dbUpdate({
			deleteId: 1,
			updateId: 2,
			productSize: productSize,
			hospital: hospital,
			excute: () => {
				interactionStore.setIsShow(false);
				skinMapStore.setProductIndex(skinMapStore.getProductIndex() + 1);
				skinMapStore.setSkinMapNoResult({ result: false, text: "" });
				skinMapStore.setSkinMapState("default");
				skinMapStore.setSheetShow({
					event: productSize > 0,
					hospital: product.length <= 0,
				});
				searchState({
					productIndex: 0,
					hospitalIndex: 0,
					product: product,
					productSize: productSize,
				});
				excute();
			},
		});
	};

	// 위치 검색
	const locationSearch = (isFilter?: boolean) => {
		skinMapStore.setIndexReset();
		getQueryPosition(
			skinMapStore.getCenterPosition().lng,
			skinMapStore.getCenterPosition().lat
		);
		skinMapStore.getEventProperties().showEventCount &&
			eventTracking("SKIN_MAP_EVENT_COUNT", skinMapStore.getEventProperties());

		const body = {
			...skinMapStore.getQuery(),
			remoteIp:
				userInfoStore.getUserInfo().ip === ""
					? REMOTE_IP ?? ""
					: userInfoStore.getUserInfo().ip,
			memberId: userInfoStore.getUserInfo().id,
		};
		return postMethod({
			url: SKIN_MAP,
			body: body,
			isEmptyHeader: true,
			success: res => {
				const product = res.results.products;
				const hospital = res.results.hospitals;
				const productSize = res.results.productsSize;
				res.results.hospitals.length > 0
					? commonSearch(productMapping(product), hospital, productSize, () => {
							getHospitalLocation();
							const location = hospital[0].location.split(",");
							getCenterLocation(location[1], location[0]);

							skinMapStore.setSheetText();
					  })
					: noSearchResult({
							isFilter: isFilter,
							excute: () => loadKakaoMap(hospitalEvent),
					  });
			},
			fail: () => loadKakaoMap(hospitalEvent),
		});
	};

	// 통합 검색
	const totalSearch = (isFilter?: boolean) => {
		skinMapStore.setIndexReset();
		const body = {
			...skinMapStore.getQuery(),
			remoteIp:
				userInfoStore.getUserInfo().ip === ""
					? REMOTE_IP ?? ""
					: userInfoStore.getUserInfo().ip,
			memberId: userInfoStore.getUserInfo().id,
		};
		skinMapStore.getEventProperties().showEventCount &&
			eventTracking("SKIN_MAP_EVENT_COUNT", skinMapStore.getEventProperties());
		eventTracking("SKIN_MAP_SEARCH_KEYWORD", {
			searckKeyword: skinMapStore.search,
		});
		(document.activeElement as HTMLElement).blur();
		return postMethod({
			url: SKIN_MAP_TOTAL,
			body: body,
			isEmptyHeader: true,
			success: res => {
				const product = res.results.products;
				const hospital = res.results.hospitals;
				const productSize = res.results.productsSize;

				hospital.length > 0
					? commonSearch(productMapping(product), hospital, productSize, () => {
							getHospitalLocation();

							const result = isResult(res);

							skinMapStore.setSheetText(res.results.keyword);
							result.lng !== "" && getQueryPosition(result.lng, result.lat);
					  })
					: noSearchResult({
							isFilter: isFilter,
							excute: () => loadKakaoMap(hospitalEvent),
					  });
			},
			fail: () => loadKakaoMap(hospitalEvent),
		});
	};

	// 병원 정보 클릭 이벤트
	const hospitalEvent = (customercode: string[]) => {
		skinMapStore.setIndexReset();

		(skinMapStore.getCurrentCustomersCode()[0] !== customercode[0] ||
			customercode.length > 1 ||
			skinMapStore.getCurrentCustomersCode().length > 1) &&
			(skinMapStore.setSkinMapDataReset(),
			skinMapStore.setCurrentCustomersCode(customercode),
			hospitalEventCall());
	};

	const hospitalEventCall = (index?: number) => {
		skinMapStore.getEventProperties().showEventCount &&
			eventTracking("SKIN_MAP_EVENT_COUNT", skinMapStore.getEventProperties());

		const indexParsing = index ? index * 10 : 0;

		const hospitalCall = () =>
			postMethod({
				url: SKIN_MAP_HOSPITAL,
				isEmptyHeader: true,
				body: {
					...skinMapStore.getDetailSendData(),
					productFrom: indexParsing.toString(),
					remoteIp:
						userInfoStore.getUserInfo().ip === ""
							? REMOTE_IP ?? ""
							: userInfoStore.getUserInfo().ip,
					memberId: userInfoStore.getUserInfo().id,
				},
				success: res => {
					const product = res.results.products;
					const hospital = res.results.hospitalInfo;
					const productSize = res.results.productsSize;
					dbUpdate({
						deleteId: 3,
						updateId: 3,
						productSize: productSize,
						hospital: hospital,
						hasLocation: false,
						groupLen:
							skinMapStore.getCurrentCustomersCode().length - 1
								? skinMapStore.getCurrentCustomersCode().length
								: hospital.length + 1,
						excute: () => {
							skinMapStore.setSkinMapState("detail");
							searchState({
								productIndex: skinMapStore.getProductIndex(),
								hospitalIndex: skinMapStore.getHospitalIndex(),
								product: removeDuplicateItemsByKey(
									[
										...skinMapStore.getSkinMapRestuls().product,
										...productMapping(product),
									],
									"productcode"
								),
								productSize: productSize,
							});
							skinMapStore.setHospitalSheetText(
								hospital[0].hospitalname,
								hospital.length
							);

							skinMapStore.setSkinMapNoResult({ result: false, text: "" });
							skinMapStore.setSheetShow({
								event: productSize > 0,
								hospital:
									indexParsing > 0 && skinMapStore.gethospitalShow()
										? skinMapStore.gethospitalShow()
										: productSize <= 0,
							});
						},
					});
				},
				fail: err => console.log(err),
			});
		setApiCall({ call: [hospitalCall()] });
	};

	const getCurrentLocation = () => getLocation(locationSearch);

	return {
		locationSearch,
		totalSearch,
		getCurrentLocation,
		hospitalEventCall,
	};
};
