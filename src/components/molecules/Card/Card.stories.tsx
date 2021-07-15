import React from "react";
import { object, withKnobs } from "@storybook/addon-knobs";
import { actions } from "@storybook/addon-actions";
import { Card } from "./Card";
import { YeoshinTvCard } from "./YeoshinTvCard";
import { EventCard } from "./EventCard";

export const Default = (args: any) => {
	return <Card />;
};

export const eventCard = (args: any) => {
	return <EventCard item={args.item} />;
};

eventCard.args = {
	item: {
		description: "승모근보톡스, 어깨라인, 예신필수, 어깨쉐입, 보톡스, 뒷태미인",
		image:
			"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/2237527376.jpg?w=202&h=202&q=90",
		isReservation: false,
		isWish: false,
		key: "S6394280",
		link: "/?pn=product.view&pcode=S6394280",
		location: "신사역-핑크라인의원",
		price: 55000,
		reviewCount: 25,
		score: "9.9",
		title: "5주년 기념! 숄더핏주사 승모근보톡스",
		wishCount: 220,
	},
};

export const yeoshinTvCard = (args: any) => {
	return <YeoshinTvCard item={args.item} />;
};

yeoshinTvCard.args = {
	item: {
		tvId: "131",
		tvCode: "S3136865",
		tvNameMain: "피부과 가기 전에 꼭 알아야 할 꿀팁! | 시술 전 영상 필수 시청!",
		tvInputDate: "2021-06-09 16:23:30.0",
		tvViewCount: "2102",
		tvMetatagTitle: "",
		tvVideoUrl: "https://youtu.be/FKPLrCxOTaY",
		tvVideoId: "FKPLrCxOTaY",
		tvImgType: "direct",
		tvVideoThumb: "4254149281.jpg",
		tvFullImgUrl:
			"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/4254149281.jpg?w=320&amp;h=180&amp;f=webp&amp;q=90",
	},
};

export const hospitalCard = (args: any) => {
	return <div style={{ display: "flex", justifyContent: "flex-start" }}></div>;
};

export default {
	title: "COMPONENT/Card",
	component: Card,
	decorators: [withKnobs],
};
