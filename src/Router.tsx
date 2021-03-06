import { navData } from "components/organisms/footer/Footer";
import { Login, ModifyUserInfo, SkinMapPage, SnsJoinMember } from "pages";

import { Notice, NoticeDetail } from "pages/mypage/Notice";
import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
	withRouter,
} from "react-router-dom";
import {
	eventTracking,
	eventTrackingIncreaseCount,
	userTracking,
} from "services/utils/analystics/amplitude";
import { useAuth, useInjection, useProvideAuth } from "hooks";

import { CustomInfo } from "pages/mypage/CustomInfo";
import { AppleLogin, EmptyLogin, SnSAppLoading } from "pages/login/SnsLoading";
import { FindHospitals } from "pages/mypage/FindHospitals";
import { JoinMember } from "pages/joinMember";
import { Main } from "pages/main/Main";
import { Event } from "pages/event/Event";
import MemberJoinComPage from "pages/singlePage/MemberJoinComPage/MemberJoinComPage";
import { MyConsultList } from "pages/mypage/MyConsultList";
import { MyHospitals } from "pages/mypage/MyHospitals";
import { LoggedInMyPage, NotLoggedInMyPage } from "pages/mypage/MyPage";
import { MyPointList } from "pages/mypage/MyPointList";
import { MyQnA } from "pages/mypage/MyQnA";
import { MyReview } from "pages/mypage/MyReview";
import { OftenQuestions } from "pages/mypage/OftenQuestions";
import { PointBenefit } from "pages/mypage/PointBenefit";
import { PointList } from "pages/mypage/PointList";
import React from "react";
import { ReceiptEvent } from "pages/mypage/ReceiptEvent";
import { RequestConsult } from "pages/mypage/RequestConsult";
import { mapper } from "models/RootStore";
import { ServicePartner } from "pages/mypage/ServicePartner";
import { UserCoupon } from "pages/mypage/UserCoupon";
import { WishList } from "pages/mypage/WishList";
import { WithDraw } from "pages/mypage/WithDraw";
import { YeoshinEvents } from "pages/mypage/YeoshinEvents";
import { YeoshinGuide } from "pages/mypage/YeoshinGuide";
import { authContext } from "hooks/useAuth";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { gaPageView } from "services/utils/analystics/googleAnalystics";
import { currentLocation } from "constantDatas/analysticsUrl";
import { OutOfInApp } from "components/organisms/sns/OutOfInApp";
import { Space } from "components/atoms/Spacing";
import { Modal } from "components/molecules/modal/Modal";
import { EventCategory } from "pages/event/category/EventCategory";

type ElementsType = {
	children: JSX.Element[];
};

type ProvideType = {
	children: JSX.Element;
};

export const generalRoute = [
	{
		path: "/snsJoin",
		component: SnsJoinMember,
		name: "SNS ????????????",
	},
	{
		path: "/myPage",
		component: NotLoggedInMyPage,
		name: "???????????????",
	},
	{
		path: "/joinMember",
		component: JoinMember,
		name: "????????????",
	},
	{
		path: "/memberJoinComplete",
		component: MemberJoinComPage,
		name: "???????????? ??????",
	},
	{ path: "/skinMap", component: SkinMapPage, name: "???????????????" },
	{
		path: "/loading",
		component: EmptyLogin,
	},
	{
		path: "/findHospitals",
		component: FindHospitals,
		name: "????????????",
	},
	{
		path: "/notice",
		component: Notice,
		name: "????????????",
	},
	{
		path: "/noticeDetail/:id",
		component: NoticeDetail,
		name: "???????????? ??????",
	},
	{
		path: "/oftenQuestions",
		component: OftenQuestions,
		name: "??????????????????",
	},
	{
		path: "/servicePartner",
		component: ServicePartner,
		name: "??????/????????????",
	},
	{
		path: "/yeoshinGuide",
		component: YeoshinGuide,
		name: "???????????? ?????????",
	},
	{
		path: "/pointBenefit",
		component: PointBenefit,
		name: "??????????????? ?????????",
	},
	{
		path: "/yeoshinEvents",
		component: YeoshinEvents,
		name: "???????????????",
	},

	{
		path: "/receipt",
		component: ReceiptEvent,
		name: "",
	},
	{
		path: "/redirectOutOfApp",
		component: OutOfInApp,
		name: "???????????? ????????????",
	},
	{
		path: "/snsLoading/:id",
		component: SnSAppLoading,
		name: "???????????? ??? ??????",
	},
	{
		path: "/appleLogin",
		component: AppleLogin,
		name: "apple login",
	},
	{
		path: "/event/skin",
		component: EventCategory,
		name: "????????? ??????",
	},
];

