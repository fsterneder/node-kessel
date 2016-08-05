A application/boilerplate generator for Express which was inspired by [express-generator](https://github.com/expressjs/generator)

## Install

```sh
$ npm -g install kessel
```

## Usage

Create the app:

```sh
$ kessel /tmp/foo && cd /tmp/foo
```

Install dependencies:

```sh
$ npm install
```

Last step:

```sh
$ npm start
```

## Command Line Options

This generator can also be further configured with the following command line flags.

  -h, --help                 print the usage and exits.
  -V, --version              print the version and exits.
  -v, --verbose              explain what is being done.
  -d PATH, --directory=PATH  define the target directory.
  -n STR, --name=STR         define the name of the application.
  -p, --pug                  add pug (jade) templating support. Default: true
  -e, --ejs                  add ejs templating support.
  --minimal                  create a application with a minimal footprint.
  --no-git                   no .gitignore.

## License

[MIT](LICENSE)

## TODO

Things that I might want to add later:

- Environment variable support
- CSS pre-processor
