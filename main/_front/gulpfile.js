import gulp from "gulp"
import browserSync from "browser-sync";
import gulpReplace from "gulp-replace";

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

const srcPath = "src/";
import sassGlob from 'gulp-sass-glob';
import newer from "gulp-newer";
import {deleteAsync} from "del";

const isProduction = true;

const publicPath = isProduction? "dist/" : "_public/";

const path = {
	build: {
		html: publicPath,
		css: publicPath + "css/",
		js: publicPath + "js/",
		img: publicPath + "img/",
		font: publicPath + "font/"
	},
	src: {
		html: srcPath + "html/*.html",
		css: srcPath + "scss/style.scss",
		js: srcPath + "js/**/*.js",
		img: srcPath + "img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
		font: srcPath + "font/**/*.{eot,woff,woff2,ttf,svg}"
	},
	watch: {
		html: srcPath + "html/**/*.html",
		css: srcPath + "scss/**/*.scss",
		js: srcPath + "js/**/*.js",
		img: srcPath + "img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
		font: srcPath + "font/**/*.{eot,woff,woff2,ttf,svg}"
	}
}

export const html = () => {
	return gulp.src(path.src.html)
		.pipe(gulpReplace(/src="\.\.\//g, "src=\"./"))
		.pipe(gulpReplace(/href=["']\.\.\/scss\/style\.scss/g, "href=\"css/style.css"))
		.pipe(gulpReplace(/src=["']\.\.\/([^"']+\.js)["']/g, 'src="$1"'))
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream())
}

export const scss = () => {
	return gulp.src(path.src.css, {sourcemaps: true})
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(path.build.css))
}


export const js = () => {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js));
}

export const clear = () => {
	return deleteAsync(isProduction ? "dist" : "./_public");
}

export const img = () => {
	return gulp.src(path.src.img, {encoding: false})
		.pipe(gulp.dest(path.build.img))
}

export const font = () => {
	return gulp.src(path.src.font)
		.pipe(newer(path.build.font))
		.pipe(gulp.dest(path.build.font))
}

export const server = () => {
	browserSync.init({
		server: {
			baseDir: "./_public"
		}
	})
}

export const watch = () => {
	gulp.watch(path.watch.html, html).on("all", browserSync.reload);
	gulp.watch(path.watch.css, scss).on("all", browserSync.reload);
	gulp.watch(path.watch.js, js).on("all", browserSync.reload);
	gulp.watch(path.watch.img, img).on("all", browserSync.reload);
	gulp.watch(path.watch.font, font).on("all", browserSync.reload);
}

const dev = gulp.series(
	clear,
	gulp.parallel(html, scss, js, img, font),
	gulp.parallel(watch, server)
)

const production = gulp.series(
	clear,
	gulp.parallel(html, scss, js, img, font)
)

export default isProduction? production : dev;