export const redirectMyPage = [
	{
		path: "/modifyUserInfo",
		component: ModifyUserInfo,
		name: "???????????????",
	},
	{
		path: "/myPage",
		component: LoggedInMyPage,
		name: "???????????????",
	},
	{
		path: "/joinMember",
		component: JoinMember,
		name: "????????????",
	},
	{
		path: "/coupon",
		component: UserCoupon,
		name: "????????????",
	},
	{
		path: "/myReview",
		component: MyReview,
		name: "???????????????",
	},
	{
		path: "/myQnA",
		component: MyQnA,
		name: "???????????????",
	},
	{
		path: "/myPoint",
		component: MyPointList,
		name: "????????????",
	},
	{
		path: "/myWishList",
		component: WishList,
		name: "???????????????",
	},
	{
		path: "/myHospitals",
		component: MyHospitals,
		name: "????????????",
	},
	{
		path: "/myConsult",
		component: MyConsultList,
		name: "1:1????????????",
	},
	{
		path: "/customInfo",
		component: CustomInfo,
		name: "??????????????????",
	},
	{
		path: "/pointList",
		component: PointList,
		name: "???????????????",
	},
	{
		path: "/reqeustConsult",
		component: RequestConsult,
		name: "???????????????",
	},
	{
		path: "/withDraw",
		component: WithDraw,
		name: "????????????",
	},
];

const ScrollToTop = withRouter(({ history, children }) => {
	const { fetchStore, interactionStore } = useInjection(mapper);
	userTracking();
	const hasFooter = navData.some(item => item.url === window.location.pathname);
	const unexceptSkinmap = window.location.pathname !== "/skinMap";
	// const userAgent = window.navigator.userAgent.toLowerCase();

	// const isInapp = !/yeoshin_/.test(userAgent);
	React.useEffect(() => {
		const unlisten = history.listen(() => {
			const state = history.location.state;
			const path = history.location.pathname;
			gaPageView(currentLocation(path));
			eventTrackingIncreaseCount(currentLocation(path));
			eventTracking(currentLocation(path));

			!history.location.pathname.includes("pop") &&
				history.location.state !== "goBack" &&
				state !== path &&
				fetchStore.setState("pending");

			interactionStore.setIsAlert("");
			interactionStore.setIsConfirm("", false, true);

			!navData.some(item => item.url === window.location.pathname) &&
				window.scrollTo({ top: 0 });
		});

		return () => {
			unlisten();
		};
	}, []);

	return (
		<div
			css={css`
				height: ${hasFooter && unexceptSkinmap ? "calc(100% - 68px)" : "100%"};
			`}
		>
			{children}
			<Space column={hasFooter ? (unexceptSkinmap ? 60 : 0) : 30} />
			<Modal />
			{/* {hasFooter && isInapp && unexceptSkinmap && (
				<Footer currentPath={window.location.pathname} />
			)} */}
		</div>
	);
});

export const Navigator = () => {
	return (
		<Router>
			<ScrollToTop>
				<DirectionNavigator></DirectionNavigator>
				<Switch>
					<Route path="*"></Route>
				</Switch>
			</ScrollToTop>
		</Router>
	);
};

const RedirectMyPageRoute = ({ children, ...rest }: ElementsType) => {
	const auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user() ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/myPage",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

const DirectionNavigator = withRouter(({ location }) => {
	const auth = useAuth();

	return (
		<>
			<Switch location={location}>
				<Route exact path="/event">
					<Event />
				</Route>
				<Route exact path="/">
					<Main />
				</Route>
				<Route exact path="/login">
					{auth.user() ? <Redirect to="/myPage" /> : <Login />}
				</Route>
				<Route exact path="/myPage">
					{auth.user() ? <LoggedInMyPage /> : <NotLoggedInMyPage />}
				</Route>
				{generalRoute.map(item => (
					<Route
						path={item.path}
						key={item.path}
						component={item.component}
					></Route>
				))}
				<RedirectMyPageRoute>
					{redirectMyPage.map(item => (
						<Route
							path={item.path}
							key={item.path}
							component={item.component}
						></Route>
					))}
				</RedirectMyPageRoute>
			</Switch>
		</>
	);
});

export const ProvideAuth = ({ children }: ProvideType) => {
	const auth = useProvideAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
