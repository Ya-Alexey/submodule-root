import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugin.js";
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js, jsProd } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, copyFonts } from "./gulp/tasks/fonts.js";
import { svg } from "./gulp/tasks/svg.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
}

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, images);
    gulp.watch(path.watch.svg, svg);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, copyFonts);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svg));
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

gulp.task('default', dev);
gulp.task('build', build);

export { jsProd }  //npm run jsProd