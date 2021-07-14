import { JoinMemberContents, SnsJoinMemberContents } from "./joinMember";
import { KaKaoBtn, SnsContainer } from "./sns";
import {
	MyPageLoggedIn,
	MypageContents,
	MypageNotLoggedIn,
	WithDrawContents,
} from "./mypage";
import { deviceInfo } from "services/utils/checkUserInfoEntity";
import { Header } from "./header/Header";
import LoginContents from "./login";
import React from "react";
import { TermsDataContents } from "./termsData";
import { mapper } from "models/RootStore";
import { Observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { EllipsisLoading } from "components/atoms/Loading/EllipsisLoading";
import Footer, { navData } from "./footer/Footer";

const Contents = styled.div`
	height: auto;
	background-color: #fff;
`;

const ContentsContainer = ({ children }: { children: JSX.Element[] }) => {
	const { fetchStore } = useInjection(mapper);
	const hasFooter = navData.some(item => item.url === window.location.pathname);
	const unexceptSkinmap = window.location.pathname !== "/skinMap";
	const userAgent = window.navigator.userAgent.toLowerCase();

	const isInapp = !/yeoshin_/.test(userAgent);
	const Loading = React.useCallback(() => {
		const device = deviceInfo();
		const isInapp = device.isInapp && device.isApple;
		return isInapp ? <div></div> : <EllipsisLoading />;
	}, [fetchStore.getState()]);

	return (
		<>
			<Contents>{children}</Contents>
			{hasFooter && isInapp && unexceptSkinmap && (
				<Footer currentPath={window.location.pathname} />
			)}
		</>
	);
};
export {
	JoinMemberContents,
	SnsJoinMemberContents,
	Header,
	TermsDataContents,
	ContentsContainer,
	LoginContents,
	MypageContents,
	MyPageLoggedIn,
	WithDrawContents,
	MypageNotLoggedIn,
	SnsContainer,
	KaKaoBtn,
};
