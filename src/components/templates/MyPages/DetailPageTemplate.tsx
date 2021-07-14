import React from "react";
import { ContentsContainer, Header } from "components/organisms";

export const DetailPageTemplate = ({
	header,
	seo,
	contents,
	location,
}: {
	header: string;
	seo: JSX.Element;
	contents: JSX.Element;
	location: string;
}) => {
	return (
		<ContentsContainer>
			<Header text={header} location={location} />
			{seo}
			{contents}
		</ContentsContainer>
	);
};
