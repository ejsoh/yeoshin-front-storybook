import { HOME } from "constantDatas/api";
import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {
	description?: string;
	title?: string;
	script?: string[];
};

export const Seo = ({
	description = "피부시술, 쁘띠시술, 다이어트, 성형정보 궁금해? 피부과, 성형외과의 알짜정보는 여신티켓!",
	title = "피부시술정보 플랫폼 - 여신티켓",
	script,
}: Props) => {
	const currentPath = window.location.pathname;

	return (
		<Helmet>
			{/* faceBook */}
			<meta property="og:type" content="website" />

			<meta property="og:image" content={`${HOME}/pages/images/ogimage.jpg`} />

			{/* twitter */}
			<meta name="twitter:card" content="summary" />

			<meta name="twitter:image" content={`${HOME}/pages/images/ogimage.jpg`} />

			<meta name="twitter:site" content="여신티켓" />

			{/* default */}
			<meta
				name="keywords"
				content="피부과, 피부시술, 쁘띠시술, 다이어트, 성형외과, 성형정보, 피부미용, 미용, 피부, 피부관리, 예뻐지기, 피부미인, 가격비교, 가격정보"
			/>

			<meta name="copyright" content="fastlane inc" data-react-helmet="true" />

			{/* override seo information*/}
			{/* twitter */}
			<meta
				name="twitter:description"
				content={description}
				data-react-helmet="true"
			/>
			<meta name="twitter:title" content={title} data-react-helmet="true" />
			<meta
				name="twitter:url"
				content={`${HOME}/${currentPath}`}
				data-react-helmet="true"
			/>

			{/* facebook */}
			<meta
				property="og:description"
				content={description}
				data-react-helmet="true"
			/>
			<meta property="og:site_name" content={title} data-react-helmet="true" />
			<meta
				property="og:url"
				content={`${HOME}/${currentPath}`}
				data-react-helmet="true"
			/>

			{/* default */}
			<meta name="description" content={description} data-react-helmet="true" />
			<meta name="title" content={title} data-react-helmet="true" />
			<meta
				name="url"
				content={`${HOME}/${currentPath}`}
				data-react-helmet="true"
			/>

			<title>{title}</title>
			{script?.map(item => item)}
		</Helmet>
	);
};
