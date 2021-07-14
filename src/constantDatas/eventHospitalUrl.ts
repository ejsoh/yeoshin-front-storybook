export const HOSPITAL_HREF = (code: string) =>
	`https://yeoshin.co.kr/?pn=minishop.view&shopCode=${code}`;

export const EVENT_HREF = (code: string) =>
	`https://yeoshin.co.kr/?pn=product.view&pcode=${code}`;

export const EVENT_IMAGE = (code: string) =>
	`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/${code}?w=96&amp;h=96&amp;f=webp&amp;q=90`;

export const HOSPITAL_IMAGE = (code: string) =>
	`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/member/${code}?w=96&amp;h=80&amp;f=webp&amp;q=90`;

export const HOSPITAL_EMPTY_IMAGE = "images/icons/hospital.svg";
