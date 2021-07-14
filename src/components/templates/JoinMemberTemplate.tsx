import React from "react";

import { ContentsContainer } from "components/organisms";

export const JoinMemberTemplate = ({
	seo,
	header,
	contents,
	termsData,
}: {
	seo: JSX.Element;
	header: JSX.Element;
	contents: JSX.Element;
	termsData: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{seo}
			{header}
			{contents}
			{termsData}
		</ContentsContainer>
	);
};
