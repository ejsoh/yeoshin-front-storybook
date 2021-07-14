import {
	Header,
	JoinMemberContents,
	TermsDataContents,
} from "components/organisms";
import { useInjection } from "hooks";
import { JoinMemberTemplate } from "components/templates";
import MemberJoinDomain from "./domain";
import React from "react";
import { Seo } from "helper";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import { verificationItems } from "models/stores/VerificationStore";

const JoinMember = ({ ...rest }) => {
	const {
		verificationStore,

		fetchStore,
	} = useInjection(mapper);
	const {
		verifySms,
		smsSetConfirmNumber,
		verifyRecommand,
		checkList,
	} = MemberJoinDomain();

	React.useEffect(() => {
		fetchStore.setState("done");
		return () => verificationStore.reset(verificationItems);
	}, []);

	return (
		<JoinMemberTemplate
			{...rest}
			seo={<Seo title="여신티켓 회원가입" />}
			header={<Header text="회원가입" location="/login" />}
			contents={
				<JoinMemberContents
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

export default observer(JoinMember);
