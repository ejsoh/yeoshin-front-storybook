import React from "react";
import { ContentsContainer } from "components/organisms";

export const CustomPageTemplate = ({
	header,
	seo,
	contents,
}: {
	header: JSX.Element;
	seo: JSX.Element;
	contents: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{header}
			{seo}
			{contents}
		</ContentsContainer>
	);
};
