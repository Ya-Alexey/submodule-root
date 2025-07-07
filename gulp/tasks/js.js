import webpack from "webpack-stream";

export const js = () => {
    return app.gulp.src(app.path.src.js, { 
            sourcemaps: true
        })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error; <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'app.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}

//  build-prod-js
export const jsProd = () => {
    return app.gulp.src(app.path.src.js)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "JS",
            message: "Error; <%= error.message %>"
        })
    ))
    .pipe(webpack({
        mode: 'production',
        output: {
            filename: 'app.min.js'
        },
        module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                    // presets: [['@babel/preset-env', {
                    //     useBuiltIns: "usage"
                    // }]]
                  }
                }
              }
            ]
          }
    }))
    .pipe(app.gulp.dest(app.path.build.js))
}