import { InputWrap, ToggleEvent } from "components/molecules";
import { useFormHandler, useInjection } from "hooks";
import { Icon } from "components/atoms";
import React from "react";
import { SearchInputContainer } from "../search/searchComponents/SearchInput";
import { SkinMapEvent } from "./skinMapEvents/SkinMapEvent";
import { SkinMapFilter } from "./SkinMapFilter";
import { SkinMapHospitalList } from "./skinMapHospitals/SkinMapHospitalList";
import { SkinMapUsage } from "./skinMapUsage/SkinMapUsage";
import { ToastPopup } from "components/templates";
import { getCookie } from "services/utils/cookies";
import { kakaoEvent } from "services/utils/kakaoMap/event";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";

const Container = styled.div`
	position: relative;
	overflow: hidden;
	height: 100%;
`;

const SearchFilterContainer = styled.div`
	position: absolute;
	width: 100%;
	z-index: 9999;
	box-sizing: border-box;
`;

const KakaoMap = styled.div`
	width: 100%;
	height: 100%;
`;

const BeforeIcon = styled.div`
	padding: 13px;
	height: 20px;
`;
const AfterIcon = styled.div`
	display: flex;
	align-items: center;
`;

type SkinMapProps = {
	goSearch: () => void;
	reSearch: () => void;
	filter: (item: string) => void;
};

export const SkinMap = observer(
	({ goSearch, reSearch, filter }: SkinMapProps) => {
		const { skinMapStore, interactionStore, fetchStore } = useInjection(mapper);

		const formValue = useFormHandler({
			setValue: {
				search: skinMapStore.setSearchParams,
			},
			getValue: {
				search: skinMapStore,
			},
			event: e => {
				kakaoEvent().isClose("infoContainer");
				goSearch();
			},
		});

		const { getFormProps } = formValue;
		return (
			<Container>
				<SkinMapHospitalList />
				{getCookie("closeUsage") === undefined && <SkinMapUsage />}
				<SearchFilterContainer>
					<SearchInputContainer>
						<InputWrap
							beforeIcon={
								<BeforeIcon>
									<Icon
										key={"home"}
										icon="home"
										size={18}
										as="a"
										href="https://yeoshin.co.kr"
									></Icon>
								</BeforeIcon>
							}
							afterIcon={
								<AfterIcon>
									<Icon
										icon={"close"}
										event={() => skinMapStore.setSearchParams("")}
										size={15}
									/>
								</AfterIcon>
							}
							placeholder={"어떤 시술을 찾으세요?"}
							focus={() => {
								interactionStore.setIsEventShow(true);
								skinMapStore.setToggleShow(false);
								skinMapStore.setSkinMapNoResult({
									result: false,
									text: "",
								});
								fetchStore.setState("complete");
							}}
							blur={() => {
								interactionStore.setIsEventShow(false);
							}}
							{...getFormProps("search", "search")}
						/>
					</SearchInputContainer>

					<SkinMapFilter reSearch={reSearch} filterEvent={filter} />
					<ToastPopup
						text={skinMapStore.getNoResult().text}
						isShow={
							skinMapStore.getNoResult().toast &&
							skinMapStore.getHospital().length > 0
						}
					/>
				</SearchFilterContainer>

				<KakaoMap
					id="map"
					style={{
						width: "100%",
						height: "108%",
					}}
				></KakaoMap>
				<ToggleEvent condition={interactionStore.getIsEventShow()}>
					<></>
					<SkinMapEvent />
				</ToggleEvent>
			</Container>
		);
	}
);
