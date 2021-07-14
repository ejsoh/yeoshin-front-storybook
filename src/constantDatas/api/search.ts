import dotenv from "dotenv";
dotenv.config();
const SEARCURL = process.env.REACT_APP_SKINMAP_URL;
const webPrefixParams = "latest/web";

// 피부시술맵
export const SKIN_MAP = `${SEARCURL}${webPrefixParams}/skinmap/search/radius`;

// 피부시술맵 페이징
export const SKIN_MAP_PAGING = `${SEARCURL}${webPrefixParams}/skinmap/pageing/products`;

// 피부시술맵 병원 검색
export const SKIN_MAP_HOSPITAL = `${SEARCURL}${webPrefixParams}/skinmap/hospital/products`;

// 피부시술맵 통합 검색
export const SKIN_MAP_TOTAL = `${SEARCURL}${webPrefixParams}/skinmap/search/total`;
