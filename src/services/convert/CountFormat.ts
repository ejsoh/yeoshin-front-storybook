export const CountFormat = (count: string) => {
	const number = parseInt(count);
	switch (true) {
		case number < 100:
			return number;
		case number >= 100 && number < 1000:
			return `${Math.floor(number / 100)}백+`;
		case number >= 1000 && number < 10000:
			return `${Math.floor(number / 1000)}천+`;
		case number >= 10000:
			return `${Math.floor(number / 10000)}만+`;
	}
};
