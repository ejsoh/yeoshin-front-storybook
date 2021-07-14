import { ContentsContainer } from "components/organisms";
import React from "react";

export const MyPageLoggedInTemplate = ({
	header,
	userInfo,
	seo,
	contents,
	logout,
}: {
	header: JSX.Element;
	userInfo: JSX.Element;
	seo: JSX.Element;
	contents: JSX.Element;
	logout: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{header}
			{seo}
			{userInfo}
			{contents}
			{logout}
		</ContentsContainer>
	);
};

export const MyPageNotLoggedInTemplate = ({
	header,
	needLogin,
	seo,
	contents,
}: {
	header: JSX.Element;
	needLogin: JSX.Element;
	seo: JSX.Element;
	contents: JSX.Element;
}) => {
	return (
		<ContentsContainer>
			{header}
			{needLogin}
			{seo}
			{contents}
		</ContentsContainer>
	);
};
