# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2022-09-10

### Changed

- Replaced glob dependency with fast-glob

### Fixed

- Moved @swc/core and swc-loader to devDependencies so they can be up to date in the projects using this

## [0.3.0] - 2022-05-06

### Added

- Minify options with JavaScript and CSS rust-based minifiers
- Types definitions

## [0.2.0] - 2022-05-04

### Added

- Options object param autocompletion

### Fixed

- Options now using deepmerge instead of 1-level merge

### Changed

- Normalize default options (to a JS preset)

## [0.1.0] - 2022-05-04

### Added

- Initial release!