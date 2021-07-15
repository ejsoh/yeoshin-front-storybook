import { Button, Icon } from "components/atoms";
import { Column, Row } from "components/atoms/Grid";
import { Space, SpaceContainer } from "components/atoms/Spacing";
import React from "react";
import { Text } from "components/atoms/Text";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { useInjection } from "hooks";
import { InputWrap } from "components/molecules";
import { ValidationText } from "components/molecules/anchors/ValidationAnchor";

export const WithDrawContents = observer(
	({ withdraw }: { withdraw: () => void }) => {
		const { userInfoStore, interactionStore } = useInjection(mapper);
		const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			interactionStore.setInputValue({ password: e.target.value }),
				interactionStore.setValidationMessage({});
		};
		return (
			<Column space={[10, 10]}>
				<InputWrap
					beforeIcon={
						<Icon icon="nav_mypage" color={"lightgray"} padding="10px" />
					}
					value={userInfoStore.getUserInfo().id}
					disabled={true}
				/>

				<Space column={5} />
				<InputWrap
					onChange={onChange}
					beforeIcon={
						<Icon icon="padlock" color={"lightgray"} padding="10px" />
					}
					type={"password"}
					placeholder={"패스워드확인"}
				/>
				<ValidationText>
					{interactionStore.getValidationMessage().pwd}
				</ValidationText>
				<SpaceContainer column={20}>
					{withDrawterms.map(item => (
						<Row key={item}>
							<Text lightgray>&#8226;</Text>
							<Text size={10} left lightgray>
								{item}
							</Text>
						</Row>
					))}
				</SpaceContainer>
				<Button large filled onClick={withdraw}>
					탈퇴하기
				</Button>
			</Column>
		);
	}
);

const withDrawterms = [
	"탈퇴후에는 동일한 아이디와 휴대폰번호로 재가입 할 수 없습니다.",

	"서비스 해지 후 서비스 부정이용 방지를 위하여 7일간 서비스 가입이 불가능 합니다.",

	"본 서비스를 탈퇴하시면 서비스 활동이 불가능하며 이용시 발생한 포인트 및 쿠폰등은 복원되지 않습니다.",

	"서비스 탈퇴 후에는 그 동안 이용하셨던 모든 내역의 조회, 상담과 제반 서비스 등에 일정 제한이 생길 수 있음을 양지하여 주시기 바랍니다.",

	"탈퇴 즉시 개인정보가 삭제되며, 어떠한 방법으로도 복원할 수 없습니다.",

	"아이디와 연락처는 중복가입 방지를 위해서만 시스템상 암호화 처리되어사용됩니다.",

	"전자상거래 서비스 등의 거래내역은 전자상거래등에서의 소비자보호에 관한 법률에 의거하여 보관됩니다.",
];
