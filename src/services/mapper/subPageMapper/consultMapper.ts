import { AxiosResponse } from "axios";
export const consultMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;
	const mappedData = data.map((item: AxiosResponse["data"]) => {
		const admin = item.adminContent
			? {
					adminContent: item.adminContent,
					adminDate: item.adminDate.split(" ")[0],
			  }
			: {};

		const content = item.content ? { content: item.content } : {};
		const data = {
			key: item.uid,
			status: item.status,
			title: item.title,
			date: item.registerDate.split(" ")[0],
			image: item.file,
		};
		return { ...data, ...content, ...admin };
	});
	const result = { data: mappedData, totalCount: res.totalCount };
	return result;
};
