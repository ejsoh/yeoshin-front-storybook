import { PageHelpers } from "components/molecules/PageHelpers";
import { ContentsContainer, Header } from "components/organisms";

import React from "react";

export const SubPageTemplate = ({
	header,
	seo,
	contents,
	isHelper = false,
}: {
	header: string;
	seo: JSX.Element;
	contents: JSX.Element;
	isHelper?: boolean;
}) => {
	return (
		<ContentsContainer>
			<Header text={header} location={"/myPage"} />
			{seo}
			{contents}
			<>{isHelper && <PageHelpers />}</>
		</ContentsContainer>
	);
};
