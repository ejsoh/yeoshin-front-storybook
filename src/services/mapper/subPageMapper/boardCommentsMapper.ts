import { AxiosResponse } from "axios";
export const boardCommentsMapper = (res: AxiosResponse["data"]) => {
	const data = res.results.boardCommentList;
	const mappedData = data.map((item: AxiosResponse["data"]) => {
		return {
			key: item.boardNo,
			comment: item.comment,
			date: item.createDate.split("T")[0],
			id: item.writer,
		};
	});
	const result = {
		data: mappedData,
		totalCount: res.results.boardCommentListCnt,
	};
	return result;
};
