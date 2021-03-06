const path = require("path");

const resolvePath = _path => path.join(process.cwd(), _path);

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-controls",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-knobs",
		"@storybook/addon-docs",
	],
	webpackFinal: async config => ({
		...config,
		...config.resolve.modules.push(path.resolve(__dirname, "../src")),
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				"@emotion/core": resolvePath("node_modules/@emotion/react"),
				"@emotion/styled": resolvePath("node_modules/@emotion/styled"),
				"emotion-theming": resolvePath("node_modules/@emotion/react"),
			},
		},
	}),
};
