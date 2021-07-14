import { AxiosResponse } from "axios";
import { suffle } from "helper/suffleHelper";
export const bannerMapper = (res: AxiosResponse["data"]) => {
	const data = res.results.banners;
	const mappedData = data.map((item: AxiosResponse["data"], index: number) => {
		return {
			key: item.bannerId,
			link: item.bannerLink,
			title: item.bannerTitle,
			img: item.bannerImg,
			index: index,
		};
	});

	const result = {
		banner: mappedData.flat(),
	};
	return result;
};

export const yeoshinTvMapper = (res: AxiosResponse["data"]) => {
	const data = res.results.yeoshinTv;

	const mappedData = data.map((item: AxiosResponse["data"], index: number) => {
		return {
			key: item.tvCode,
			link: item.tvVideoUrl,
			count: parseInt(item.tvViewCount).toLocaleString(),
			title: item.tvNameMain,
			img: item.tvFullImgUrl,
			index: index,
		};
	});

	const result = { tv: mappedData };
	return result;
};
export const tagMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;

	const mappedData = data.map((item: AxiosResponse["data"]) => {
		return {
			key: item.id,
			link: item.tagLink,
			title: item.tagName,
		};
	});

	return { tag: mappedData };
};

export const eventMapper = (res: AxiosResponse["data"]) => {
	const data = res;

	const mappedData = data.map((item: AxiosResponse["data"]) => {
		return {
			key: item.productCode,
			image: item.thumbnailImageUrl,
			link: item.detailLinkUrl,
			title: item.name,
			description: item.comment,
			price: item.price,
			isReservation: item.reservationYn === "Y",
			reviewCount: item.reviewCount,
			score: ((item.rateScore / (item.reviewCount * 5)) * 10).toFixed(1),
			wishCount: item.wishCount,
			isWish: item.wishIcon === "on",
			location: item.displayName,
		};
	});

	return suffle(mappedData);
};

export const receommendKeyowrd = (res: AxiosResponse["data"]) => {
	const data = res.results.recommendKeywords;

	const mappedData = data.map((item: AxiosResponse["data"]) => {
		return {
			key: item.keywordRank + item.keyword,
			keyword: item.keyword,
			score: item.keywordScore,
			rank: parseInt(item.keywordRank),
		};
	});
	const sortingData = mappedData.sort(
		(a: { [key: string]: number }, b: { [key: string]: number }) => {
			if (a.rank > b.rank) return 1;
			if (a.rank < b.rank) return -1;
			return 0;
		}
	);
	return { recommendKeyword: sortingData };
};

export const myHospitalEventMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;
	const result = data.map((item: AxiosResponse["data"]) => {
		return {
			key: item.productCode,
			location: item.displayName,
			title: item.name,
			price: item.price,
			image: item.thumbnailImage,
		};
	});
	return result;
};

export const myPopupMapper = (res: AxiosResponse["data"]) => {
	const data = res.results;
	const result = data.map((item: AxiosResponse["data"], index: number) => {
		return {
			key: item.displayType + index,
			type: item.displayType,
			link: item.imageLink,
		};
	});
	return { myPopup: result };
};
