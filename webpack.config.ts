import path from "path";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import glob from "glob";

module.exports = {
	entry: {
		"bundle.js": glob
			.sync("build/static/?(js|css)/main.*.?(js|css)")
			.map(f => path.resolve(__dirname, f)),
	},
	output: {
		filename: "build/static/js/bundle.min.js",
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg|css)$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "file-loader",
						options: {
							name: "assets/icon/[name]-[hash].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [new UglifyJsPlugin()],
	resolve: {
		modules: [path.join(__dirname, "src"), "node_modules"],
	},
};
