import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lazyDelayed = (path: any) => {
	return React.lazy(() => path);
};
