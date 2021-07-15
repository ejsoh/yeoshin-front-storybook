import React from "react";
import styled from "@emotion/styled/macro";
import { Column, Row } from "components/atoms/Grid";
import { Text } from "components/atoms/Text";
import { SpaceContainer } from "components/atoms/Spacing";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { mapper } from "models/RootStore";
import { OnlyTruthyShow } from "../isShowEventWrap/isShowEvent";

const ModalContainer = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #3d3d3d9e;
	z-index: 9999;
	justify-content: center;
	align-items: center;
`;
const ModalContents = styled.div`
	max-width: 312px;
	width: 80%;
	background-color: #fff;
	display: flex;
	border-radius: 4px;
`;

const SpaceButton = styled(Text)`
	padding: 20px;
`;

export const Modal = observer(() => {
	const { interactionStore } = useInjection(mapper);
	const confirmClick = () => {
		interactionStore.setIsConfirm("", false, false);
	};
	const cancelClick = () => {
		interactionStore.setIsConfirm("", false, true);
	};
	const closeClick = () => {
		interactionStore.setIsAlert("");
	};
	return (
		<>
			<OnlyTruthyShow condition={interactionStore.getIsAlert().isShow}>
				<ModalContainer>
					<ModalContents>
						<Column fullWidth>
							<SpaceContainer column={20} row={24}>
								<Text gray left>
									{interactionStore.getIsAlert().message}
								</Text>
							</SpaceContainer>

							<SpaceContainer column={15} row={24} onClick={closeClick}>
								<Text pink size={15}>
									확인
								</Text>
							</SpaceContainer>
						</Column>
					</ModalContents>
				</ModalContainer>
			</OnlyTruthyShow>
			<OnlyTruthyShow condition={interactionStore.getIsComfirm().isShow}>
				<ModalContainer>
					<ModalContents>
						<Column fullWidth>
							<SpaceContainer column={20} row={24}>
								<Text gray left>
									{interactionStore.getIsComfirm().message}
								</Text>
							</SpaceContainer>

							<Row right>
								<SpaceButton pink onClick={confirmClick} size={15}>
									확인
								</SpaceButton>

								<SpaceButton onClick={cancelClick} gray size={15}>
									취소
								</SpaceButton>
							</Row>
						</Column>
					</ModalContents>
				</ModalContainer>
			</OnlyTruthyShow>
		</>
	);
});
