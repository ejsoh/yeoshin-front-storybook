import { PageHelpers } from "components/molecules/PageHelpers";
import { ContentsContainer } from "components/organisms";
import React from "react";

const EventTemplate = ({
	seo,
	header,
	contents,
	search,
}: {
	seo: JSX.Element;
	header: JSX.Element;
	contents: JSX.Element;
	search: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{seo}
			{header}
			{contents}
			{search}
			<PageHelpers />
		</ContentsContainer>
	);
};
export default React.memo(EventTemplate);
