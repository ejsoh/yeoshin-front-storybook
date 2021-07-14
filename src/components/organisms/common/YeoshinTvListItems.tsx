import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { Icon } from "components/atoms";
import { Row } from "components/atoms/Grid";
import { Text } from "components/atoms/Message";
import { Space } from "components/atoms/Spacing";
import { useLazyLoading } from "hooks";
import { CountFormat } from "services/convert/CountFormat";
import { YeoshinTvItemType } from "types/YeoshinTvItemType";

// NOTE : 여신티비 공통 컴포넌트

export const YeoshinTvListItems = ({ item }: { item: YeoshinTvItemType }) => {
	const { loadingSrc, getImage } = useLazyLoading(item.tvFullImgUrl);
	return (
		<a href={item.tvVideoUrl}>
			<YeoshinTvContainer>
				<ImageContainer>
					<img
						ref={getImage}
						onError={err => (err.currentTarget.style.display = "none")}
						src={item.tvFullImgUrl}
					/>
				</ImageContainer>
				<Space column={4} />
				<Text size={13} lineHeight={20} ellipsis ellipsisLine={2}>
					{item.tvNameMain}
				</Text>
				<Space column={4} />
				<Row>
					{/* <Icon icon={"likeFillGrey"} size={16} />
				<Space row={5} />
				<Text bold size={11}>
					{CountFormat(item.tvViewCount)}
				</Text>
				<Space row={5} />
				<Icon icon={"commentFillGrey"} size={16} />
				<Space row={5} />
				<Text bold size={11}>
					{CountFormat(item.tvViewCount)}
				</Text>
				<Space row={5} /> */}
					<Icon icon={"viewFillGrey"} size={16} />
					<Space row={5} />
					<Text bold size={11}>
						{CountFormat(item.tvViewCount)}
					</Text>
					<Space row={5} />
				</Row>
			</YeoshinTvContainer>
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
