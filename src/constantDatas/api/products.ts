import dotenv from "dotenv";
dotenv.config();

const MAINURL = process.env.REACT_APP_MAIN_URL;

const mainPrefixParams = "latest/web/exhibition";

// 병의원 좋아요 추가
export const HOSPITAL_LIKE = `${MAINURL}${mainPrefixParams}/shop/like`;

// 병의원 좋아요 삭제
export const HOSPITAL_DISLIKE = `${MAINURL}${mainPrefixParams}/shop/like`;

// 병의원 좋아요 리스트
export const HOSPITAL_LIKE_LIST = `${MAINURL}${mainPrefixParams}/shop/like`;

// 추천 리스트
export const MAIN_RECOMMEND_LIST = `${MAINURL}${mainPrefixParams}/recommendation/products`;

// 신규 리스트
export const MAIN_NEW_LIST = `${MAINURL}${mainPrefixParams}/new/products`;

// 최근 검색어
export const RECENTLY_KEYWORD = `${MAINURL}${mainPrefixParams}/recently-keyword`;

// 메인 추천 리스트
export const SEARCH_RECOMMEND_LIST = `${MAINURL}${mainPrefixParams}/recommendkeywords`;

// 최근 검색어 리스트
export const getUserSearchKeyword = (keyword: string) =>
	`${MAINURL}${mainPrefixParams}/recently-keyword/${keyword}`;

// 최근 검색어 저장
export const SET_USER_SEARCH_KEYWORD = `${MAINURL}${mainPrefixParams}/recently-keyword`;

// 최근 검색어 삭제
export const deleteUserSearchKeyword = () =>
	`${MAINURL}${mainPrefixParams}/recently-keyword`;

// 후기 작성 팝업
export const USER_REVIEW_POPUP = `${MAINURL}${mainPrefixParams}/display-popup`;

// 메인 배너
export const MAIN_BANNER = `${MAINURL}${mainPrefixParams}/banners`;

// 메인 여신티비
export const YEOSHIN_TV = `${MAINURL}${mainPrefixParams}/yeoshintv`;

// 메인 상품 카테고리 테그
export const PRODUCT_TAG = `${MAINURL}${mainPrefixParams}/display-tags`;

// 단골병의원 이벤트
export const USER_SELECTED_HOSPITAL_LIST = `${MAINURL}${mainPrefixParams}/event/vip`;

// 이벤트 삭제
export const WISH_DELETE = `${MAINURL}${mainPrefixParams}/wish/delete`;

// 개인화 병의원 좋아요 , 안좋아요, 리스트
export const ACCOUNT_HOSPITAL_LIKE = `${MAINURL}${mainPrefixParams}/shop/like`;

// 메인팝업
export const MY_POPUP = `${MAINURL}${mainPrefixParams}/display-popup`;

// popup 다음에
export const POPUP_LATER_CLOSE = `${MAINURL}${mainPrefixParams}/display-popup/expire`;

// popup 오늘하루 닫기
export const POPUP_TODAY_CLOSE = `${MAINURL}${mainPrefixParams}/display-popup/expire/uid/9`;
