export const ellipsis = (text: string, slice: number, mark?: string) => {
	const len = text.length;
	return len > slice ? `${text.slice(0, slice)}${mark ?? ""}` : text;
};
