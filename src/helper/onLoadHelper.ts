export const onloadEvent = (func: void) => {
	window.addEventListener("load", () => {
		return func;
	});
};
