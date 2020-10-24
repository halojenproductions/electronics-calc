const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const { DEPLOYMENT_ENV } = process.env;
const isProd = DEPLOYMENT_ENV === "production";

const chunkName = isProd
	? "[name].[hash]"
	: "[name]";

const prodPlugins = [
	new MiniCssExtractPlugin({
		filename: `[name].[hash].css`,
	}),
	new OptimizeCSSAssetsPlugin({})
];

const config = {
	mode: DEPLOYMENT_ENV,
	entry: path.join(SRC_DIR, "/app/index.js"),
	output: {
		path: DIST_DIR,
		chunkFilename: `${chunkName}.chunk.js`,
		filename: `${chunkName}.js`,
		publicPath: "/",
	},

	devServer: {
		contentBase: [path.join(SRC_DIR, "node_modules/")],
		hot: true,
		port: 8080,
	},

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				include: SRC_DIR,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader:
							isProd
								? MiniCssExtractPlugin.loader // Builds the imported CSS into a CSS file
								: "style-loader", // Builds the CSS inline rather than in a .css file
					},
					{
						loader: "css-loader", // Allows CSS files to be imported in JS/TS,
						options: {
							sourceMap: !isProd,
						},
					},
					{
						loader: "sass-loader", // Process Sass/SCSS
						options: {
							sassOptions: {
								includePaths: [
									path.resolve(__dirname, "node_modules"),
								],
							},
							sourceMap: !isProd,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jp(e?)g|gif|woff|woff2|eot|ttf|otf)$/,
				use: [{
					loader: "file-loader",
					options: {
						esModule: false,
					}
				}],
			}
		]
	},

	optimization: isProd ? {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					options: {
						drop_console: true,
					},
					output: {
						comments: false,
					},
				},
			}),
		],
	} : undefined,

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "src/index.html"),
		}),
		...isProd ? prodPlugins : []
	],

	resolve: {
		extensions: [".js", ".jsx", ".json"],
	},
};

module.exports = config;
