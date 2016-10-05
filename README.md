A application/boilerplate generator for Express.js and Hapi.js, inspired by [express-generator](https://github.com/expressjs/generator)

## Install

```sh
$ npm -g install kessel
```

## Usage

Create the app:

```sh
$ kessel -d /tmp/foo && cd /tmp/foo
```

Install dependencies:

```sh
$ npm install
```

Last step to start the application at port 4004:

```sh
$ npm start -- 4004
```

## Command Line Options

This generator can also be further configured with the following command line flags.

```sh
  -E, --express              Express framework.
  -H, --hapi                 Hapi.js framework. Default: true
  --minimal                  create a application with a minimal footprint.

  -p, --pug                  add Pug (Jade) templating support. Default: true
  --hbs                      add Handlebars templating support.
  -e, --ejs                  add Embedded JavaScript templating support.

  -d PATH, --directory=PATH  define the target directory.
  -n STR, --name=STR         define the name of the application.
  -s, --semicolon            semicolon-less code style.

  --author=STR               specifiy the author of the project. Environment:
                             KESSEL_AUTHOR=STR
  --licence=STR              specifiy the licence of the project. Environment:
                             KESSEL_LICENCE=STR
  --private                  specifies if the application should be flagged as
                             private. Environment: KESSEL_PRIVATE=1. Default:
                             false
  --no-git                   no .gitignore.

  -h, --help                 print the usage and exits.
  -V, --version              print the version and exits.
  -v, --verbose              explain what is being done.
```

## Environment Variables

The following Environment Variables are aviable at the moment:

##### **KESSEL_AUTHOR** (String) 
Sets the author in the applications package.json file

##### **KESSEL_PRIVATE** (Boolean)
A environment variable which gives you the option to set your projects to private

##### **KESSEL_LICENCE** (String)
Define the licence for the package.json file

## License

[MIT](LICENSE)

## TODO

Things that I would like to add at some point:

- CSS pre-processor options
