import { PageHelpers } from "components/molecules/PageHelpers";
import { ContentsContainer } from "components/organisms";
import React from "react";

export const MainTemplate = ({
	header,
	contents,
	seo,
	search,
	popup,
}: {
	header: JSX.Element;
	contents: JSX.Element;
	seo: JSX.Element;
	search: JSX.Element;
	popup: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{search}
			{header}
			{contents}
			{seo}
			{popup}
			<PageHelpers />
		</ContentsContainer>
	);
};
