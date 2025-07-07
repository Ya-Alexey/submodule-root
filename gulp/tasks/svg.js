import svgSprite from "gulp-svg-sprite";

export const svg = () => {
    return app.gulp.src(app.path.src.svg)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error; <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: `../svg/icons.svg`,
                        example: true
                    }
                }
            })
        )
        .pipe(app.gulp.dest(app.path.build.img))
        .pipe(app.plugins.browsersync.stream());
}