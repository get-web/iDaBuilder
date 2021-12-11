import gulp from "gulp";
import rimraf from "rimraf";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
import gulpif from "gulp-if";
import plumber from "gulp-plumber";
import changed from "gulp-changed";
import browserSync from "browser-sync";
import cache from "gulp-cache";
import concat from "gulp-concat";
import rename from "gulp-rename";
import flatten from "gulp-flatten";
import replace from "gulp-replace";

// images
import imagemin from "gulp-imagemin";

// favicons
import { stream as favicons } from "favicons";

// html
import inject from "gulp-inject";
import beautify from "gulp-beautify";

// js
import babel from "gulp-babel";
import uglify from "gulp-uglify";

// css
import postcss from "gulp-postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssImport from "postcss-import";
import postcssCustomMedia from "postcss-custom-media";
import postcssSelectorNot from "postcss-selector-not";
import postcssMixins from "postcss-mixins";
import postcssNested from "postcss-nested";
import cssnano from "cssnano";
import sortMediaQueries from "postcss-sort-media-queries";

import paths from "./cfg/paths.js";
import jslist from "./src/js/main.js";

// const prod = false;
const prod = !!argv.prod;
const dist = prod ? "prod" : "dev";

console.log("run:", dist);

export const clean = async () => {
	rimraf.sync(`./${paths.clean.dist[dist]}`);
};

export const html = async () => {
	return gulp
		.src(paths.template.src.pages)
		.pipe(plumber())
		.pipe(
			inject(gulp.src(paths.template.src.parts), {
				starttag: "<!-- inject:{{path}} -->",
				relative: true,
				removeTags: true,
				transform: function (filePath, file) {
					// return file contents as string
					return file.contents.toString("utf8");
				},
			})
		)
		.pipe(
			inject(gulp.src(paths.template.src.parts), {
				starttag: "<!-- inject:{{path}} -->",
				relative: true,
				removeTags: true,
				transform: function (filePath, file) {
					// return file contents as string
					return file.contents.toString("utf8");
				},
			})
		)
		.pipe(
			beautify.html({
				indent_size: 4,
			})
		)
		.pipe(
			changed(paths.template.dist[dist], {
				hasChanged: changed.compareContents,
			})
		)
		.pipe(gulp.dest(paths.template.dist[dist]))
		.pipe(browserSync.reload({ stream: true }));
};

export const css = async () => {
	return gulp
		.src(paths.css.src.main)
		.pipe(plumber())
		.pipe(postcss(processorsOptions()))
		.pipe(postcss([sortMediaQueries]))
		.pipe(
			gulpif(
				!prod,
				beautify.css({
					indent_size: 4,
					preserve_newlines: false,
					max_preserve_newlines: 2,
				})
			)
		)
		.pipe(gulpif(prod, postcss(processorsOptionsProd())))
		.pipe(
			changed(paths.css.dist[dist], {
				hasChanged: changed.compareContents,
			})
		)
		.pipe(gulp.dest(paths.css.dist[dist]))
		.pipe(browserSync.reload({ stream: true }));
};

export const js = async () => {
	return (
		gulp
			.src(jslist)
			.pipe(plumber())
			.pipe(
				concat(paths.js.outputFileName, {
					newLine: `
            
            `,
				})
			)
			.pipe(
				gulpif(
					prod,
					babel({
						presets: ["@babel/env"],
					})
				)
			)
			.pipe(
				beautify.js({
					indent_size: 4,
				})
			)
			.pipe(gulpif(prod, uglify()))
			// .pipe(changed(paths.js.dist[dist]))
			.pipe(
				changed(paths.js.dist[dist], {
					hasChanged: changed.compareContents,
				})
			)
			.pipe(gulp.dest(paths.js.dist[dist]))
			.pipe(browserSync.reload({ stream: true }))
	);
};

export const libs = () => {
	return gulp
		.src(paths.libs.src)
		.pipe(changed(paths.libs.dist[dist]))
		.pipe(gulp.dest(paths.libs.dist[dist]))
		.pipe(browserSync.reload({ stream: true }));
};

export const fonts = () => {
	return gulp
		.src(paths.fonts.src)
		.pipe(changed(paths.fonts.dist[dist]))
		.pipe(gulp.dest(paths.fonts.dist[dist]))
		.pipe(browserSync.reload({ stream: true }));
};

export const favicon = () => {
	return (
		gulp
			.src(paths.favicon.src)
			.pipe(
				changed(paths.favicon.dist[dist], {
					hasChanged: changed.compareLastModifiedTime,
				})
			)
			.pipe(gulpif(prod, imagemin(imageminOptions(imagemin))))
			// .pipe(gulpif(prod, changed(paths.favicon.dist[dist], {
			//     hasChanged: changed.compareContents
			// })))
			.pipe(
				favicons({
					icons: {
						appleIcon: true,
						favicons: true,
						online: false,
						appleStartup: false,
						android: false,
						firefox: false,
						yandex: false,
						windows: false,
						coast: false,
					},
				})
			)
			.pipe(gulp.dest(paths.favicon.dist[dist]))
			.pipe(browserSync.reload({ stream: true }))
	);
};

