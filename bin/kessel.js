#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const dashdash = require('dashdash')
const pkg = require('../package.json')

const options = [
  { names:['help','h'], type:'bool', help:'print the usage and exits' },
  { names:['version','V'], type:'bool', help:'print the version and exits' },
  { names:['verbose','v'], type:'bool', help:'explain what is being done' },
  { names:['directory','d'], type:'string', help:'define the target directory', helpArg: 'PATH' },
  { names:['name','n'], type:'string', help:'define the name of the application', helpArg: 'STR' },
  { names:['pug','p'], type:'bool', help:'add Pug (Jade) templating support', default: true },
  { names:['hbs','H'], type:'bool', help:'add Handlebars templating support', default: true },
  { names:['ejs','e'], type:'bool', help:'add Embedded JavaScript templating support' },
  { name:'author', type:'string', env: 'KESSEL_AUTHOR', help:'specifiy the author of the project', helpArg: 'STR'},
  { name:'licence', type:'string', env: 'KESSEL_LICENCE', help:'specifiy the licence of the project', helpArg: 'STR'},
  { name:'private', type:'bool', env: 'KESSEL_PRIVATE', help:'specifies if the application should be flagged as private', default: false},
  { name:'minimal', type:'bool', help:'create a application with a minimal footprint' },
  { name:"no-git", type:'bool', help:'no .gitignore'},
  { name:"express", type:'bool', help:'Express framework'},
  { name:"hapi", type:'bool', help:'Hapi.js framework'}
]

module.exports.options = options
