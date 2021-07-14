import { Header, TermsDataContents } from "components/organisms";
import React, { useEffect } from "react";
import { getStorage, removeStorage } from "services/utils/localStorage";
import { useInjection } from "hooks";
import { JoinMemberTemplate } from "components/templates";
import MemberJoinDomain from "./domain";
import { Seo } from "helper";
import { SnsJoinMemberContents } from "components/organisms";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { verificationItems } from "models/stores/VerificationStore";

const userInfoInit = {
	name: "",
	email: "",
	id: "",
	snsType: "",
};

const SnsJoinMember = () => {
	const { verificationStore, fetchStore } = useInjection(mapper);

	const {
		verifySms,
		smsSetConfirmNumber,
		verifyRecommand,
		checkList,
	} = MemberJoinDomain();

	useEffect(() => {
		removeStorage([
			"com.naver.nid.access_token",
			"com.naver.nid.oauth.state_token",
		]);
		const userInfo = {
			...userInfoInit,
			...JSON.parse(getStorage("userInfo") as string),
		};

		verificationStore.setPartial({
			name: userInfo.name,
			email: userInfo.email,
			encId: userInfo.id,
			snsType: userInfo.snsType,
		});
		fetchStore.setState("done");
		return () => verificationStore.reset(verificationItems);
	}, [verificationStore]);

	return (
		<JoinMemberTemplate
			seo={<Seo title="여신티켓 회원가입" />}
			header={<Header text="회원가입" location="/login" />}
			contents={
				<SnsJoinMemberContents
					smsProps={verifySms}
					smsConfirmProps={smsSetConfirmNumber}
					checkList={checkList}
					recommandProps={verifyRecommand}
				/>
			}
			termsData={<TermsDataContents />}
		/>
	);
};

export default observer(SnsJoinMember);
