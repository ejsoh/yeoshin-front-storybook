import { Column, Row } from "components/atoms/Grid";
import { AxiosResponse } from "axios";
import { Button, Icon } from "components/atoms";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { SearchDomain } from "pages/main/MainDomain";
import { Text } from "components/atoms/Text";
import { TitleLabel } from "../../main/mainComponents/TitleLabel";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection, useLazyLoading } from "hooks";
import { searchKeyword } from "services/utils/analystics/googleAnalystics";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { SelectedMenu } from "components/molecules/menu/SelectedMenu";
import { useState } from "react";
import { UnSelectedMenu } from "components/molecules/menu/UnSelectedMenu";
import { Divider } from "components/atoms/Divider/Divider";
import { useCallback } from "react";
import EventList from "components/organisms/event/eventComponents/EventList";
import { useHistory } from "react-router-dom";
import { YeoshinTvItemType } from "types/YeoshinTvItemType";
import ImageWrap from "components/molecules/imageWrap/ImageWrap";
import { alternative } from "helper";
import { CountFormat } from "services/convert/CountFormat";
import { YeoshinTvListItems } from "components/organisms/common/YeoshinTvListItems";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
import { HospitalListItems } from "components/organisms/mypage/MypageSub/HospitalListItem";
import { FindHospitalContents } from "components/organisms/mypage";

const tempYeoshinTV = [
	{
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
	{
		tvId: "123",
		tvCode: "S1390302",
		tvNameMain: "[리쥬란힐러] 쌩얼에 자신있는 시술도 있나요",
		tvInputDate: "2021-05-28 16:44:26.0",
		tvViewCount: "3820",
		tvMetatagTitle: "",
		tvVideoUrl: "https://youtu.be/5nD9ueesuDk",
		tvVideoId: "5nD9ueesuDk",
		tvImgType: "direct",
		tvVideoThumb: "1371380214.jpg",
		tvFullImgUrl:
			"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/1371380214.jpg?w=320&amp;h=180&amp;f=webp&amp;q=90",
	},
	{
		tvId: "132",
		tvCode: "S9546937",
		tvNameMain:
			"[더모톡신] 모공, 여드름, 주름까지 한  번에 좋아지는 시술이 있나요?",
		tvInputDate: "2021-06-18 10:38:09.0",
		tvViewCount: "1693",
		tvMetatagTitle: "",
		tvVideoUrl: "https://youtu.be/j3NRV6cYcec",
		tvVideoId: "j3NRV6cYcec",
		tvImgType: "direct",
		tvVideoThumb: "4292616729.jpg",
		tvFullImgUrl:
			"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/4292616729.jpg?w=320&amp;h=180&amp;f=webp&amp;q=90",
	},
];

const tempYeoshinHospital = [
	{
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
	{
		tvId: "123",
		tvCode: "S1390302",
		tvNameMain: "[리쥬란힐러] 쌩얼에 자신있는 시술도 있나요",
		tvInputDate: "2021-05-28 16:44:26.0",
		tvViewCount: "3820",
		tvMetatagTitle: "",
		tvVideoUrl: "https://youtu.be/5nD9ueesuDk",
		tvVideoId: "5nD9ueesuDk",
		tvImgType: "direct",
		tvVideoThumb: "1371380214.jpg",
		tvFullImgUrl:
			"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/1371380214.jpg?w=320&amp;h=180&amp;f=webp&amp;q=90",
	},
	{
		tvId: "132",
		tvCode: "S9546937",
		tvNameMain:
			"[더모톡신] 모공, 여드름, 주름까지 한  번에 좋아지는 시술이 있나요?",
		tvInputDate: "2021-06-18 10:38:09.0",
		tvViewCount: "1693",
		tvMetatagTitle: "",
		tvVideoUrl: "https://youtu.be/j3NRV6cYcec",
		tvVideoId: "j3NRV6cYcec",
		tvImgType: "direct",
		tvVideoThumb: "4292616729.jpg",
		tvFullImgUrl:
			"https://d10fvx8ndeqwvu.cloudfront.net/upfiles/product/4292616729.jpg?w=320&amp;h=180&amp;f=webp&amp;q=90",
	},
];

export const SearchResult = observer(() => {
	const history = useHistory();
	const { interactionStore } = useInjection(mapper);

	return (
		<>
			<OnlyTruthyShow condition={interactionStore.searchResultMenu == "이벤트"}>
				<EventList />
			</OnlyTruthyShow>
			<OnlyTruthyShow condition={interactionStore.searchResultMenu == "영상"}>
				<SpaceContainer row={16}>
					<Row isWrap between>
						{tempYeoshinTV.map((item: YeoshinTvItemType, index: number) => (
							<YeoshinTvListItems item={item} key={index} />
						))}
					</Row>
				</SpaceContainer>
			</OnlyTruthyShow>
			{/* <OnlyTruthyShow condition={interactionStore.searchResultMenu == "병원"}>
				<div/>
			</OnlyTruthyShow> */}
		</>
	);
});

const EmptyNotify = ({
	buttonTitle,
	textTitle,
	link,
}: {
	buttonTitle: string;
	textTitle: string;
	link: string;
}) => {
	return (
		<a href={link}>
			<Column
				css={css`
					align-items: center;
				`}
			>
				<Space column={140} />
				<Button
					round
					css={css`
						padding: 7px 12px;
						background-color: #3d3d3d;
						border: none;
						color: white;
						font-size: 15px;
						font-weight: 400;
						width: fit-content;
						line-height: 22px;
					`}
				>
					{buttonTitle}
				</Button>
				<Space column={12} />
				<Text lightgray size={15} center>
					{textTitle}
				</Text>
			</Column>
		</a>
	);
};
const YeoshinTvContainer = styled.div`
	width: 43vw;
	margin: 0 0 28px 0;
`;
const ImageContainer = styled.div`
	border-radius: 4px;
	width: 100%;
	overflow: hidden;
	img {
		object-fit: fit;
		width: 100%;
		height: 100%;
	}
`;
