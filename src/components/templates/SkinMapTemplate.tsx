import React from "react";

export const SkinMapTemplate = ({
	contents,
	seo,
}: {
	contents: JSX.Element;
	seo: JSX.Element;
}) => {
	return (
		<>
			{seo}
			{contents}
		</>
	);
};
