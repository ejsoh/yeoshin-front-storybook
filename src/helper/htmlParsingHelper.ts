import ReactDOMServer from "react-dom/server";

export const htmlParsingHelper = (children: JSX.Element) => {
	return ReactDOMServer.renderToStaticMarkup(children);
};

export const imgParser = (className: string, src: string) => {
	const parent = document.createElement("img");
	parent.className = className;
	parent.src = src;
	return parent;
};

export const divParser = (className: string, inner?: string) => {
	const parent = document.createElement("div");
	parent.className = className;
	parent.innerHTML = inner ? inner : "";

	return parent;
};
