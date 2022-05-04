const File = require('laravel-mix/src/File');
const Assert = require('laravel-mix/src/Assert');
const glob = require('glob');

class Swc {
    /** @type {{entry: File[], output: File}[]} */
    toCompile = [];

    /** @type {Record<string, any>} */
    options = {};

    /**
     * The API name for the component.
     *
     * @return {String|Array}
     */
    name() {
        return 'swc';
    }

    /**
     * All npm dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['typescript'].concat();
    }

    /**
     * Register the component.
     *
     * @param {any} entry
     * @param {string} output
     * @param {Record<string, any>} options
     */
    register(entry, output, options = {}) {
        if (typeof entry === 'string' && entry.includes('*')) {
            entry = glob.sync(entry);
        }

        Assert.js(entry, output);

        entry = [].concat(entry).map(file => new File(file));

        this.toCompile.push({ entry, output: new File(output) });

        global.Mix.bundlingJavaScript = true;

        this.options = options;
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has processed.
     */
    boot() {
        // Example:
        // if (Config.options.foo) {}
    }

    /**
     * Assets to append to the webpack entry.
     *
     * @param {import('../builder/Entry')} entry
     */
     webpackEntry(entry) {
        this.toCompile.forEach(js => {
            entry.addFromOutput(
                js.entry.map(file => file.path()),
                js.output,
                js.entry[0]
            );
        });
    }

    /**
     * Rules to be merged with the underlying webpack rules.
     *
     * @return {Array|Object}
     */
    webpackRules() {
        return [
            {
                test: /\.(cjs|mjs|jsx?|tsx?)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'swc-loader',
                        // @see https://swc.rs/docs/configuration/compilation
                        options: Object.assign({}, {
                            test: ".*.ts$",
                            // Uncomment this to debug transpiler more in-depth
                            // sync: true,
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: false,
                                    decorators: true,
                                    dynamicImport: true,
                                    // Includes inline helpers on the built files, for asyncs, etc
                                    externalHelpers: true,
                                }
                            }
                        }, this.options),
                    }
                ]
            }
        ];
    }

    /**
     * Override the underlying webpack configuration.
     *
     * @param {Object} config
     * @return {void}
     */
    webpackConfig(config) {
        config.resolve.extensions.push('.ts', '.tsx');
    }
}

module.exports = Swc;
