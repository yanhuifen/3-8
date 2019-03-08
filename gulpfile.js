var gulp = require('gulp');
var server = require('gulp-webserver');
gulp.task('startserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8088,
            proxies: [{
                source: "/getdata",
                target: "http://localhost:3000/getdata"
            }, {
                source: "/active",
                target: "http://localhost:3000/activedata"
            }]
        }))
})