import { useFormHandler, useInjection } from "hooks";
import { InputWrap } from "..";
import { Label } from "components/atoms/Label/Label";
import React from "react";
import { Row } from "components/atoms/Grid";
import { SelectBox } from "components/atoms/Input/SelectBox";
import { Text } from "components/atoms/Message";
import { ToggleEvent } from "../isShowEventWrap/isShowEvent";
import { mapper } from "models/RootStore";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled/macro";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";

export const SelectBoxWrap = ({ ...rest }) => {
	return <SelectBox {...rest} />;
};

const SelectWrap = styled(Label)`
	border: 1px solid #cccbcb;
	border-radius: 5px;
	padding: 1px 0;
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		z-index: 9;
		background: url(/images/icons/downArrow.svg) no-repeat center right;
		background-size: 10px;
	}
	${Text} {
		min-width: 80px;
		text-align: center;
		white-space: pre-wrap;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		left: 0;
		border: 0;
		&::after {
			content: "";
			height: 23px;
			position: absolute;
			border-right: 1px solid #cccbcb;
			right: 0;
		}
	}
`;

const SelectBoxContainer = styled(Row)`
	width: 100%;
	min-width: 130px;
	padding-right: 4px;
	margin-right: 8px;
	background-color: #fff;
`;
const dateInputCommon = css`
	padding: 0 !important;
	text-align: center;
	overflow: hidden;
`;
const DateInputContainer = styled(InputWrap)`
	${dateInputCommon};
	min-width: 30px !important;
`;
const DateInputYearContainer = styled(InputWrap)`
	${dateInputCommon};
	min-width: 50px !important;
`;
const DateSpace = styled(Text)`
	padding: 0 4px 0 8px;
	font-size: 15px;
`;

export const DateSelectBox = observer(
	({ label, isPrimary = false }: { label?: string; isPrimary?: boolean }) => {
		const { interactionStore } = useInjection(mapper);
		const getDate = interactionStore.getDate();
		const convertString = (value: number) => {
			return value ? value.toString() : "";
		};
		const formValue = useFormHandler({
			setValue: {
				year: interactionStore.setYear,
				month: interactionStore.setMonth,
				day: interactionStore.setDay,
			},
			getValue: {
				year: convertString(getDate.year),
				month: convertString(getDate.month),
				day: convertString(getDate.day),
			},
		});
		const { getFormProps } = formValue;
		const getYear = () => {
			const year = Array.from(Array(70).keys())
				.map(index => new Date().getFullYear() - index)
				.reverse();

			return year;
		};
		const month = () => {
			const month = Array.from(Array(12).keys());
			return month;
		};
		const day = () => {
			const getDay = interactionStore.getDayByMonth();
			const getDayKeyArr = Array(getDay ? getDay : 30).keys();
			const day = Array.from(getDayKeyArr);
			return day;
		};
		return (
			<ToggleEvent condition={isPrimary}>
				<Row>
					<DateInputYearContainer type="number" {...getFormProps("year")} />
					<DateSpace>년</DateSpace>

					<DateInputContainer type="number" {...getFormProps("month")} />
					<DateSpace>월</DateSpace>

					<DateInputContainer type="number" {...getFormProps("day")} />
					<DateSpace>일</DateSpace>
				</Row>

				<SelectWrap text={label} isForm>
					<SelectBoxContainer>
						<SelectBox minWidth={55} {...getFormProps("year")}>
							{getYear().map(item => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</SelectBox>

						<SelectBox {...getFormProps("month")}>
							{month().map(item => (
								<option key={item} value={item + 1}>
									{item + 1}
								</option>
							))}
						</SelectBox>

						<SelectBox {...getFormProps("day")}>
							{day().map(item => (
								<option key={item} value={item + 1}>
									{item + 1}
								</option>
							))}
						</SelectBox>
					</SelectBoxContainer>
				</SelectWrap>
			</ToggleEvent>
		);
	}
);
