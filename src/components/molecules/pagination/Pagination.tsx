import React from "react";
import styled from "@emotion/styled/macro";
import { useInjection } from "hooks";
import { RootStoreModel } from "models/RootStore";
import { Row } from "components/atoms/Grid";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react-lite";
import { Space } from "components/atoms/Spacing";
import { ToggleEvent } from "..";

const Arrow = styled.div`
	padding: 10px 8px;
	border: 1px solid #d1d1d1;
	font-size: 10px;
	color: #717275;
	cursor: pointer;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 10px 14px;
	border: 1px solid #d1d1d1;
	margin: 1px;
	font-size: 13px;
	cursor: pointer;
	background-color: #fff;
`;
const currentPage = css`
	background-color: #4d5058 !important;
	color: #fff;
`;
const endPage = css`
	color: #d1d1d1;
`;
const PaginationContents = styled.div`
	display: flex;
	justify-content: center;
	padding: 10px 0;
	background-color: #f7f7f7;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
`;
const PaginationContainer = styled.div`
	display: flex;
	position: relative;
	bottom: 0;
`;

const mapper = ({
	verificationStore,
	fetchStore,
	interactionStore,
}: RootStoreModel) => ({
	verificationStore,
	interactionStore,
	fetchStore,
});

type Page = { index: number; data: number[][] };

export const Pagination = observer(
	({ total, event }: { total: number; event: (index: number) => void }) => {
		const { interactionStore } = useInjection(mapper);
		const totalPage = () => {
			const page = total / 10;
			const result = Array.from(Array(Math.ceil(page ? page : 1)).keys());

			return Array.from(new Array(Math.ceil(result.length / 5)).keys()).map(_ =>
				result.splice(0, 5)
			);
		};
		const leftClick = () => {
			interactionStore.getCurrentPageIndex() > 1 &&
				event(interactionStore.getCurrentPageIndex() - 1);
		};

		const rightClick = () => {
			interactionStore.getCurrentPageIndex() !== Math.ceil(total / 10) &&
				event(interactionStore.getCurrentPageIndex() + 1);
		};
		return (
			<ToggleEvent condition={total / 10 > 1}>
				<PaginationContainer>
					<Space column={60} />
					<PaginationContents>
						<Row>
							<Arrow
								onClick={leftClick}
								css={interactionStore.getCurrentPageIndex() <= 1 && endPage}
							>
								&#9664;
							</Arrow>
							<Row>
								{totalPage()[
									Math.ceil(interactionStore.getCurrentPageIndex() / 5) - 1
								].map(item => (
									<Page
										onClick={() => event(item + 1)}
										key={item + "page"}
										css={
											item + 1 === interactionStore.getCurrentPageIndex() &&
											currentPage
										}
									>
										{item + 1}
									</Page>
								))}
							</Row>
							<Arrow
								onClick={rightClick}
								css={
									interactionStore.getCurrentPageIndex() ===
										Math.ceil(total / 10) && endPage
								}
							>
								&#9654;
							</Arrow>
						</Row>
					</PaginationContents>
				</PaginationContainer>
				<></>
			</ToggleEvent>
		);
	}
);
