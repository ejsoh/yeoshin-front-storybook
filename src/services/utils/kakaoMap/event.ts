/* eslint-disable @typescript-eslint/no-explicit-any */
// kakao를 글로벌 선언, 객체 any로 처리 할 수 밖에 없음
import { rootStore } from "models/RootStore";

export const kakaoEvent = () => {
	const store = rootStore;
	const kakao = (window as any).kakao;
	// 맵 드래그 이벤트
	const mapDragEvent = (infoClose: () => void) => {
		return () => {
			const el = document.getElementsByClassName("bounce");
			Array.prototype.forEach.call(el, elem => {
				elem.className = "bounce";
			});
			infoClose();

			store.skinMapStore.setSheetShowReset();
			(document.activeElement as HTMLElement).blur();
		};
	};

	// 클래스 명 기준으로 순회하여 클래스 명 변경
	const changeClassNames = (className: string) => {
		const getChild = document.querySelector(".infoContainer");
		const getParent = getChild?.parentElement;
		getParent && getParent.classList.add(className);
	};

	// 엘리먼트를 순회하며 해당 이름을 탐색하면, 클래스 이름을 변경한다.
	const isClose = (target: string) => {
		const targetElement = document.getElementsByClassName(target);
		Array.prototype.forEach.call(targetElement, changeElement => {
			changeElement.className = "none";
		});
	};

	// 이벤트창을 닫는다.
	const eventClose = (isClose: boolean) => {
		store.interactionStore.setIsEventShow(isClose);
	};

	// 토글창을 닫는다.
	const toggleClose = () => {
		store.skinMapStore.setSheetShowReset();
	};

	// 맵 줌 이벤트
	const mapZoomEvent = () => {
		isClose("infoContainer");
		(document.activeElement as HTMLElement).blur();
		store.interactionStore.setIsEventShow(false);
		store.skinMapStore.setSheetShowReset();
	};

	// 맵 레벨, 센터 좌표 저장
	const setLocationInfo = (level: number, lat: string, lng: string) => {
		store.skinMapStore.setLevel(level);
		store.skinMapStore.setCenterPosition({
			lat: lat,
			lng: lng,
		});
	};

	// 값이 없을때 텍스트 세팅
	const noResultTextSetter = () => {
		store.skinMapStore.getHospital().length === 0 &&
			store.skinMapStore.setSkinMapNoResult({
				result: true,
				filter: false,
				text: `이 지역 검색 또는, 
				새로운 검색어를 입력 해 주세요.`,
			});
	};

	// 화면안에 좌표 체크
	const extendBounds = (proj: any, bounds: any) => {
		const sw = proj.pointFromCoords(bounds.getSouthWest());
		const ne = proj.pointFromCoords(bounds.getNorthEast());

		sw.x -= 10;
		sw.y += 10;

		ne.x += 10;
		ne.y -= 10;

		return new kakao.maps.LatLngBounds(
			proj.coordsFromPoint(sw),
			proj.coordsFromPoint(ne)
		);
	};

	// 현재 위치
	const currentAddress = (result: { [key: string]: string }[], status: any) => {
		if (status === kakao.maps.services.Status.OK) {
			for (let i = 0; i < result.length; i++) {
				// 행정동의 region_type 값은 'H' 이므로
				if (result[i].region_type === "H") {
					const getAddress = result[0];
					const separateAddress = getAddress.region_2depth_name.split(" ");
					const isCity = separateAddress.length > 1;
					const address = {
						city: isCity ? separateAddress[0] : getAddress.region_1depth_name,
						add1: isCity ? separateAddress[1] : separateAddress[0],
						add2: getAddress.region_3depth_name,
					};
					store.skinMapStore.setCurrentAddress(address);
					break;
				}
			}
		}
	};

	return {
		mapDragEvent,
		isClose,
		eventClose,
		toggleClose,
		changeClassNames,
		mapZoomEvent,
		setLocationInfo,
		noResultTextSetter,
		extendBounds,
		currentAddress,
	};
};
