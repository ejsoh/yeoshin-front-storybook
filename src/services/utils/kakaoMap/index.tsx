import { Hospital } from "services/mapper/skinMapMapper";
import { alternative } from "helper";
import { clusterStyle } from "./cluster";
import { customs } from "./customs";
import { kakaoEvent } from "./event";
import { rootStore } from "models/RootStore";

// kakao를 글로벌 선언, 객체 any로 처리 할 수 밖에 없음
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const kakaoMap = () => {
	const kakao = (window as any).kakao;
	const store = rootStore;

	// 클래스이름 상수

	const center = store.skinMapStore.getCenterPosition();

	const container = document.getElementById("map");

	const mapOption = {
		center: new kakao.maps.LatLng(center.lat, center.lng),
		level: store.skinMapStore.getLevel(),
		size: new kakao.maps.Size(0.5, 0.5),
	};

	const map = new kakao.maps.Map(container, mapOption);

	const cluster = new kakao.maps.MarkerClusterer({
		map: map,
		averageCenter: true,
		minLevel: 4,
		hoverable: false,
		calculator: [6, 24, 100],
		styles: clusterStyle,
	});

	// 좌표 변경 메서드
	const panTo = (lat: string, lng: string) => {
		const newCenter = new kakao.maps.LatLng(lat, lng);
		map.panTo(newCenter);
	};

	const geocoder = new kakao.maps.services.Geocoder();
	// 현재 좌표 기준 주소
	geocoder.coord2RegionCode(
		center.lng,
		center.lat,
		kakaoEvent().currentAddress
	);

	// 카카오 맵 로드
	const loadKakao = (hospital: Hospital[][], hospitalEvent: any) => {
		const marker = hospital.map((item: Hospital[]) => {
			const { fiilterMarkers, defaultMarkers, hospitalInfos } = customs(
				item,
				hospitalEvent
			);

			const location = item[0].location.split(",");
			const markerPosition = new kakao.maps.LatLng(location[0], location[1]);

			// 마커 클래스명 변경 메서드
			const markerClassNameChange = () => {
				kakaoEvent().isClose("infoContainer");
				hospitalInfos.className = "infoContainer";
			};

			// 병원정보 종료 메서드
			const infoClose = () => {
				info.setMap(null);
			};

			// 커스텀 마커 세팅
			const customMarker = new kakao.maps.CustomOverlay({
				content: alternative({
					is: store.skinMapStore.getFilterKeyword().length > 0,
					truthy: fiilterMarkers,
					falsy: defaultMarkers,
				}),
				position: markerPosition,
				yAnchor: 1,
			});

			// 병원 정보 오버레이 세팅
			const info = new kakao.maps.CustomOverlay({
				content: hospitalInfos,
				position: markerPosition,
				xAnchor: 0.5,
				yAnchor: 2,
			});

			// 병원 정보 클릭 이벤트
			hospitalInfos.onclick = () => {
				info.setMap(map);
			};

			// 마커 클릭 센터 이벤트
			const markerMakeCenter = () => {
				const lng = customMarker.getPosition().La;
				const lat = customMarker.getPosition().Ma;
				panTo(lat, lng);
			};

			const markerCommonEvent = () => {
				info.setMap(null);
				// 마커 클릭 시, 맵 레벨이 3 이상일 경우 3으로 줌
				const level = map.getLevel();
				level > 3 && map.setLevel(2);

				// 스타일 핸들러
				markerClassNameChange();

				// 마커 클릭 시, 맵 중앙 이동
				markerMakeCenter();

				// 병원 이름 마커에 노출
				info.setMap(map);

				// 병원 상세 정보
				hospitalEvent([item[0].key]);
				kakaoEvent().changeClassNames("first");
			};

			// 필터 마커 클릭이벤트
			fiilterMarkers.onclick = () => {
				markerCommonEvent();
			};

			// 기본 마커 클릭 이벤트
			defaultMarkers.onclick = () => {
				markerCommonEvent();
			};

			// 맵 드래그 이벤트
			kakao.maps.event.addListener(
				map,
				"dragend",
				kakaoEvent().mapDragEvent(infoClose)
			);

			info.setMap(null);

			return customMarker;
		});

		passMarkerInfo(checkHasMarker(marker));
		cluster.addMarkers(marker);
	};

	let isMarker: any;
	const checkHasMarker = (getInfo: any) => {
		const mapping = () => {
			return () => getInfo;
		};
		const here = mapping()();
		return { here };
	};
	const passMarkerInfo = (isMarkerHere: any) => (isMarker = isMarkerHere);
	// 맵 좌표 변경 이벤트
	kakao.maps.event.addListener(map, "idle", () => {
		const proj = map.getProjection();
		// 지도의 영역
		const bounds = map.getBounds();
		const extBounds = kakaoEvent().extendBounds(proj, bounds);

		const result = isMarker.here
			.map((item: any) => extBounds.contain(item.getPosition()))
			.some((item: any) => item);

		store.interactionStore.setIsShow(!result);

		const geocoder = new kakao.maps.services.Geocoder();
		const latlng = map.getCenter();
		const lat = latlng.getLat();
		const lng = latlng.getLng();

		kakaoEvent().setLocationInfo(map.getLevel(), `${lat}`, `${lng}`);
		// 현재 좌표 기준 주소
		geocoder.coord2RegionCode(lng, lat, kakaoEvent().currentAddress);
		kakaoEvent().noResultTextSetter();
	});

	kakao.maps.event.addListener(map, "zoom_changed", () =>
		kakaoEvent().mapZoomEvent()
	);

	return {
		loadKakao,
		panTo,
		cluster,
	};
};
