import { useAuth } from "hooks";
import React from "react";
import { Row, Column } from "components/atoms/Grid";
import { SpaceContainer, Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
import { UserWish } from "./headerComponents/UserWish";
import styled from "@emotion/styled/macro";
import { Divider } from "components/atoms/Divider/Divider";
import { Icon } from "components/atoms";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";
import { useState } from "react";

export const EventCategoryHeader = ({
	searchIcon,
}: {
	searchIcon: JSX.Element;
}) => {
	const auth = useAuth();
	const history = useHistory();

	// NOTE : 디테일 리스트와 하위 메뉴들
	const DetailCategory = [
		{
			title: "여드름",
			sub: [
				{ title: "전체" },
				{ title: "피지제거" },
				{ title: "자국케어" },
				{ title: "염증관리" },
			],
		},
		{
			title: "피부결",
			sub: [
				{ title: "전체" },
				{ title: "피부결1" },
				{ title: "피부결2" },
				{ title: "피부결3" },
				{ title: "피부결4" },
				{ title: "피부결5" },
				{ title: "피부결6" },
			],
		},
		{
			title: "리프팅",
		},
		{
			title: "미백, 점",
		},
		{
			title: "수분, 관리",
		},
		{
			title: "미백, 점",
		},
		{
			title: "수분, 관리",
		},
	];

	// NOTE : 선택된 메뉴 및 서브메뉴
	const [menuIndex, setMenuIndex] = useState<number>(0);
	const [subMenuIndex, setSubMenuIndex] = useState<number>(0);

	return (
		<EventHeaderContainer>
			<Column>
				<Row between fullWidth>
					<SpaceContainer row={18} column={18}>
						<Row>
							<Icon
								icon="arrowLeftBlack"
								size={20}
								event={() => history.push("/event")}
							/>
							<Space row={36} />
							<Text size={19}>피부</Text>
						</Row>
					</SpaceContainer>
					<Row>
						<SpaceContainer row={12} column={12}>
							{searchIcon}
						</SpaceContainer>
						<>{auth.user() && <UserWish />}</>
					</Row>
				</Row>
				<SpaceContainer borderBottom={"#E6E6E6"} rows={[0, 16]}>
					<Row isOverFlow isScroll>
						{DetailCategory.map((item: any, index: number) => (
							<>
								{index == menuIndex ? (
									<SelectedMenu key={index} onClick={() => setMenuIndex(index)}>
										{item.title}
										<SelectedBorder />
									</SelectedMenu>
								) : (
									<UnSelectedMenu
										key={index}
										onClick={() => setMenuIndex(index)}
									>
										{item.title}
									</UnSelectedMenu>
								)}
							</>
						))}
					</Row>
				</SpaceContainer>
				<Space column={12} />
				<SpaceContainer rows={[0, 16]}>
					<SubContainer>
						{DetailCategory[menuIndex].sub?.map((item: any, index: number) => (
							<>
								{index == subMenuIndex ? (
									<SelectedSub
										key={index}
										onClick={() => setSubMenuIndex(index)}
									>
										{item.title}
									</SelectedSub>
								) : (
									<UnSelectedSub
										key={index}
										onClick={() => setSubMenuIndex(index)}
									>
										{item.title}
									</UnSelectedSub>
								)}
							</>
						))}
					</SubContainer>
				</SpaceContainer>
			</Column>
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

const SelectedMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 4px;
	position: relative;
	color: #ef4b81;
	font-size: 15px;
	margin: 0 20px 0 0;
`;
const SelectedBorder = styled.div`
	width: 100%;
	height: 2px;
	background-color: #ef4b81;
	position: absolute;
	bottom: 0;
`;
const UnSelectedMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 4px;
	position: relative;
	color: #a8a8a8;
	font-size: 15px;
	margin: 0 20px 0 0;
`;

const SubContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	overflow-x: scroll;
	scrollbar-width: none;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: none;
	border-right: 1px solid #e6e6e6;
	&::-webkit-scrollbar {
		display: none;
	}
	scroll-behavior: smooth;
`;
const SelectedSub = styled.div`
	flex: 0 0 auto;
	overflow: hidden;
	background-color: #ef4b81;
	align-items: center;
	justify-content: center;
	padding: 8px 12px;
	border-radius: 100px;
	color: white;
	font-size: 13px;
	font-weight: 700;
	margin: 0 20px 0 0;
`;
const UnSelectedSub = styled.div`
	flex: 0 0 auto;
	overflow: hidden;
	background-color: #f7f7f7;
	align-items: center;
	justify-content: center;
	padding: 8px 12px;
	border-radius: 100px;
	color: #a8a8a8;
	font-size: 13px;
	font-weight: 700;
	margin: 0 20px 0 0;
`;
