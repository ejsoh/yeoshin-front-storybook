import ReactGA from "react-ga";

export const gaInit = ReactGA.initialize("UA-70342673-1", {
	gaOptions: { allowAnchor: true, alwaysSendReferrer: true },
});
export const gaPageView = (currentPath: string) => {
	ReactGA.pageview(window.location.pathname + window.location.search);
	ReactGA.event({ category: currentPath, action: "페이지 이동" });
};

export const searchKeyword = (searchKeyword: string) =>
	ReactGA.event({
		category: searchKeyword,
		action: "검색 키워드",
	});

export const openProduct = (event: string) =>
	ReactGA.event({
		category: event,
		action: "상품 클릭",
	});

export const openTv = (tv: string) =>
	ReactGA.event({
		category: tv,
		action: "메인 여신티비 클릭",
	});
export const openCategory = (category: string) =>
	ReactGA.event({
		category: category,
		action: "메인 카테고리 클릭",
	});
export const yeoshinEvent = (event: string) =>
	ReactGA.event({
		category: event,
		action: "여신이벤트 클릭",
	});
export const loginPath = (type: string) =>
	ReactGA.event({
		category: type,
		action: "로그인 매체",
	});
