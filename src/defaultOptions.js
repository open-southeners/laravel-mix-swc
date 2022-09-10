/** @type {import('@swc/core').Config} */
module.exports = {
    jsc: {
        parser: {
            syntax: "ecmascript",
            tsx: false,
            decorators: true,
            dynamicImport: true,
        }
    }
}