export const images = () => {
	return gulp
		.src(paths.images.src)
		.pipe(
			changed(paths.images.dist[dist], {
				hasChanged: changed.compareLastModifiedTime,
			})
		)
		.pipe(gulpif(prod, cache(imagemin(imageminOptions(imagemin)))))
		.pipe(
			gulpif(
				prod,
				changed(paths.images.dist[dist], {
					hasChanged: changed.compareContents,
				})
			)
		)
		.pipe(gulp.dest(paths.images.dist[dist]))
		.pipe(browserSync.reload({ stream: true }));
};

export const imagesParts = () => {
	return gulp
		.src(paths.imagesParts.src)
		.pipe(
			flatten({
				includeParents: 1,
			})
		)
		.pipe(
			changed(paths.imagesParts.dist[dist], {
				hasChanged: changed.compareLastModifiedTime,
			})
		)
		.pipe(gulpif(prod, cache(imagemin(imageminOptions(imagemin)))))
		.pipe(
			gulpif(
				prod,
				changed(paths.imagesParts.dist[dist], {
					hasChanged: changed.compareContents,
				})
			)
		)
		.pipe(gulp.dest(paths.imagesParts.dist[dist]))
		.pipe(browserSync.reload({ stream: true }));
};

export const mediaParts = () => {
	return (
		gulp
			.src(paths.mediaParts.src)
			.pipe(plumber())
			.pipe(
				flatten({
					includeParents: 1,
				})
			)
			// .pipe(changed(paths.mediaParts.dist[dist], {
			//     hasChanged: changed.compareLastModifiedTime
			// }))
			// .pipe(gulpif(prod, changed(paths.mediaParts.dist[dist], {
			//     hasChanged: changed.compareContents
			// })))
			.pipe(gulp.dest(paths.mediaParts.dist[dist]))
			.pipe(browserSync.reload({ stream: true }))
	);
};

export const replaceHTML = () => {
	return (
		gulp
			.src(paths.template.dist[dist])
			// .pipe(replace(
			//     /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
			// ))
			// .pipe(replace(
			//     /(<script src=")scripts\/(index.js">)/, '$1$2'
			// ))
			.pipe(paths.template.dist[dist])
	);
};

export const watch = () => {
	// gulp.watch(paths.template.watch, gulp.series(html, replaceHTML));
	gulp.watch(paths.template.watch, gulp.series(html));
	gulp.watch(paths.css.watch, gulp.series(css));
	gulp.watch(paths.js.watch, gulp.series(js));
	gulp.watch(paths.libs.watch, gulp.series(libs));
	gulp.watch(paths.fonts.watch, gulp.series(fonts));
	gulp.watch(paths.images.watch, gulp.series(images));
	gulp.watch(paths.imagesParts.watch, gulp.series(imagesParts));
	gulp.watch(paths.mediaParts.watch, gulp.series(mediaParts));
	gulp.watch(paths.favicon.watch, gulp.series(favicon));

	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: `./${dist}/`,
		},
	});
};

// Default

export default gulp.series(
	clean,
	gulp.parallel(
		html,
		css,
		js,
		libs,
		fonts,
		images,
		imagesParts,
		mediaParts,
		favicon
	),
	gulp.parallel(watch)
);

function imageminOptions(imagemin) {
	return [
		imagemin.gifsicle({
			interlaced: true,
		}),
		imagemin.mozjpeg({
			quality: 85,
			progressive: true,
		}),
		imagemin.optipng({
			optimizationLevel: 2,
		}),
		imagemin.svgo({
			plugins: [
				{
					removeViewBox: true,
				},
				{
					cleanupIDs: false,
				},
			],
		}),
	];
}

function processorsOptions() {
	return [
		postcssImport,
		postcssMixins({
			mixinsFiles: paths.css.src.importFrom,
		}),
		postcssCustomMedia({
			importFrom: paths.css.src.importFrom,
		}),
		postcssNested,
		postcssSelectorNot,
		postcssPresetEnv({
			autoprefixer: false,
			stage: 2,
			browsers: "last 1 versions",
			preserve: false,
			importFrom: paths.css.src.importFrom,
		}),
	];
}

function processorsOptionsProd() {
	return [
		postcssPresetEnv({
			stage: 2,
			browsers: "last 2 versions",
			preserve: false,
			importFrom: paths.css.src.importFrom,
		}),
		cssnano,
	];
}
