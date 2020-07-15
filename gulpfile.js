
'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const revertPath = require('gulp-revert-path');
const del = require('del');

const CORE_SRC = [
	'./build/three.module.js',
];

gulp.task('core', function() {
	return gulp.src(CORE_SRC, {
		base: './build/'
	})
		.pipe(babel())
		.on('error', function(error) { console.log(error.message); })
		.pipe(revertPath())
		.pipe(gulp.dest('./build/'));
});


const JS_SRC = [
	'./examples/jsm/**/*.js',
];

const D_TS_SRC = [
	'./examples/jsm/**/*.d.ts',
];

const BASE = './examples/jsm/';
const DEST = './examples/jsm/';

function clean() {
	return del(DEST);
}

gulp.task('clean', clean);

gulp.task('js', function() {
	return gulp.src(JS_SRC, {
		base: BASE
	})
		.pipe(babel())
		.on('error', function(error) { console.log(error.message); })
		.pipe(revertPath())
		.pipe(gulp.dest(DEST));
});

// gulp tasks for non-js and non-jsx
gulp.task('d-ts', function() {
	return gulp.src(D_TS_SRC, {
		base: BASE
	})
		.pipe(gulp.dest(DEST));
});

gulp.task('default', gulp.series(gulp.parallel('js', 'd-ts')));
