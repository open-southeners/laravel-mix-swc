const File = require('laravel-mix/src/File');
const Assert = require('laravel-mix/src/Assert');
const glob = require('glob');
const deepmerge = require('deepmerge');

const defaultOptions = {
    jsc: {
        parser: {
            syntax: "ecmascript",
            tsx: false,
            decorators: true,
            dynamicImport: true,
        }
    }
};

class Swc {
    /** @type {{entry: File[], output: File}[]} */
    toCompile = [];

    /** @type {import('@swc/core/types').Config} */
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
     * Register the component.
     *
     * @param {any} entry
     * @param {string} output
     * @param {import('@swc/core/types').Config} options
     */
    register(entry, output, options = {}) {
        if (typeof entry === 'string' && entry.includes('*')) {
            entry = glob.sync(entry);
        }

        Assert.js(entry, output);

        entry = [].concat(entry).map(file => new File(file));

        this.toCompile.push({ entry, output: new File(output) });

        global.Mix.bundlingJavaScript = true;

        // Merge default options with user-defined ones (preferring the last ones)
        this.options = deepmerge(defaultOptions, options);
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
                        options: this.options,
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
