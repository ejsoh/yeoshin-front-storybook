import { Column, Row } from "components/atoms/Grid";
import { useAuth, useInjection, useLazyLoading } from "hooks";
import { AxiosResponse } from "axios";
import { FindHospitalDomain } from "pages/mypage/FindHospitals";
import { Icon } from "components/atoms";
import React, { useCallback } from "react";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
import { alternative } from "helper";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { OnlyTruthyShow } from "components/molecules/isShowEventWrap/isShowEvent";
type ImageProps = { isSmall?: boolean };
const Container = styled.div`
	display: flex;
	border-bottom: 1px solid #eee;
	padding: 10px 0;
	margin: 0 15px;
`;
const row = css`
	flex-direction: row;
	align-items: center;
`;
const column = css`
	flex-direction: column;
`;

const ImageContainer = styled.div<ImageProps>`
	border: 1px solid #eee;
	background-color: #ef4b8114;
	overflow: hidden;
	border-radius: 5px;
	img {
		object-fit: fit;
		width: 100%;
		height: 100%;
	}
	${props => (props.isSmall ? miniSize : premiuimSize)}
`;

const premiuimSize = css`
	width: 100%;
	min-height: 150px;
`;

const miniSize = css`
	width: 100px;
	height: 100px;
	margin-right: 10px;
`;

type StyleProps = { isLike: boolean };
const HospitalLike = styled.div<StyleProps>`
	width: 50px;
	height: 50px;
	background: transparent
		url(/images/icons/${props => (props.isLike ? "wish_on" : "wish")}.png) right
		center no-repeat;
	background-size: 30px !important;
	transition: all 0.3s ease-in-out;
	-webkit-transition: all 0.3s ease-in-out;
`;

const HospitalRowContainr = styled(Row)`
	&:last-child {
		flex-wrap: wrap;
	}
	& > div {
		padding: 0 10px 0 0;
	}
`;

export const HospitalListItems = observer(
	({
		item,
		lastItem,
		getPaging,
		totalCount,
		excute,
	}: {
		item: AxiosResponse["data"];
		lastItem: string;
		getPaging: (index: number) => void;
		totalCount: number;
		excute?: (id: string) => void;
	}) => {
		const { interactionStore } = useInjection(mapper);
		const { hospitalDislike, hospitalLike } = FindHospitalDomain();
		const [heart, setHeart] = React.useState(item.isLike);
		const auth = useAuth();

		const { loadingSrc, getImage } = useLazyLoading(
			alternative({
				is: item.isPremium === "Y",
				truthy: item.premiumImage,
				falsy: item.image,
			})
		);

		React.useEffect(() => {
			const pageIndex = Math.ceil(totalCount / 10);
			loadingSrc !== "" &&
				lastItem === item.key &&
				totalCount > 10 &&
				pageIndex >= interactionStore.getCurrentPageIndex() + 1 &&
				getPaging(interactionStore.getCurrentPageIndex() + 1);
		}, [loadingSrc]);

		const hospitalLikeEvent = useCallback(() => {
			auth.user()
				? (heart
						? hospitalDislike(item.key, () => excute && excute(item.key))
						: hospitalLike(item.key),
				  setHeart(!heart))
				: interactionStore.setIsAlert(
						"로그인 후 이용해 주세요.",
						() => (window.location.href = "/login")
				  );
		}, [heart]);

		return (
			<Container
				css={alternative({
					is: item.isPremium === "Y",
					truthy: column,
					falsy: row,
				})}
			>
				<a
					href={`https://yeoshin.co.kr/?pn=minishop.view&shopCode=${item.key}`}
				>
					<ImageContainer isSmall={item.isPremium !== "Y"}>
						<img
							ref={getImage}
							onError={err => (err.currentTarget.style.display = "none")}
							css={item.isPremium !== "Y" && miniSize}
							src={`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/member/${alternative(
								{
									is: item.isPremium === "Y",
									truthy: item.premiumImage,
									falsy: item.image,
								}
							)}`}
						/>
					</ImageContainer>
				</a>
				<Row between fullWidth>
					<Column>
						<Row>
							<Text left>{item.name}</Text>
							<Space row={5} />
							<OnlyTruthyShow
								condition={item.badge !== "" && item.badge !== undefined}
							>
								<Icon
									size={18}
									url={`https://d10fvx8ndeqwvu.cloudfront.net/upfiles/icon/${
										item.badge ?? "2832170025.png"
									}`}
								/>
							</OnlyTruthyShow>
						</Row>
						<Space column={5} />
						<HospitalRowContainr>
							<Text left size={10} lightgray>
								<Icon icon={"mini_map"} size={10} format={"png"} />
								<Space row={3} />
								{item.location}
							</Text>
							<Text left size={10} lightgray>
								<Icon icon={"mini_good2"} format={"png"} size={10} />
								<Space row={3} />
								후기 {item.reviewCount}개
							</Text>
							<Text size={10} left>
								이벤트 {item.eventCount}개
							</Text>
						</HospitalRowContainr>
					</Column>
					<HospitalLike isLike={heart} onClick={hospitalLikeEvent} />
				</Row>
			</Container>
		);
	}
);
