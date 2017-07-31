/* eslint-disable no-console */

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');


gulp.task('server:start', () => {
    return require('./server');
});

gulp.task('pre-test', () => {
    return gulp.src([
        './app/app.js',
        './server.js',
        './app/auth/**/*.js',
        './app/config/**/*.js',
        './app/controllers/**/*.js',
        './app/data/*.js',
        './app/db/**/*.js',
        './app/model/**/*.js',
        '.app/routers/**/*.js',
        '.app/utils/**/*.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 10000,
        }))
        .pipe(istanbul.writeReports({ dir: './coverage/unit' }));
});

const config = {
    connectionString: 'mongodb://localhost/OffersDB-test',
    port: 3001,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => {
            const { getApp } = require('./app/app');
            getApp(config.connectionString)
                .then((app) => {
                    app.server.listen(
                        config.port,
                        () => console.log(`Magic happends at :${config.port}`));
            });
        });
});

const { MongoClient } = require('mongodb');

gulp.task('test-server:stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src('./test/browser/**/*.js')
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 100000,
        }))
        .pipe(istanbul.writeReports({ dir: './coverage/browser' }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});