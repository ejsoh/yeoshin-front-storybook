import { AxiosResponse } from "axios";

export const groupByObjectKeyHelper = (
	objectArray: AxiosResponse["data"][],
	property: string
) => {
	const result = objectArray.reduce((a, b) => {
		const key = b[property];
		if (!a[key]) {
			a[key] = [];
		}
		a[key].push(b);

		return a;
	}, {});
	return result;
};

export const groupByCloseLocation = (
	objectArray: AxiosResponse["data"][],
	property: string
) => {
	return objectArray.reduce((a, b) => {
		const split = b[property].split(",");
		const lng = parseFloat(split[0]).toFixed(4);
		const lat = parseFloat(split[1]).toFixed(4);
		const key = `${lng}, ${lat}`;
		if (!a[key]) {
			a[key] = [];
		}
		b.skinmapHospitalYn = b.skinmapHospitalYn === "Y" ? true : false;
		a[key].push(b);
		return a;
	}, {});
};
