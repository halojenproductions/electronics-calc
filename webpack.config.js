var webpack = require("webpack");
var path = require("path");
//const bootstrap = require('bootstrap');
//var bootstrap = require('node_modules/bootstrap/js/dist/util.js');
//var jquery = require('jquery');
//var bootstrap = require('bootstrap');


var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
	entry: SRC_DIR + "/app/index.js",
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: SRC_DIR,
				use: {
					loader: "babel-loader",
					query: {
						presets: ["react", "es2015", "stage-2"]
					}
				}
			},
			{
				test: /\.scss$/,
				include: [SRC_DIR, 'bootstrap/'],
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader', // Run post css actions
						options: {
							plugins: function () { // post css plugins, can be exported to postcss.config.js
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					},
					{
						loader: "sass-loader" // compiles Sass to CSS
					}
				]
			},
		]
	}
};

/* From the tutorial. Seems to only work in an old version. 
 * https://www.youtube.com/watch?v=uextYhQGP6k
 * Also, the rest of the internet doesn't seem to know about this way. 
 var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    modules: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    }
};*/

module.exports = config;
