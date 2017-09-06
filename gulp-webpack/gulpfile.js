var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify({entries: './app.jsx', entensions: ['.jsx'], debug: true})
          .transform('babelify', {presets: ['es2015', 'react']})
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['build'], function() {
  gulp.watch('*.jsx', ['build'])
})


gulp.task('default', ['watch']);

/**
 * Line1-4 我们需要安装nodejs modules 并且将他们赋值给变量
 * Line 6 我们定义gulp 任务名为build以便我们可以使用gulp build来运行
 * Line 7 我们开始描述我们的构建任务将做什么，我们告知gulp来使用app.jsx，我们打开调试模式，这有利于我们开发调试
 * line 8- 11 我们使用Babelify来转换我们的代码，这允许我们将es6转换成es5,下一步我们将结果输出到dist/bundle.js文件。这几行代码现在使用了Babel 6
 * 中的presets的新特性
 * line 14-16 我们定义了一个watch的任务以便我们通过gulp watch来运行，我们什么时候jsx文件内容发生变化，这个任务都会重新的进行编译。
 * line -19 我们顶一个默认的gulp任务以便我们输入gulp时自动运行，此任务只执行监视任务。
 * jsx是reactJS团队研发的Javascript扩展语法。这个格式对于react的开发更加的方便快捷。
 */
































