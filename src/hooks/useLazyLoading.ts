import React from "react";

export const useLazyLoading = (src: string) => {
	const [loadingSrc, setLoadingSrc] = React.useState("");
	const getImage = React.useRef(null);
	React.useEffect(() => {
		// TODO
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let observer: any;
		if (getImage) {
			observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setLoadingSrc(src);

						src !== "" && observer.disconnect();
					}
				},
				{ rootMargin: "10px", threshold: [0, 0.5, 1] }
			);
			observer.observe(getImage.current);
		}
		return () => {
			observer && observer.disconnect(getImage);
		};
	}, [src, getImage, loadingSrc]);
	return { loadingSrc, getImage };
};

export const useScrollEvent = (target: string) => {
	const [loading, setLoading] = React.useState("");
	const isEnd = React.useRef(null);
	React.useEffect(() => {
		// TODO
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let observer: any;
		if (isEnd) {
			observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setLoading(target);

						target !== "" && observer.disconnect();
					}
				},
				{ rootMargin: "10px", threshold: [0, 0.5, 1] }
			);
			observer.observe(isEnd.current);
		}
		return () => {
			observer && observer.disconnect(isEnd);
		};
	}, [isEnd, loading]);
	return { loading, isEnd };
};
