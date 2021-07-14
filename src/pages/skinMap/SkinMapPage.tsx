// kakao를 글로벌 선언, 객체 any로 처리 할수 밖에 없음
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { mapper } from "models/RootStore";
import { Seo } from "helper";
import { SkinMapDomain } from "./domain";
import { SkinMapTemplate } from "components/templates";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { SkinMapKaKao } from "./skinMapKakao";
import { SkinMapDb } from "./skinMapDb";
import { userTracking } from "services/utils/analystics/amplitude";
import { UserDomain } from "./userDomain";
import { useApiData } from "hooks/apiMethod";
import { checkUserInfoEntity } from "services/utils/checkUserInfoEntity";
import { SkinMap } from "components/organisms/skinMap";

export const SkinMapPage = observer(() => {
	const { skinMapStore } = useInjection(mapper);
	const { locationSearch, totalSearch } = SkinMapDomain();
	const { hospitalLikeList } = UserDomain();
	const { loadKakaoMap } = SkinMapKaKao();
	const { dbClear } = SkinMapDb();
	const { setApiCall } = useApiData();

	useEffect(() => {
		checkUserInfoEntity(() => {
			setApiCall({ call: [hospitalLikeList(), locationSearch()] });
		});
		userTracking();

		loadKakaoMap();

		// 컴포넌트가 해제되면 카카오맵을 지운다.
		return () => {
			const kakaoMap = document.getElementById("kakaomap");
			kakaoMap && document.body.removeChild(kakaoMap);
			dbClear();
		};
	}, []);

	// 재 검색
	const reSearch = () => {
		skinMapStore.setSkinMapNoResult({
			result: false,
			filter: false,
			text: "",
		});
		skinMapStore.setRadius("0.5km");

		setApiCall({ call: [locationSearch()] });
	};

	// 통합검색
	const goTotalSeaarch = () => setApiCall({ call: [totalSearch()] });

	// 필터칩
	const filter = (filter: string) => {
		skinMapStore.setFilterKeyword(filter);
		skinMapStore.setLevel(3);
		skinMapStore.search === ""
			? setApiCall({ call: [locationSearch(true)] })
			: setApiCall({ call: [totalSearch(true)] });
	};
	return (
		<SkinMapTemplate
			seo={<Seo title="피부시술맵" />}
			contents={
				<SkinMap
					goSearch={goTotalSeaarch}
					reSearch={reSearch}
					filter={filter}
				></SkinMap>
			}
		></SkinMapTemplate>
	);
});
