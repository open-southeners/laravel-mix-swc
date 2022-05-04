# Laravel mix swc

Integrate SWC JavaScript transpiler with Laravel Mix.

We know how far Rust can be in terms of performance, this projects brings all its power for JavaScript transpiling (**doing all the job that Babel does but much faster!**).

[**Check its benchmarks here for more reference.**](https://swc.rs/docs/benchmarks)

## Getting started

Installing this in your Laravel project is very simple, run this command:

```sh
yarn add -D laravel-mix-swc
# or
npm i --dev laravel-mix-swc
```

And in your `webpack.mix.js` file in the root of your project add the following:

```js
// At the very top of your file:
require("laravel-mix-swc");

// And replace mix.ts(), mix.js() or mix.babel() with .swc():
mix.swc("resources/js/app.js", "public/js")
```

## Configuration

To configure SWC you can send options as third parameter:

```js
mix.swc("resources/js/app.js", "public/js", {
    jsc: {
        parser: {
            syntax: "ecmascript",
            jsx: false,
        }
    },
    minify: true,
})
```

[**For more info check the official documentation of swc here.**](https://swc.rs/docs/configuration/swcrc)

### Config tips

**TypeScript + JavaScript:**

```json
{
    "test": ".*.ts$",
    "jsc": {
      "parser": {
        "syntax": "typescript"
        // ...
      }
    }
}
```

**JSX support:**

```json
{
    "jsc": {
      "parser": {
        "jsx": true
      }
    }
}
```

**Vue support:**

Very important that you've the decorators enabled, this also supports TypeScript but you can modify that.

```json
{
    "test": ".*.ts$",
    "jsc": {
        "parser": {
            "syntax": "typescript",
            "jsx": false,
            "decorators": true,
            "dynamicImport": true,
            "exportDefaultFrom": true
        }
    }
}
```

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).