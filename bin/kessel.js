#!/usr/bin/env node

const fs = require('fs');
const dashdash = require('dashdash');

const options = [
  {
    names:['help','h'],
    type:'bool',
    help:'prints the usage and exits'
  },
  {
    names:['version','V'],
    type:'bool',
    help:'prints the version and exits'
  },
  {
    names:['directory','d'],
    type:'string',
    help:'define the directory where to put the app',
    helpArg: 'PATH'
  },
  {
    names:['blade','b'],
    type:'bool',
    help:'add blade templating support'
  },
  {
    names:['ejs','e'],
    type:'bool',
    help:'add ejs templating support'
  },
  {
    names:['jade','j'],
    type:'bool',
    help:'add jade templating support',
    default: true
  },
  {
    names:['minimal','m'],
    type:'bool',
    help:'creates a application with a minimal footprint'
  },
  {
    name:"no-git",
    type:'bool',
    help:'doesn\'t create a .gitignore'
  }
];

let parser = dashdash.createParser({options:options});

try{
  var opts = parser.parse(process.argv);
} catch(e){
  console.log('ERROR ', e)
  help()
}

help();

function help(){
  var help = parser.help({includeEnv: true,indent:2,includeDefault:true}).trimRight();
  console.log('usage: kessel [options]\n'
              + help);
  process.exit(0);
}
