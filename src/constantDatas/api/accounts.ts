import dotenv from "dotenv";
dotenv.config();

const BASEURL = process.env.REACT_APP_BASE_URL;
const webPrefixParams = "latest/web";

// 회원가입
export const JOINMEMBER_URL = (device: string) =>
	`${BASEURL}latest/${device}/member/signup`;

// sns회원가입
export const SNS_JOINMEMBER_URL = (device: string) =>
	`${BASEURL}latest/${device}/member/sns/signup`;

// sms 인증번호 요청
export const VERIFY_SMS_URL = `${BASEURL}${webPrefixParams}/member/verify/sms`;

// sms 인증번호 확인
export const VERIFY_SMS_CONFIRM = `${BASEURL}${webPrefixParams}/member/verify/sms/confirm`;

// 로그인
export const LOGIN_URL = (device: string) =>
	`${BASEURL}latest/${device}/member/login`;

// SNS로그인
export const SNS_LOGIN_URL = (device: string) =>
	`${BASEURL}latest/${device}/member/sns/login`;

// 로그아웃
export const LOGOUT_URL = (device: string) =>
	`${BASEURL}latest/${device}/member/logout`;

// 회원 캐시정보
export const MEMBER_CACHE_DATA = `${BASEURL}${webPrefixParams}/member/cashdata`;

// 아이디 중복 조회
export const verifyId = (memberId: string) => {
	return `${BASEURL}${webPrefixParams}/member/verify/id/${memberId}`;
};

// 닉네임 중복 조회
export const verifyNickname = (nickname: string) => {
	return `${BASEURL}${webPrefixParams}/member/verify/nickname/${nickname}`;
};

// 추천인 중복 조회
export const recommendId = (recommendId: string) => {
	return `${BASEURL}${webPrefixParams}/member/verify/recommend/id/${recommendId}`;
};

// 회원 등급 정보
export const GRADE_INFO = `${BASEURL}${webPrefixParams}/member/gradeinfo`;

// 캐시 싱크
export const CACHE_SYNC = `${BASEURL}${webPrefixParams}/member/sync`;

// 이벤트 찜
export const WISH_CREATE = `${BASEURL}${webPrefixParams}/user/wish/events`;

// 내 정보 수정
export const MYINFO_MODIFY = `${BASEURL}${webPrefixParams}/user`;

// 내 쿠폰 조회
export const COUPON_LIST = `${BASEURL}${webPrefixParams}/user/coupons`;

// 쿠폰 등록
export const COUPON_REGIST = `${BASEURL}${webPrefixParams}/member/offline-coupon`;

// 상담내역 조회
export const CONSULTATIONLIST = `${BASEURL}${webPrefixParams}/user/inquiry/consultation`;

// 활동내역 조회
export const MYPOINT_LIST = `${BASEURL}${webPrefixParams}/user/point/action-logs`;

// 포인트 전환
export const EXCHANGE_POINT = `${BASEURL}${webPrefixParams}/user/point/conversion`;

// 찜 이벤트 조회
export const WISH_LIST = `${BASEURL}${webPrefixParams}/user/wish/events`;

// 단골병원 조회
export const MY_HOSPITALS = `${BASEURL}${webPrefixParams}/user/wish/hospitals`;

// 병원찾기
export const FIND_HOSPITALS_LIST = `${BASEURL}${webPrefixParams}/hospitals`;

// 공지사항
export const NOTICE = `${BASEURL}${webPrefixParams}/board/notice`;

// 자주묻는질문
export const FAQ = `${BASEURL}${webPrefixParams}/board/faq`;

// 게시물 댓글 리스트 조회
export const BOARD_COMMENTS = `${BASEURL}${webPrefixParams}/board/comments`;

// 게시물 댓글 등록
export const SET_BOARD_COMMENTS = `${BASEURL}${webPrefixParams}/board/comment`;

// 여신이벤트조회
export const YEOSHING_EVENTS = `${BASEURL}${webPrefixParams}/board/events`;

// 회원관심부위 조회
export const GET_MEMBER_BODY = `${BASEURL}${webPrefixParams}/user/attention/body`;

// 회원 관심지역 조회
export const GET_MEMBER_AREA = `${BASEURL}${webPrefixParams}/user/attention/area`;

// 기본 지역 목록 조회
export const GET_DEFAULT_AREA = `${BASEURL}${webPrefixParams}/area/basic`;

// 회원 관심부위 관심지역 수정
export const GET_MEMBER_INFO_MODIFY = `${BASEURL}${webPrefixParams}/user/addinfo`;

// 포인트 내역 조회
export const GET_POINT_LIST = `${BASEURL}${webPrefixParams}/user/point/point-logs`;

// 제휴 문의
export const SEND_SERVICE_PARTNER = `${BASEURL}${webPrefixParams}/inquiry/partner`;

// 회원탈퇴
export const MEMBER_WITHDRAW = `${BASEURL}${webPrefixParams}/user/withdraw`;

// SNS 연동 추가
export const SNS_CONNECTION = `${BASEURL}${webPrefixParams}/user/sns/connection`;

// deviceVersion 정보 조회
export const DEVICE_INIT = (device: string) =>
	`${BASEURL}latest/${device}/initialization`;
