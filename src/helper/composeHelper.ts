// eslint-disable-next-line @typescript-eslint/ban-types
export const composeHelper = <T>(...functions: readonly Function[]) => (
	x: T
): T => {
	const deepCopiedFunctions = [...functions];
	return deepCopiedFunctions.reduceRight((value, func) => func(value), x);
};
