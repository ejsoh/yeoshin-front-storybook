import { divParser, htmlParsingHelper } from "helper/htmlParsingHelper";

import { FilterIcon } from "../../../components/molecules/skinMapIconWrap/index";
import { Hospital } from "services/mapper/skinMapMapper";
import React from "react";
import { groupByObjectKeyHelper } from "helper/groupHelper";
import { rootStore } from "models/RootStore";

export const customs = (
	item: Hospital[],
	event: (item: string[], more?: boolean) => void
) => {
	const store = rootStore;

	// 아이콘 이미지
	const YEOSHIN_MARKER = "images/icons/yeoshinMarker.svg";
	const GENERAL_MARKER = "images/icons/generalMarker.svg";
	const BOTH_MARKER = "images/icons/bothMarker.svg";
	// 필터 마커
	const filterMarker = () => {
		// 필터에 맞는 아이콘으로 조합
		const filterMarkerList = store.skinMapStore.getFilterKeyword().map(item => {
			if (item === "yeoshinEventYn") return "#F4A6D7";
			if (item === "parkingYn") return "#00AB8E";
			if (item === "coronaSafetyHospitalYn") return "#3A5DAE";
			if (item === "mobileReservationYn") return "#FAE053";
			return item;
		});

		// 필트 키워드가 없을 경우애는 적용하지 않는다.
		const filterContents =
			store.skinMapStore.getFilterKeyword().length > 0
				? htmlParsingHelper(<FilterIcon selectedFilter={filterMarkerList} />)
				: "";

		const filterMarker = document.createElement("div");

		filterMarker.className = "bounce";

		filterMarker.innerHTML = filterContents;

		return filterMarker;
	};

	const selectMarker = (() => {
		const groupByYeoshin = groupByObjectKeyHelper(item, "isYeoshin");
		switch (true) {
			case Object.keys(groupByYeoshin).length > 1:
				return BOTH_MARKER;
			case item[0].isYeoshin:
				return YEOSHIN_MARKER;
			default:
				return GENERAL_MARKER;
		}
	})();

	// 기본 마커 (일반 병원 / 여신이벤트 병원)
	const defaultMarker = () => {
		const parent = document.createElement("img");
		parent.className = "bounce";
		parent.src = selectMarker;
		return parent;
	};

	// 병원 정보 오버레이
	const hospitalInfo = () => {
		const hospitalContainer = divParser("hospitalContainer");
		const hospitalName = divParser("infoContents");
		const hospitalInfo = divParser("infoContainer");
		const pointContainer = divParser("pointContainer");
		const point = divParser("point");

		hospitalName.className = "infoContents";
		hospitalInfo.className = "infoContainer";

		const len = item.length;
		const moreThanThree = len > 3;

		// 같은 좌표에 병원이 세개 이상일 경우 세개 초과 아이템을 자른다.
		const getHospitalThree = moreThanThree ? item.slice(0, 3) : item;

		// 세개의 병원이름을 차례로 엘리먼트에 담는다.
		getHospitalThree.map((hospital: Hospital, index: number) => {
			const list = document.createElement("div");
			list.className = hospital.isYeoshin
				? "hospitalYeoshin"
				: "hospitalGeneral";
			list.innerHTML = hospital.customername;
			list.onclick = function () {
				event([hospital.key]);
			};
			hospitalName.appendChild(list);

			getHospitalThree.length - 1 === index &&
				(() => {
					// 잘라낸 세개의 병원 이외에 몇개의 병원이 더 있는지 보여준다.
					const more = divParser("hospitalGeneral", `더보기(+${len - 3})`);
					more.onclick = function () {
						store.skinMapStore.setHospitalMenuShow(true);
						const key = item.map(i => i.key);
						event(key);
					};
					// 같은 좌표에 병원이 세개 일 경우에만 엘리먼트를 추가한다.
					moreThanThree && hospitalName.appendChild(more);
					point.className =
						hospital.isYeoshin && !moreThanThree ? "pinkPoint" : "point";
					pointContainer.appendChild(point);
				})();
		});

		hospitalContainer.appendChild(hospitalName);
		hospitalContainer.appendChild(pointContainer);

		hospitalInfo.appendChild(hospitalContainer);

		return hospitalInfo;
	};

	// 커스텀 오버레이 - 새로운 메모리에 할당하여 한곳을 참조하게 한다.
	const defaultMarkers = defaultMarker();
	const fiilterMarkers = filterMarker();
	const hospitalInfos = hospitalInfo();

	return {
		fiilterMarkers,
		defaultMarkers,
		hospitalInfos,
	};
};
