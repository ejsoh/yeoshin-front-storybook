import { Column, Row } from "components/atoms/Grid";
import { productImageUrl, productLink } from "constantDatas/linkUrls";

import { AxiosResponse } from "axios";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
import ImageWrap from "components/molecules/imageWrap/ImageWrap";

import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { MainDb } from "pages/main/MainDb";

export const MyHospitalEvent = observer(() => {
	const { mainStore } = useInjection(mapper);
	const { getMyHospitalEvent } = MainDb();
	const hospitalExcute = (index: number) =>
		getMyHospitalEvent({ index: index });

	return (
		<Row
			space={[0, 15]}
			isScroll
			styles={`
				overflow-y: hidden;
			`}
		>
			{mainStore
				.getData()
				.myHospitalEvent.map((item: AxiosResponse["data"]) => (
					<Column
						styles={`
							padding: 0 10px 0 0;
						`}
						as="a"
						key={"myhospitalEvent" + item.key}
						href={productLink(item.key)}
					>
						<ImageWrap
							url={productImageUrl(item.image)}
							productcode={item.key}
							lastItem={
								mainStore.getData().myHospitalEvent[
									mainStore.getData().myHospitalEvent.length - 1
								].key
							}
							excute={hospitalExcute}
						/>
						<Text left size={11} lightgray ellipsis>
							{item.location}
						</Text>

						<Text
							styles={`
								height: 36px;
							`}
							left
							ellipsis
							line={2}
						>
							{item.title}
						</Text>

						<Row>
							<NumberText pink bold>
								{item.price.toLocaleString()}
							</NumberText>
							<Space row={3} />
							<Text lightgray>원</Text>
						</Row>
					</Column>
				))}
		</Row>
	);
});
