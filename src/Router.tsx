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
		name: "SNS 회원가입",
	},
	{
		path: "/myPage",
		component: NotLoggedInMyPage,
		name: "마이페이지",
	},
	{
		path: "/joinMember",
		component: JoinMember,
		name: "회원가입",
	},
	{
		path: "/memberJoinComplete",
		component: MemberJoinComPage,
		name: "회원가입 완료",
	},
	{ path: "/skinMap", component: SkinMapPage, name: "피부시술맵" },
	{
		path: "/loading",
		component: EmptyLogin,
	},
	{
		path: "/findHospitals",
		component: FindHospitals,
		name: "병원목록",
	},
	{
		path: "/notice",
		component: Notice,
		name: "공지사항",
	},
	{
		path: "/noticeDetail/:id",
		component: NoticeDetail,
		name: "공지사항 상세",
	},
	{
		path: "/oftenQuestions",
		component: OftenQuestions,
		name: "자주묻는질문",
	},
	{
		path: "/servicePartner",
		component: ServicePartner,
		name: "제휴/광고문의",
	},
	{
		path: "/yeoshinGuide",
		component: YeoshinGuide,
		name: "여신티켓 가이드",
	},
	{
		path: "/pointBenefit",
		component: PointBenefit,
		name: "포인트적립 이벤트",
	},
	{
		path: "/yeoshinEvents",
		component: YeoshinEvents,
		name: "여신이벤트",
	},

	{
		path: "/receipt",
		component: ReceiptEvent,
		name: "",
	},
	{
		path: "/redirectOutOfApp",
		component: OutOfInApp,
		name: "카카오톡 친구추천",
	},
	{
		path: "/snsLoading/:id",
		component: SnSAppLoading,
		name: "네이티브 앱 로딩",
	},
	{
		path: "/appleLogin",
		component: AppleLogin,
		name: "apple login",
	},
	{
		path: "/event/skin",
		component: EventCategory,
		name: "이벤트 피부",
	},
];

export const redirectMyPage = [
	{
		path: "/modifyUserInfo",
		component: ModifyUserInfo,
		name: "내정보수정",
	},
	{
		path: "/myPage",
		component: LoggedInMyPage,
		name: "마이페이지",
	},
	{
		path: "/joinMember",
		component: JoinMember,
		name: "회원가입",
	},
	{
		path: "/coupon",
		component: UserCoupon,
		name: "나의쿠폰",
	},
	{
		path: "/myReview",
		component: MyReview,
		name: "내가쓴후기",
	},
	{
		path: "/myQnA",
		component: MyQnA,
		name: "나의글모음",
	},
	{
		path: "/myPoint",
		component: MyPointList,
		name: "참여점수",
	},
	{
		path: "/myWishList",
		component: WishList,
		name: "찜한이벤트",
	},
	{
		path: "/myHospitals",
		component: MyHospitals,
		name: "단골병원",
	},
	{
		path: "/myConsult",
		component: MyConsultList,
		name: "1:1상담내역",
	},
	{
		path: "/customInfo",
		component: CustomInfo,
		name: "맞춤정보설정",
	},
	{
		path: "/pointList",
		component: PointList,
		name: "포인트내역",
	},
	{
		path: "/reqeustConsult",
		component: RequestConsult,
		name: "문의남기기",
	},
	{
		path: "/withDraw",
		component: WithDraw,
		name: "회원탈퇴",
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
