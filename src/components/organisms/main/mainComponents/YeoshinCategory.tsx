import { AxiosResponse } from "axios";
import React from "react";
import { Row } from "components/atoms/Grid";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { openCategory } from "services/utils/analystics/googleAnalystics";
import { eventTracking } from "services/utils/analystics/amplitude";

const Tag = styled.a`
	background-color: rgba(239, 75, 129, 0.1);
	font-size: 13px;
	color: #ef4b81;
	padding: 12px;
	margin: 4px;
	border-radius: 4px;
	font-weight: bold;
`;

export const YeoshinCategory = observer(() => {
	const { mainStore } = useInjection(mapper);
	const categoryClick = (title: string) => {
		return () => {
			openCategory(title);
			eventTracking("메인카테고리 클릭", {
				tvTitle: title,
			});
		};
	};
	return (
		<Row isWrap space={[12, 16]}>
			{mainStore.getData().tag &&
				mainStore.getData().tag.map((item: AxiosResponse["data"]) => (
					<Tag
						key={item.key + "category"}
						href={item.link}
						onClick={categoryClick(item.title)}
					>
						# {item.title}
					</Tag>
				))}
		</Row>
	);
});
