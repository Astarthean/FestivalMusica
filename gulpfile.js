// function tarea(callback) {
//     console.log('mi primera tarea');
//     callback(); //Hace que se finalice la tarea
// }

// // NODE         JS
// exports.tarea = tarea;

//Extraer la funcionalidad de gulp desde la carpeta contenida en node-moduler. Como si fuera un import en Java
const { src, dest, watch } = require("gulp"); //Importo el modulo de gulp para trabajar con sus funciones y metodos
//src: Es una funcion que permite indicar los archivos fuente a utilizar en nuestro proyecto
//dest: Es una funcion que nos permite  indicar donde queremos enviar o guardar estos archivos fuente (carpeta destino).
//watch para que el correr el script, este ejecutando los cambios en live

// const sass = require("sass"); //Cargamos el plugin SASS para poder compilarlo a CSS (import de sass). Pero no sirve, no conecta gulp con sass
const sass = require("gulp-sass")(require('sass')); //Cargamos el plugin SASS de GULP
const plumber = require('gulp-plumber'); //Para que no detenga todo si hay un error

function css(done) {
  src("src/scss/**/*.scss")    //identifica el archivo sass
    .pipe(plumber())
    .pipe(sass())             //aplica sass. compila
    .pipe(dest("build/css")); //guarda en css. almacena en disco
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css)
    done();
}

exports.css = css;
exports.dev = dev;