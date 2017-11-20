const gulp = require("gulp");
const mustache = require("gulp-mustache");

const json = {
  noArgs: './src/data/noArgs.json',
  useArgs: './src/data/useArgs.json'
};

const template = {
  noArgs: './src/template/noArgs.mustache',
  useArgs: './src/template/useArgs.mustache'
};

gulp.task("mustache", function(){
  // gulp.src(template.noArgs)
  //   .pipe(mustache(json.noArgs, {
  //     extension: '.styl'
  //   }))
  //   .pipe(gulp.dest("./src"));

  gulp.src(template.useArgs)
    .pipe(mustache(json.useArgs, {
      extension: '.styl'
    }))
    .pipe(gulp.dest("./src"));
  }
);
