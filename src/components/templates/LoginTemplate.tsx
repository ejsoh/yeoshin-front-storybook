import React from "react";
import { ContentsContainer } from "components/organisms";

export const LoginTemplate = ({
	header,
	contents,
	seo,
}: {
	header: JSX.Element;
	contents: JSX.Element;
	seo: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{header}
			{contents}
			{seo}
		</ContentsContainer>
	);
};
