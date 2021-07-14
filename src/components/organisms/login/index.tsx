import { Button, InputText } from "components/atoms";
import { useFormHandler, useInjection } from "../../../hooks";
import { Label } from "components/atoms/Label/Label";
import React from "react";
import { RootStoreModel } from "../../../models/RootStore";
import { Row } from "components/atoms/Grid";
import { SnsContainer } from "../sns";
import { Space } from "components/atoms/Spacing";
import { Text } from "components/atoms/Message";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { loginPath } from "services/utils/analystics/googleAnalystics";
import { Link } from "react-router-dom";
import { getIpAction } from "services/utils/getIp";

const RegistFormPage = styled.div`
	padding: 0px 20px;
	& > div,
	& > form {
		margin-top: 8px;
	}
	& > button {
		margin-top: 20px;
	}
`;

const alignTextMenu = css`
	margin: 0 10px;
`;

const mapper = ({ loginStore, fetchStore }: RootStoreModel) => ({
	loginStore,
	fetchStore,
});

type LoginType = { loginEvent: (ip: string) => void };

const LoginContents = observer(({ loginEvent }: LoginType) => {
	const { loginStore, fetchStore } = useInjection(mapper);

	const formValue = useFormHandler({
		setValue: {
			id: loginStore.setUserId,
			password: loginStore.setUserPassword,
		},
		getValue: {
			id: loginStore.userInfo().id,
			password: loginStore.userInfo().password,
		},
		event: e => enterEvent(e),
	});
	const loginWithIp = () => {
		getIpAction(loginEvent);
	};
	const enterEvent = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			loginWithIp();
			loginPath("일반로그인");
		}
	};

	const { getFormProps } = formValue;

	return (
		<RegistFormPage>
			<Space column={25} />
			<Label isForm>
				<InputText primary pink placeholder="아이디" {...getFormProps("id")} />
			</Label>

			<Label isForm>
				<InputText
					primary
					pink
					placeholder="비밀번호"
					type="password"
					autoComplete="true"
					{...getFormProps("password")}
				/>
			</Label>

			<Text pink left small>
				{fetchStore.getError().msg}
			</Text>
			<Button filled large onClick={loginWithIp}>
				로그인
			</Button>

			<Row right>
				<Link to="/joinMember">
					<Text pink>회원가입</Text>
				</Link>
				<Text pink css={alignTextMenu}>
					|
				</Text>
				<Text
					pink
					as="a"
					href="https://yeoshin.co.kr/?pn=member.find_idpw.form"
				>
					로그인정보찾기
				</Text>
			</Row>
			<SnsContainer />
		</RegistFormPage>
	);
});

export default LoginContents;
