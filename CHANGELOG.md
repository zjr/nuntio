# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.15.0](https://github.com/zjr/nuntio/compare/v0.13.2...v0.15.0) (2020-03-08)


### Build System

* **deps:** bump handlebars from 4.1.2 to 4.5.3 ([ad27504](https://github.com/zjr/nuntio/commit/ad27504))


### Features

* return relative URLs for better linking ([6f0007c](https://github.com/zjr/nuntio/commit/6f0007c))



## [0.14.0](https://github.com/zjr/nuntio/compare/v0.13.2...v0.14.0) (2020-03-08)


### Features

* return relative URLs for better linking ([059b6a0](https://github.com/zjr/nuntio/commit/059b6a0))



### [0.13.2](https://github.com/zjr/nuntio/compare/v0.13.1...v0.13.2) (2019-12-11)


### Bug Fixes

* log all errors when option enabled ([1d82915](https://github.com/zjr/nuntio/commit/1d82915))



### [0.13.1](https://github.com/zjr/nuntio/compare/v0.13.0...v0.13.1) (2019-12-11)



## [0.13.0](https://github.com/zjr/nuntio/compare/v0.12.0...v0.13.0) (2019-12-11)


### Bug Fixes

* add default error message ([0e24748](https://github.com/zjr/nuntio/commit/0e24748))


### Build System

* **deps:** bump lodash.template from 4.4.0 to 4.5.0 ([493bd4b](https://github.com/zjr/nuntio/commit/493bd4b))


### Features

* add toJSON method to nuntio errors ([3b49d18](https://github.com/zjr/nuntio/commit/3b49d18))



## [0.12.0](https://github.com/zjr/nuntio/compare/v0.11.1...v0.12.0) (2019-10-18)


### Features

* support calling Nuntio.error w/ status code only ([7b45441](https://github.com/zjr/nuntio/commit/7b45441))



### [0.11.1](https://github.com/zjr/nuntio/compare/v0.11.0...v0.11.1) (2019-10-12)


### Bug Fixes

* better message support for Nuntio.end() ([dad45b5](https://github.com/zjr/nuntio/commit/dad45b5))



## [0.11.0](https://github.com/zjr/nuntio/compare/v0.10.0...v0.11.0) (2019-10-12)


### Features

* default Nuntio.end data to null. ([597e38b](https://github.com/zjr/nuntio/commit/597e38b))



## [0.10.0](https://github.com/zjr/nuntio/compare/v0.9.1...v0.10.0) (2019-10-12)


### Features

* allow setting body in static end(). ([d108005](https://github.com/zjr/nuntio/commit/d108005))



### [0.9.1](https://github.com/zjr/nuntio/compare/v0.9.0...v0.9.1) (2019-10-12)


### Bug Fixes

* skip nuntio wrapper during end ([6dbc4dd](https://github.com/zjr/nuntio/commit/6dbc4dd))



## [0.9.0](https://github.com/zjr/nuntio/compare/v0.8.0...v0.9.0) (2019-10-12)


### Features

* add static end fn ([aa022cf](https://github.com/zjr/nuntio/commit/aa022cf))



## [0.8.0](https://github.com/zjr/nuntio/compare/v0.7.0...v0.8.0) (2019-09-06)


### Features

* only use middleware to wrap success body for JSON responses ([7bf9769](https://github.com/zjr/nuntio/commit/7bf9769))



## [0.7.0](https://github.com/zjr/nuntio/compare/v0.6.0...v0.7.0) (2019-07-19)


### Features

* default enabled middleware option to log caught exceptions ([d06a063](https://github.com/zjr/nuntio/commit/d06a063))
* handle page counts ([d5f5231](https://github.com/zjr/nuntio/commit/d5f5231))



## [0.6.0](https://github.com/zjr/nuntio/compare/v0.5.0...v0.6.0) (2019-05-31)


### Features

* add files config to package.json ([6d07f8b](https://github.com/zjr/nuntio/commit/6d07f8b))



## [0.5.0](https://github.com/zjr/nuntio/compare/v0.4.0...v0.5.0) (2019-05-29)


### Features

* auto-build next/prev based on ctx/ctx.page ([a24ada7](https://github.com/zjr/nuntio/commit/a24ada7))



## [0.4.0](https://github.com/zjr/nuntio/compare/v0.3.1...v0.4.0) (2019-05-29)


### Features

* add option to catch non-nuntio errors, expose them ([4ba266f](https://github.com/zjr/nuntio/commit/4ba266f))



### [0.3.1](https://github.com/zjr/nuntio/compare/v0.3.0...v0.3.1) (2019-05-29)



## [0.3.0](https://github.com/zjr/nuntio/compare/v0.2.0...v0.3.0) (2019-05-29)


### Features

* add koa as peer dep ([644bfa1](https://github.com/zjr/nuntio/commit/644bfa1))



## 0.2.0 (2019-05-29)

### Refactor

* rename harald as nuntio ([fc24952](https://github.com/zjr/nuntio/commit/fc24952))



## 0.1.0 (2019-05-28)

### Build System

* add commitlint, prettier & standard-version ([252f071](https://github.com/zjr/nuntio/commit/252f071))

### Features

* initial commit for harald in index.js ([480de72](https://github.com/zjr/nuntio/commit/480de72))
