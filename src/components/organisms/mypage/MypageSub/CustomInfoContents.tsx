import { Button, Icon } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import { SubTitle, SwitchButton, Title } from "../mypageCommon/MyPageAtoms";
import { Text } from "components/atoms/Text";
import {
	composeBodyData,
	initBodyData,
} from "services/mapper/subPageMapper/customInfoMapper";
import { useFormHandler, useInjection } from "hooks";
import { AreaRegister } from "./customInfo/AreaRegister";
import { CustomInfoDomain } from "pages/mypage/CustomInfo";
import { DateSelectBox } from "components/molecules/inputWrap/SelectBoxWrap";
import { FixedButton } from "components/atoms/Button/Button";
import { InputWrap } from "components/molecules";
import { ModifyUserInfoDomain } from "pages/mypage/ModifyUserInfo";
import { PartCheckList } from "./customInfo/PartCheckList";
import React from "react";
import { SelectedAreaLists } from "./customInfo/CustomSelectedLists";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { Validation } from "components/molecules/anchors/ValidationAnchor";
import { validationHelper } from "helper";

export const CustomInfoContents = observer(() => {
	const { registerCustomInfo } = CustomInfoDomain();
	const { userInfoStore, fetchStore, interactionStore } = useInjection(mapper);
	const { checkNickName } = ModifyUserInfoDomain();

	const setInfo = (key: string, value: string) =>
		userInfoStore.setUserInfoSpecific(key, value);

	const userInfo = userInfoStore.getUserInfo();

	const formValue = useFormHandler({
		setValue: {
			newNickName: text => setInfo("newNickName", text),
		},
		getValue: { newNickName: userInfo.newNickName },
	});

	const { getFormProps } = formValue;

	const resetBody = () => {
		fetchStore.setResponse({
			...fetchStore.fetchStore(),
			body: { data: composeBodyData, count: initBodyData },
		});
	};
	const passRefConfig = {
		target: interactionStore.getValidationMessage(),
		targets: ["nickname", "birth", "part", "area"],
		inputValue: getFormProps,
	};

	const checkNicknameEvent = () => checkNickName(userInfo.newNickName);
	const sexualCheckEvent = () => {
		userInfoStore.setUserInfo({
			...userInfoStore.getUserInfo(),
			sex: userInfoStore.getUserInfo().sex === "F" ? "M" : "F",
		});
	};
	const userAreaResetEvent = () => {
		fetchStore.setResponse({
			...fetchStore.fetchStore(),
			selectedArea: [],
		});
		interactionStore.setIsEventShow(false);
	};
	const userAreaEventClose = () => {
		document.body.style.overflow = "hidden";
		interactionStore.setIsEventShow(true);
	};
	return (
		<Column>
			<Title>????????????</Title>

			<SubTitle>?????????</SubTitle>

			<Validation
				{...passRefConfig}
				current="nickname"
				text={interactionStore.getValidationMessage().nickname}
				padding={"0 10px"}
			>
				<Row between>
					<InputWrap
						isFullWidth
						placeholder="???????????? ????????? ?????????!"
						afterIcon={
							<SpaceContainer row={5}>
								<Icon
									icon="close"
									color="gray"
									size={15}
									event={() => setInfo("newNickName", "")}
								/>
							</SpaceContainer>
						}
						{...getFormProps("newNickName")}
					/>
					<SpaceContainer rows={[0, 10]}>
						<Button
							minWidth={83}
							round
							filledBlack
							padding={10}
							disabled={
								userInfo.newNickName === "" ||
								!validationHelper(userInfo.newNickName, 2)("minLength").result
							}
							onClick={checkNicknameEvent}
						>
							?????? ??????
						</Button>
					</SpaceContainer>
				</Row>
			</Validation>

			<SubTitle>????????????</SubTitle>
			<Validation
				{...passRefConfig}
				current="birth"
				text={interactionStore.getValidationMessage().birth}
				padding="0 10px"
			>
				<Row between>
					<DateSelectBox isPrimary label={"????????????"} />
					<SwitchButton
						event={sexualCheckEvent}
						right="???"
						left="???"
						current={userInfoStore.getUserInfo().sex === "F"}
					/>
				</Row>
			</Validation>

			<Space column={25} />

			<Validation
				{...passRefConfig}
				current="part"
				text={interactionStore.getValidationMessage().part}
				textPadding="0 0 0 15px"
			>
				<Title>
					?????? ??????
					<Row onClick={resetBody}>
						<Icon icon="restart" />
						<Text left>?????? ?????????</Text>
					</Row>
				</Title>
			</Validation>

			<PartCheckList part={["face", "??????"]} />
			<PartCheckList part={["skin", "??????"]} />
			<PartCheckList part={["body", "??????"]} />
			<PartCheckList part={["etc", "??????"]} />

			<Space column={30} />

			<Validation
				{...passRefConfig}
				current="area"
				text={interactionStore.getValidationMessage().area}
				textPadding="0 0 0 15px"
			>
				<Title>
					?????? ??????
					<Row onClick={userAreaResetEvent}>
						<Icon icon="restart" />
						<Text left>?????? ?????????</Text>
					</Row>
				</Title>
			</Validation>

			<SubTitle>
				???????????? ({fetchStore.fetchStore().selectedArea.length})
			</SubTitle>

			<Row between space={[0, 10]} onClick={userAreaEventClose}>
				<InputWrap
					isFullWidth
					placeholder="????????? ???????????? ????????? ?????????!"
					disabled={true}
				/>
				<SpaceContainer rows={[0, 10]}>
					<Button round minWidth={50} filledBlack padding={10}>
						??????
					</Button>
				</SpaceContainer>
			</Row>

			<SelectedAreaLists />

			<FixedButton title={"??????"} onClick={registerCustomInfo} />

			{interactionStore.getIsEventShow() && <AreaRegister />}
		</Column>
	);
});
