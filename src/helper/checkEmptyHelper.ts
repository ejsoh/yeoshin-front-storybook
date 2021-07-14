export const checkEmptyHelper = (data: string[]) => {
	return data.every(function (element) {
		return !!element;
	});
};

export const checkAllPass = (data: boolean[]) => {
	return data.every(item => item);
};

export const isEmpty = (text: string | JSX.Element | boolean | undefined) => {
	return text === "";
};

export const isNotEmpty = (
	text: string | JSX.Element | boolean | undefined
) => {
	return text !== "";
};

export const isTruthy = (values: boolean[]) => checkAllPass(values);
