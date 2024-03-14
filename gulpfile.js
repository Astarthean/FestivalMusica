// function tarea(callback) {
//     console.log('mi primera tarea');
//     callback(); //Hace que se finalice la tarea
// }

// // NODE         JS
// exports.tarea = tarea;

//Extraer la funcionalidad de gulp desde la carpeta contenida en node-moduler. Como si fuera un import en Java
const { src, dest, watch, parallel } = require("gulp"); //Importo el modulo de gulp para trabajar con sus funciones y metodos
//src: Es una funcion que permite indicar los archivos fuente a utilizar en nuestro proyecto
//dest: Es una funcion que nos permite  indicar donde queremos enviar o guardar estos archivos fuente (carpeta destino).
//watch para que el correr el script, este ejecutando los cambios en live

//CSS-----------------------
// const sass = require("sass"); //Cargamos el plugin SASS para poder compilarlo a CSS (import de sass). Pero no sirve, no conecta gulp con sass
const sass = require("gulp-sass")(require('sass')); //Cargamos el plugin SASS de GULP
const plumber = require('gulp-plumber'); //Para que no detenga todo si hay un error

//Imagenes------------------
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');  //Comprimir imagenes
const webp = require('gulp-webp'); 
const avif = require('gulp-avif');  

function css(done) {
  src("src/scss/**/*.scss")    //identifica el archivo sass
    .pipe(plumber())
    .pipe(sass())             //aplica sass. compila
    .pipe(dest("build/css")); //guarda en css. almacena en disco
    done();
}

function imagenes(done){
  const opciones = {
    optimizationLevel: 3
  }
  src("src/img/**/*.{png,jpg}")
  .pipe(cache(imagemin(opciones)))
  .pipe(dest('build/img'))
  done();
}

function versionWebp(done){
  const opciones = {
    quality: 50
  };
  src('src/img/**/*.{png,jpg}')
  .pipe(webp(opciones))              //Convierte las imagenes a formato WEBP
  .pipe(dest('build/img'));
  done();
}

function versionAvif(done){
  const opciones = {
    quality: 50
  };
  src('src/img/**/*.{png,jpg}')
  .pipe(avif(opciones))              //Convierte las imagenes a formato WEBP
  .pipe(dest('build/img'));
  done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css)
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAfiv = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);