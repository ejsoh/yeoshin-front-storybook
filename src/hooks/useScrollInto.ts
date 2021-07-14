import React from "react";

export const useScrollInto = ({
	target,
	targets,
}: {
	target: { [key: string]: string };
	targets: string[];
}) => {
	const [getRef] = React.useState(
		Object.fromEntries(
			targets.map(item => [item, React.createRef<HTMLDivElement>()])
		)
	);

	React.useEffect(() => {
		getRef[Object.keys(target)[0]] &&
			getRef[Object.keys(target)[0]].current?.scrollIntoView({
				block: "center",
				behavior: "smooth",
			});
	}, [target]);

	const targetElement = (name: string) => ({
		ref: getRef[name],
	});
	const passComponent = (name: string) => getRef[name];
	return { getRef, targetElement, passComponent };
};
