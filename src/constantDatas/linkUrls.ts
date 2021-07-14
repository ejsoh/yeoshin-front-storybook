export const mainBannerUrl = (img: string) =>
	`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/banner/${img}?w=640&h=340&f=webp&q=90`;

export const productLink = (code: string) =>
	`https://yeoshin.co.kr/?pn=product.view&pcode=${code}`;

export const productImageUrl = (code: string) =>
	`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/${code}?w=202&h=202&q=90`;

export const yeoshinTvLink = (code: string) =>
	`https://yeoshin.co.kr/?pn=tv.view&code=${code}`;

export const yeoshinTvList =
	"https://yeoshin.co.kr/?_mobilemode=chk&pn=tv.main";

export const searchLinkUrl = (keyword: string) =>
	`https://yeoshin.co.kr/?pn=product.search.list&keyword=${keyword}&sktype=hit#listpg=1`;

export const CartUrl = "https://yeoshin.co.kr/?pn=shop.cart.list";

export const yeoshinEventUrl = (code: string) =>
	`https://yeoshin.co.kr/?pn=board.view&_menu=event&_uid=${code}`;

export const myHospitalEvent =
	"https://yeoshin.co.kr/?pn=wish.minishop.product.list#listpg=1";

export const RecentlyEvent =
	"https://yeoshin.co.kr/?pn=latest.product.list#listpg=1";
