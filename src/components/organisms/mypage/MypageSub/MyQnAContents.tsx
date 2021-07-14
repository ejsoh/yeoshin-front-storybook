import { NoResults, ToggleEvent } from "components/molecules";

import React from "react";
import { RootStoreModel } from "models/RootStore";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";

const List = styled.div`
	ul {
		li {
			padding: 10px;
			border-bottom: 1px solid #eee;
			.comment {
				.row {
					display: flex;
					justify-content: space-between;
					border-bottom: 1px dashed #eee;
					button,
					a {
						display: inline-block;
						font-size: 12px;
						padding: 0 10px;
						line-height: 20px;
					}
				}
				p {
					margin-top: 3px;
					padding-top: 5px;
					padding-bottom: 9px;
					font-size: 11px;
					color: #666;
					font-weight: 200;
				}
				.date {
					margin-top: 2px;
					color: #999;
					font-size: 12px;
				}
				.btn-inquiry {
					background: #464646;
					color: #fff;
					border-radius: 10vw;
				}
				.btn-view {
					margin-left: 10px;
					background: #f1f1f1;
					border: 1px solid #cecece;
					color: #464646;
				}
			}
			.reply {
				margin-top: 5px;
				padding: 10px 5px 5px 5px;
				background: #f5f5f5;
				&__content {
					position: relative;
					border-radius: 0 8px 8px 8px;
					border: 1px solid #ccc;
					background: white;
					padding: 14px 10px 10px 40px;
					box-sizing: border-box;
					margin: 12px;
					background: #fff url("https://yeoshin.co.kr/m/images/mypost_re.png")
						12px 15px no-repeat;
					background-size: 16px;
					&:before {
						position: absolute;
						left: -1px;
						top: -12px;
						width: 15px;
						height: 30px;
						background: transparent
							url("https://yeoshin.co.kr/m/images/mypost_edge.png") left top
							no-repeat;
						background-size: 13px 13px;
						content: "";
					}
					.title {
						font-size: 12px;
						background: transparent
							url("https://yeoshin.co.kr/m/images/mypost_id.png") left center
							no-repeat;
						background-size: 13px 13px;
						strong {
							padding-left: 18px;
							background: transparent
								url("https://yeoshin.co.kr/m/images/mypost_id.png") left center
								no-repeat;
							background-size: 13px;
							font-weight: 200;
						}
						span {
							margin-left: 20px;
							color: #999;
							padding-left: 18px;
							background: transparent
								url("https://yeoshin.co.kr/m/images/mypost_date.png") left
								center no-repeat;
							background-size: 13px;
						}
					}
					.content {
						margin-top: 10px;
						color: #888;
						line-height: 1.3;
						font-size: 11.4px;
						font-weight: 200;
					}
				}
			}
		}
	}
`;
const mapper = ({ fetchStore, interactionStore }: RootStoreModel) => ({
	fetchStore,
	interactionStore,
});
export const MyQnAContents = () => {
	const { fetchStore } = useInjection(mapper);
	return (
		<List>
			<ToggleEvent condition={fetchStore.fetchStore().data}>
				<ul>
					<li>
						<div className="comment">
							<div className="row">
								<div className="date">2021.02.22</div>
								<div className="btnarea">
									<button className="btn-inquiry">시술문의</button>
									<a href="" className="btn-view">
										시술보기
									</a>
								</div>
							</div>
							<p>정말 영구인가요?</p>
						</div>
						<div className="reply">
							<div className="reply__content">
								<div className="title">
									<strong>라르떼의원(수유점)</strong> <span>2021-02-22</span>
								</div>
								<div className="content">
									{`안녕하세요? 라르떼 입니다. 미인 것 같습니다. 모든 레이저
								제모에서 영구 제모율이라 함은 전체 대상 모근 중 제모 시행후
								오랜시간 추적검사에도 영원히 털이 나시 (모발 굵기가 굵을수록 더
								효과가 있고 생장기 모발의 퍼센트가다만) 나는 모근은 영구제모가
								안된거로 봐야되고 그런게 30% 정도라는거죠. 참고로 시술 횟수를
								높일수록 영구제모율이 높아집니다. 내원해서 진료/상담
								진행해보세요. http://larte.kr/ 라르떼 수유점 02) 907-3700
								감사합니다.`}
								</div>
							</div>
						</div>
					</li>
				</ul>
				<NoResults text="등록된 글이 없습니다." />
			</ToggleEvent>
		</List>
	);
};
