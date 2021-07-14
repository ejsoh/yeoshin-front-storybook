import { RootStoreModel } from "models/RootStore";
import { kakaoMap } from "services/utils/kakaoMap";
import { useInjection } from "hooks";

const mapper = ({ skinMapStore, userInfoStore }: RootStoreModel) => ({
	skinMapStore,
	userInfoStore,
});

export const SkinMapKaKao = () => {
	const { skinMapStore, userInfoStore } = useInjection(mapper);
	// 지도 중심 변경 이벤트
	const getCenterLocation = (lng: string, lat: string) => {
		skinMapStore.setCenterPosition({
			lat: lat,
			lng: lng,
		});
	};
	const getQueryPosition = (lng: string, lat: string) => {
		skinMapStore.setQueryPosition({
			lat: lat,
			lng: lng,
		});
		skinMapStore.setCenterPosition({
			lat: lat,
			lng: lng,
		});
	};
	// 사용자 위치 정보
	const getLocation = (locationSearch: () => void) => {
		if (navigator.geolocation) {
			navigator.permissions.query({ name: "geolocation" }).then(result => {
				result.state === "denied" && alert("위치정보를 확인해 주세요.");
				result.state === "granted" && userInfoStore.setUserLocation(true);
			});

			navigator.geolocation.getCurrentPosition(
				position => {
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;
					userInfoStore.setUserLocation(false);
					skinMapStore.setCenterPosition({
						lat: lat.toString(),
						lng: lng.toString(),
					});
					locationSearch();
				},
				error => {
					alert("위치 정보를 사용할 수 없는 단말입니다.");
				}
			);
		} else {
			alert("GPS를 지원하지 않습니다");
		}
		(document.activeElement as HTMLElement).blur();
	};

	// 카카오 맵
	const loadKakaoMap = (hospitalEvent?: (customercode: string[]) => void) => {
		// 카카오 객체
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const getKakao = (window as any).kakao;
		const { loadKakao } = kakaoMap();
		const hospital = skinMapStore.getHospital();
		getKakao && loadKakao(hospital, hospitalEvent);
	};

	// 카카오 맵 삭제
	const removeKaKao = () => {
		const container = document.getElementById("map");
		container !== null ? (container.innerHTML = "") : null;
	};

	return {
		getCenterLocation,
		getLocation,
		loadKakaoMap,
		removeKaKao,
		getQueryPosition,
	};
};
