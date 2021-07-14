import {
	SEND_SERVICE_PARTNER,
	JOINMEMBER_URL,
	SNS_JOINMEMBER_URL,
	VERIFY_SMS_URL,
	VERIFY_SMS_CONFIRM,
	LOGIN_URL,
	SNS_LOGIN_URL,
	LOGOUT_URL,
	MEMBER_CACHE_DATA,
	verifyId,
	recommendId,
	GRADE_INFO,
	CACHE_SYNC,
	WISH_CREATE,
	MYINFO_MODIFY,
	COUPON_LIST,
	COUPON_REGIST,
	CONSULTATIONLIST,
	MYPOINT_LIST,
	EXCHANGE_POINT,
	WISH_LIST,
	MY_HOSPITALS,
	FIND_HOSPITALS_LIST,
	NOTICE,
	FAQ,
	BOARD_COMMENTS,
	SET_BOARD_COMMENTS,
	YEOSHING_EVENTS,
	GET_MEMBER_BODY,
	GET_MEMBER_AREA,
	GET_DEFAULT_AREA,
	GET_MEMBER_INFO_MODIFY,
	GET_POINT_LIST,
	MEMBER_WITHDRAW,
} from "./accounts";
import {
	HOSPITAL_LIKE,
	HOSPITAL_DISLIKE,
	HOSPITAL_LIKE_LIST,
	MAIN_RECOMMEND_LIST,
	MAIN_NEW_LIST,
	RECENTLY_KEYWORD,
	SEARCH_RECOMMEND_LIST,
	getUserSearchKeyword,
	SET_USER_SEARCH_KEYWORD,
	deleteUserSearchKeyword,
	USER_REVIEW_POPUP,
	MAIN_BANNER,
	YEOSHIN_TV,
	PRODUCT_TAG,
	USER_SELECTED_HOSPITAL_LIST,
	WISH_DELETE,
	ACCOUNT_HOSPITAL_LIKE,
} from "./products";
import {
	SKIN_MAP,
	SKIN_MAP_HOSPITAL,
	SKIN_MAP_PAGING,
	SKIN_MAP_TOTAL,
} from "./search";

export {
	SKIN_MAP,
	SKIN_MAP_PAGING,
	SKIN_MAP_HOSPITAL,
	SKIN_MAP_TOTAL,
	HOSPITAL_LIKE,
	HOSPITAL_DISLIKE,
	HOSPITAL_LIKE_LIST,
	MAIN_RECOMMEND_LIST,
	MAIN_NEW_LIST,
	RECENTLY_KEYWORD,
	SEARCH_RECOMMEND_LIST,
	getUserSearchKeyword,
	SET_USER_SEARCH_KEYWORD,
	deleteUserSearchKeyword,
	USER_REVIEW_POPUP,
	MAIN_BANNER,
	YEOSHIN_TV,
	PRODUCT_TAG,
	USER_SELECTED_HOSPITAL_LIST,
	WISH_DELETE,
	ACCOUNT_HOSPITAL_LIKE,
	JOINMEMBER_URL,
	SNS_JOINMEMBER_URL,
	VERIFY_SMS_URL,
	VERIFY_SMS_CONFIRM,
	LOGIN_URL,
	SNS_LOGIN_URL,
	LOGOUT_URL,
	MEMBER_CACHE_DATA,
	verifyId,
	recommendId,
	GRADE_INFO,
	CACHE_SYNC,
	WISH_CREATE,
	MYINFO_MODIFY,
	COUPON_LIST,
	COUPON_REGIST,
	CONSULTATIONLIST,
	MYPOINT_LIST,
	EXCHANGE_POINT,
	WISH_LIST,
	MY_HOSPITALS,
	FIND_HOSPITALS_LIST,
	NOTICE,
	FAQ,
	BOARD_COMMENTS,
	SET_BOARD_COMMENTS,
	YEOSHING_EVENTS,
	GET_MEMBER_BODY,
	GET_MEMBER_AREA,
	GET_DEFAULT_AREA,
	GET_MEMBER_INFO_MODIFY,
	GET_POINT_LIST,
	SEND_SERVICE_PARTNER,
	MEMBER_WITHDRAW,
};
import dotenv from "dotenv";
dotenv.config();

// yeoshin home URL
export const HOME = "https://yeoshin.co.kr";

// yeoshin react home
export const FRONT_HOME = process.env.REACT_APP_HOME;
export const ACCOUNT_HOME = process.env.REACT_APP_ACCOUNT_HOME;
export const mainSearch = (keyword: string) =>
	`${HOME}/?pn=product.search.list&keyword=${keyword}`;