A application/boilerplate generator for Express.js and Hapi.js which was inspired by [express-generator](https://github.com/expressjs/generator)

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

Last step to start the application at port 4004:

```sh
$ npm start -- 4004
```

## Command Line Options

This generator can also be further configured with the following command line flags.

```sh
  -h, --help                 print the usage and exits.
  -V, --version              print the version and exits.
  -v, --verbose              explain what is being done.
  -d PATH, --directory=PATH  define the target directory.
  -n STR, --name=STR         define the name of the application.
  -p, --pug                  add pug (jade) templating support. Default: true
  -e, --ejs                  add ejs templating support.
  -h, --handlebars           add handlebar templating support.
  --minimal                  create a application with a minimal footprint.
  --no-git                   no .gitignore.
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

Things that I might want to add later:

- CSS pre-processor
