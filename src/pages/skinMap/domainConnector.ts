import {
	onlyHospitalMapping,
	productMapping,
} from "services/mapper/skinMapMapper";
import { useInjection, usePostDataApi } from "hooks";

import { AxiosResponse } from "axios";
import { RootStoreModel } from "models/RootStore";
import { SKIN_MAP_PAGING } from "constantDatas/api";
import { SkinMapDb } from "./skinMapDb";

const mapper = ({
	skinMapStore,
	interactionStore,
	userInfoStore,
	fetchStore,
}: RootStoreModel) => ({
	skinMapStore,
	interactionStore,
	userInfoStore,
	fetchStore,
});

export const DomainConnector = () => {
	const {
		skinMapStore,
		interactionStore,
		fetchStore,
		userInfoStore,
	} = useInjection(mapper);
	const { getDb } = SkinMapDb();
	const { setPostData } = usePostDataApi({});

	const getProduct = (excute?: (size?: AxiosResponse["data"]) => void) => {
		const index = skinMapStore.getProductIndex();

		const body = {
			...skinMapStore.getQuery(),
			remoteIp: userInfoStore.getUserIp(),
			memberId: userInfoStore.getUserId(),
		};

		skinMapStore.getSkinMapSearchState() === "detail" && excute
			? excute && excute()
			: setPostData({
					url: `${SKIN_MAP_PAGING}`,
					body: body,
					success: res => {
						excute && excute(res);

						searchState({
							productIndex: index,
							hospitalIndex: skinMapStore.getHospitalIndex(),
							product: [
								...skinMapStore.getSkinMapRestuls().product,
								...productMapping(res.results.products),
							],
							productSize: res.results.productsSize,
						});
						res.results.keyword &&
							skinMapStore.setSheetText(res.results.keyword);
					},
					fail: () => console.log("fail"),
			  });
	};

	const getHospital = (index: number) => {
		skinMapStore.setHospitalIndex(index);
		searchState({
			productIndex: skinMapStore.getProductIndex(),
			hospitalIndex: index,
			product: skinMapStore.getSkinMapRestuls().product,
		});
	};

	const searchState = ({
		productIndex,
		hospitalIndex,
		excute,
		product,
		productSize = skinMapStore.getStoreCount().event,
	}: {
		productIndex?: number;
		hospitalIndex?: number;
		excute?: (response: AxiosResponse["data"]) => void;
		product?: AxiosResponse["data"];
		productSize?: number;
	}) => {
		switch (skinMapStore.getSkinMapSearchState()) {
			case "default":
				return getDb({
					id: 2,
					productIndex: productIndex,
					hospitalIndex: hospitalIndex,
					excute: excute,
					product: product,
					productSize: productSize,
				});
			case "detail":
				return getDb({
					id: 3,
					productIndex: productIndex,
					hospitalIndex: hospitalIndex,
					excute: excute,
					product: product,
					productSize: productSize,
				});
		}
	};

	const noSearchResult = ({
		isFilter,
		excute,
	}: {
		isFilter?: boolean;
		excute?: () => void;
	}) => {
		isFilter
			? (skinMapStore.setSkinMapNoResult({
					result: false,
					filter: true,
			  }),
			  skinMapStore.setReturnFilterKeyword())
			: (skinMapStore.setSkinMapNoResult({ result: true }),
			  skinMapStore.setSkinMapDataReset(),
			  skinMapStore.setResetFilterKeyword(),
			  onlyHospitalMapping([]),
			  excute && excute());

		skinMapStore.setSheetShowReset();

		interactionStore.setIsShow(true);

		interactionStore.setIsEventShow(false);

		fetchStore.setState("complete");
	};
	return { searchState, noSearchResult, getProduct, getHospital };
};
