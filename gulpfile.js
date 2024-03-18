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
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss')
const sourcemaps = require( 'gulp-sourcemaps' );

//Imagenes------------------
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');  //Comprimir imagenes
const webp = require('gulp-webp'); 
const avif = require('gulp-avif');  

//JavaScript
const terser = require('gulp-terser-js');

function css(done) {
  src("src/scss/**/*.scss")    //identifica el archivo sass
    .pipe(sourcemaps.init( ) )  //Inicializa las mapeado de archivos
    .pipe(plumber())
    .pipe(sass())             //aplica sass. compila
    .pipe(postcss([autoprefixer(), cssnano]))
    .pipe(sourcemaps.write('.')) //Indica donde guardara los mapas de archivos
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

function javascript(done){
  src('src/js/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest( 'build/js' ));
  done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript)
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAfiv = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);