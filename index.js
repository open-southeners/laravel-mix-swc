const mix = require('laravel-mix');
const Swc = require('./plugin');

mix.extend('swc', new Swc);
