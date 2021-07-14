export const JoinMemberResponseMapper = (args: { [key: string]: string }) => {
	const result = args.accessToken;

	return { accessToken: result };
};
