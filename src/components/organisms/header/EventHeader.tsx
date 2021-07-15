import { useAuth } from "hooks";
import React from "react";
import { Row, Column } from "components/atoms/Grid";
import { SpaceContainer, Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Text";
import { UserWish } from "./headerComponents/UserWish";
import styled from "@emotion/styled/macro";
import { Icon } from "components/atoms";
import { useHistory } from "react-router-dom";

export const EventHeader = ({ searchIcon }: { searchIcon: JSX.Element }) => {
	const auth = useAuth();
	const history = useHistory();

	const EventHeaderCategory = [
		{
			icon: "skin",
			title: "피부",
			url: "/event/skin",
		},
		{
			icon: "face",
			title: "얼굴",
			url: "/event/face",
		},
		{
			icon: "body",
			title: "바디",
			url: "/event/body",
		},
		{
			icon: "etc",
			title: "기타",
			url: "/event/etc",
		},
		{
			icon: "etc",
			title: "기타",
			url: "/event/etc",
		},
	];

	return (
		<EventHeaderContainer>
			<SpaceContainer borderBottom={"#E6E6E6"}>
				<Column>
					<Row between fullWidth>
						<SpaceContainer row={18} column={18}>
							<Text
								bold
								size={19}
								onClick={() => {
									window.location.reload();
								}}
							>
								이벤트
							</Text>
						</SpaceContainer>
						<Row>
							<SpaceContainer row={12} column={12}>
								{searchIcon}
							</SpaceContainer>
							<>{auth.user() && <UserWish />}</>
						</Row>
					</Row>
					<Row isOverFlow isScroll>
						{EventHeaderCategory.map((item: any, index: number) => (
							<div key={index} onClick={() => history.push(item.url)}>
								<SpaceContainer row={17} column={18}>
									<Row>
										<Icon icon={item.icon} size={24} />
										<Space row={9} />
										<Text size={15}>{item.title}</Text>
									</Row>
								</SpaceContainer>
							</div>
						))}
					</Row>
				</Column>
			</SpaceContainer>
		</EventHeaderContainer>
	);
};
export const EventHeaderContainer = styled.div`
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	-ms-backface-visibility: hidden;
	-webkit-transform-style: preserve-3d;
	top: 0px;
	max-width: 1024px;
	margin: 0 auto;
	align-items: center;
	background-color: #fff;
	z-index: 99;
	width: 100%;
	min-width: 278px;
	position: fixed;
`;
