type Alternative<T> = {
	is: boolean;
	truthy: T;
	falsy: T;
};

export const alternative = <T>({ is, truthy, falsy }: Alternative<T>) =>
	is ? truthy : falsy;
