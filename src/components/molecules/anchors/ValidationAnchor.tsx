import React from "react";

import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { useScrollInto } from "hooks/useScrollInto";
import { Text, textCommon } from "components/atoms/Text";
import { Icon } from "components/atoms";

export const ValidationText = styled(Text)`
	${textCommon}
	display: flex;
	justify-content: start;
	align-items: center;
	color: #ff4e84;
	bottom: 0;
	font-size: 10px;
`;

const ValidationWrap = React.forwardRef(function Validation(
	props,
	ref?: React.Ref<HTMLDivElement>
) {
	return <div ref={ref}>{props.children}</div>;
});

export const validationTextMapper = (msg: string) => (
	<ValidationText left small>
		{msg}
	</ValidationText>
);

export const validationState = () => ({
	checkNickname: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				닉네임 입력 또는 중복확인을 해주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				사용가능한 닉네임입니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	customvalidation: (msg: string) => {
		const result = (
			<ValidationText left small>
				{msg}
			</ValidationText>
		);
		return result;
	},
	sameNickname: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				기존 닉네임과 같습니다.
			</ValidationText>
		);

		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				사용가능한 닉네임입니다
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	usedNickname: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				이미 사용중인 닉네임입니다.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				사용가능한 닉네임입니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	name: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				이름을 확인해 주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				사용가능한 이름입니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	mobile: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				휴대폰번호를 확인 또는 인증을 완료해 주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				사용가능한 휴대폰번호입니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	email: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				이메일 주소를 확인해 주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				사용가능한 이메일 주소입니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	birth: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				올바른 생년월일을 입력 해 주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				입력되었습니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	area: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				관심지역를 한개 이상 선택 해 주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				선택되었습니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	part: (isValid: boolean) => {
		const fail = (
			<ValidationText left small>
				관심부위을 한개 이상 선택 해 주세요.
			</ValidationText>
		);
		const success = (
			<ValidationText left small>
				<Icon icon="validCheck" size={15} />
				선택되었습니다.
			</ValidationText>
		);
		return isValid ? success : fail;
	},
	modifySuccess: "수정이 완료 되었습니다.",
});
type ValidationStyleProps = { padding?: string };

const ValidationContainer = styled.div<ValidationStyleProps>`
	${props => props.padding && `padding: ${props.padding}`}
`;

export const Validation = observer(
	({
		text,
		children,
		current,
		target,
		targets,
		padding,
		textPadding,
		inputValue,
	}: {
		text: JSX.Element;
		current: string;
		target: { [key: string]: string };
		targets: string[];
		children: JSX.Element;
		padding?: string;
		textPadding?: string;
		inputValue?: (item: string) => { [key: string]: string };
	}) => {
		const scrollInto = useScrollInto({
			target: target,
			targets: targets,
		});
		const { targetElement } = scrollInto;
		const { interactionStore } = useInjection(mapper);

		React.useEffect(() => {
			inputValue &&
				inputValue(current).value !== "" &&
				interactionStore.setValidationMessage({});
		}, [inputValue && inputValue(current).value]);
		return (
			<ValidationWrap {...targetElement(current)}>
				<ValidationContainer padding={padding}>
					{children}
					<ValidationContainer padding={textPadding}>
						{text}
					</ValidationContainer>
				</ValidationContainer>
			</ValidationWrap>
		);
	}
);
