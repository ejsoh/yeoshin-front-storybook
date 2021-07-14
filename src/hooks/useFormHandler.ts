/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { autorun, runInAction } from "mobx";

type PropsType = {
	setValue: { [key: string]: (item: string) => void }; // mst 스토어
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getValue?: { [key: string]: any }; //TODO
	event?: (e: React.KeyboardEvent, value?: { [key: string]: string }) => void;
};

export const useFormHandler = ({ setValue, getValue, event }: PropsType) => {
	const [value, setVal] = useState({});

	const formHandlerItems = React.useRef<any>(null);
	let formHandler = formHandlerItems.current;
	formHandler = {
		setValues: setValue || {},
		getValue: getValue || {},
		event: event || undefined,
	};

	React.useEffect(() => formSetting);

	const formSetting = () => {
		autorun(() => {
			formHandler = {
				setValues: setValue || {},
				getValue: getValue || {},
				event: event || undefined,
			};
		});
	};

	const onKeyEvent = (fieldName: string) => (e: React.KeyboardEvent) => {
		const selectList = [] as string[];
		Object.entries(setValue).forEach(([key, value]) => {
			return selectList.push(key);
		});
		const defaultEvent = () => {
			const currentIndex = selectList.findIndex(item => item === fieldName);
			const enterBehavior = document.querySelector(
				`input[name=${selectList[currentIndex + 1]}]`
			);
			if (
				e.key === "Enter" &&
				enterBehavior !== null &&
				selectList.length > currentIndex + 1
			) {
				e.preventDefault();
				(enterBehavior as HTMLElement).focus();
			}
		};
		const customEvent = (e: React.KeyboardEvent, getValue?: void) => {
			if (e.key === "Enter" && formHandler.event && e.type === "keypress") {
				formHandler.event(e, value);
			}
		};
		return formHandler.event ? customEvent(e) : defaultEvent();
	};

	const onChangeHandler = (fieldName: string) => (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		runInAction(() => {
			formHandler.setValues[fieldName](event.target.value);
			formHandler.getValue &&
				(formHandler.getValue[fieldName] = event.target.value);

			const objectValue = {} as { [key: string]: string };
			objectValue[fieldName] = event.target.value;

			setVal({ ...value, ...objectValue });
		});
	};

	const getFormProps = (
		fieldName: string,
		value?: string,
		clear?: boolean
	) => ({
		onChange: onChangeHandler(fieldName),
		onKeyPress: onKeyEvent(fieldName),
		onKeyDown: onKeyEvent(fieldName),
		name: fieldName,
		value: clear
			? ""
			: value
			? formHandler.getValue[fieldName][value]
			: formHandler.getValue[fieldName],
	});

	return { onChangeHandler, getFormProps, ...formHandler };
};
