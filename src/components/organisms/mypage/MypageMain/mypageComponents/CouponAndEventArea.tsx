import { Row } from "components/atoms/Grid";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { Icon } from "components/atoms/Icon/Icon";
import { NumberText } from "components/atoms/Typo/Typo";
import React from "react";
import { Text } from "components/atoms/Text";

const CouponAndEventArea = ({
	title,
	value,
	unit,
	link,
}: {
	title: string;
	value: string;
	unit: string;
	link: string;
}) => {
	const onClick = React.useCallback(() => {
		window.location.href = link;
	}, [link]);
	return (
		<Row space={[4, 0]} between>
			<Text lightgray weight={500}>
				{title}
			</Text>
			<Space row={19} />

			<Row onClick={onClick}>
				<NumberText pink bold>
					{value}
				</NumberText>
				<SpaceContainer row={4}>
					<Text gray small>
						{unit}
					</Text>
				</SpaceContainer>
				<Icon size={9} icon={"grayRightArrow"}></Icon>
			</Row>
		</Row>
	);
};

export default React.memo(CouponAndEventArea);
