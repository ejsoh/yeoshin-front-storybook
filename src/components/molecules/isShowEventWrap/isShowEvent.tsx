import React from "react";

/** 첫번째 엘리먼트는 true , 두번째 엘리먼트는 false일때 보인다. */
export const ToggleEvent = ({
	condition,
	children,
}: {
	condition: boolean;
	children: JSX.Element[];
}) => {
	return condition ? children[0] : children[1];
};

export const OnlyTruthyShow = ({
	condition,
	children,
}: {
	condition: boolean;
	children: JSX.Element;
}) => <React.Fragment>{condition && children}</React.Fragment>;
