import { AxiosResponse } from "axios";
import { removeDuplicateItemsByKey } from "helper";

type GroupedType = { [key: string]: string };

const grouped = (arr: GroupedType[]) =>
	arr.reduce((a: AxiosResponse["data"], b: AxiosResponse["data"]) => {
		const key = b[0];
		if (!a[key]) {
			a[key] = [];
		}
		a[key].push(b[1]);

		return a;
	}, {});

export const composeBodyData = {
	face: [
		{ name: "이마", isSelected: false },
		{ name: "눈", isSelected: false },
		{ name: "코", isSelected: false },
		{ name: "입술", isSelected: false },
		{ name: "턱", isSelected: false },
		{ name: "반영구", isSelected: false },
		{ name: "목", isSelected: false },
	],
	body: [
		{ name: "복부", isSelected: false },
		{ name: "허벅지", isSelected: false },
		{ name: "종아리", isSelected: false },
		{ name: "어깨", isSelected: false },
	],
	skin: [
		{ name: "수분관리", isSelected: false },
		{ name: "모공축소", isSelected: false },
		{ name: "주름개선", isSelected: false },
		{ name: "미백", isSelected: false },
		{ name: "탄력개선", isSelected: false },
		{ name: "여드름", isSelected: false },
	],
	etc: [
		{ name: "미용주사", isSelected: false },
		{ name: "레이저 제모", isSelected: false },
		{ name: "다한증", isSelected: false },
		{ name: "치아미백", isSelected: false },
		{ name: "여성시술", isSelected: false },
		{ name: "다크서클", isSelected: false },
	],
};

export const initBodyData = {
	body: 0,
	skin: 0,
	face: 0,
	etc: 0,
};

export const customInfoMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;

	const mappedData = data.map((item: AxiosResponse["data"]) => {
		const result = item.split("|");
		const keyMapping = () => {
			const key = result[0];
			switch (true) {
				case key === "얼굴":
					return "face";
				case key === "피부":
					return "skin";
				case key === "바디":
					return "body";
				case key === "기타":
					return "etc";
			}
		};

		return [keyMapping(), { name: result[1], isSelected: true }];
	});
	const tt = (item: AxiosResponse["data"]) => {
		return removeDuplicateItemsByKey(item, "name").map((item, index) => {
			return { ...item, ...{ id: index } };
		});
	};

	const resultData =
		res.results.length <= 0
			? {
					body: tt(composeBodyData.body),
					face: tt(composeBodyData.face),
					skin: tt(composeBodyData.skin),
					etc: tt(composeBodyData.etc),
			  }
			: {
					body: tt([
						...(grouped(mappedData).body ?? []),
						...composeBodyData.body,
					]),
					face: tt([
						...(grouped(mappedData).face ?? []),
						...composeBodyData.face,
					]),
					skin: tt([
						...(grouped(mappedData).skin ?? []),
						...composeBodyData.skin,
					]),
					etc: tt([...(grouped(mappedData).etc ?? []), ...composeBodyData.etc]),
			  };

	const result = {
		data: resultData,
		count:
			res.results.length <= 0
				? initBodyData
				: {
						body: (grouped(mappedData).body ?? []).length,
						skin: (grouped(mappedData).skin ?? []).length,
						face: (grouped(mappedData).face ?? []).length,
						etc: (grouped(mappedData).etc ?? []).length,
				  },
	};

	return result;
};

export const areaMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;
	const result = data.map((item: AxiosResponse["data"]) => [
		item.areaSido,
		item.areaGugun,
	]);
	const regruping = Object.entries(grouped(result)).map(
		(item: AxiosResponse["data"]) => {
			return gugunMapper(item[0], item[1]);
		}
	);

	return regruping;
};

const gugunMapper = (item: string, value: string[]) => {
	switch (true) {
		case item === "강원":
			return { name: item, key: "kangwon", value: value };
		case item === "경기":
			return { name: item, key: "kyungki", value: value };
		case item === "경남":
			return { name: item, key: "kyungnam", value: value };
		case item === "경북":
			return { name: item, key: "kyungbuk", value: value };
		case item === "광주":
			return { name: item, key: "kwangju", value: value };
		case item === "대구":
			return { name: item, key: "daegu", value: value };
		case item === "대전":
			return { name: item, key: "daejun", value: value };
		case item === "부산":
			return { name: item, key: "busan", value: value };
		case item === "서울":
			return { name: item, key: "seoul", value: value };
		case item === "세종":
			return { name: item, key: "sejon", value: value };
		case item === "울산":
			return { name: item, key: "ulsan", value: value };
		case item === "인천":
			return { name: item, key: "incheon", value: value };
		case item === "전남":
			return { name: item, key: "jeonnam", value: value };
		case item === "전북":
			return { name: item, key: "jeonbuk", value: value };
		case item === "제주":
			return { name: item, key: "jeju", value: value };
		case item === "충남":
			return { name: item, key: "chungnam", value: value };
		case item === "충북":
			return { name: item, key: "chungbuk", value: value };
	}
};
