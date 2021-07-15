import React, { useState } from "react";
import { TermsData } from "../termsData/TermsData";
import { TextArea } from "components/atoms";
import styled from "@emotion/styled/macro";
import { Text } from "components/atoms/Text";

const TermContainer = styled.div`
	margin: 0 15px;
	margin-top: 13px;
	font-size: 12px;
	word-break: keep-all;

	span {
		text-decoration: underline;
		margin: 0 2px;
		cursor: pointer;
	}
`;

export const TermsDataContents = () => {
	const [getIndex, setindex] = useState<number | null>(null);
	const Toggle = (index: number) => {
		setindex(index);
		getIndex === index && setindex(null);
	};
	const termsData = [
		{
			text: "여신 티켓 이용약관 , ",
			event: Toggle,
			contents: (
				<TextArea
					key="여신 티켓 이용약관"
					height={100}
					value={TermsData.termsdata}
					readOnly
				/>
			),
		},
		{
			text: "개인정보 수집 및 이용동의",
			event: Toggle,
			contents: (
				<TextArea
					key="개인정보 수집 및 이용동의"
					height={100}
					value={TermsData.personal}
					readOnly
				/>
			),
		},
	];

	return (
		<TermContainer>
			<Text gray left small>
				{"본인은 만 14세 이상이며, "}
				{termsData.map((item, i: number) => (
					<span key={i} onClick={() => item.event(i)}>
						{item.text}
					</span>
				))}
				{" 내용을 확인하였으며, 동의합니다."}
			</Text>
			{termsData.map((item, i: number) => getIndex === i && item.contents)}
		</TermContainer>
	);
};
