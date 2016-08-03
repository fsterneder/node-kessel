#!/usr/bin/env node
(()=>('use strict'));

const os = require('os');
const fs = require('fs');
const path = require('path');
const dashdash = require('dashdash');
const pkg = require('../package.json');

const options = [
  { names:['help','h'], type:'bool', help:'prints the usage and exits' },
  { names:['version','V'], type:'bool', help:'prints the version and exits' },
  { names:['directory','d'], type:'string', help:'defines the target directory', helpArg: 'PATH' },
  { names:['blade','b'], type:'bool', help:'add blade templating support' },
  { names:['ejs','e'], type:'bool', help:'add ejs templating support' },
  { names:['jade','j'], type:'bool', help:'add jade templating support', default: true },
  { names:['minimal','m'], type:'bool', help:'creates a application with a minimal footprint' },
  { name:"no-git", type:'bool', help:'doesn\'t create a .gitignore' }
];

let parser = dashdash.createParser({options:options});

// parses the options and looks for possible bad input
try{
  var opts = parser.parse(process.argv);
} catch(e){
  console.log('ERROR %s', e)
  printHelp()
}

// start
if(!opts.help && !opts.version){
  main(opts.directory);
} else {
  if(opts.version && !opts.help){console.log(pkg.version)}
  else(printHelp());
}

// Main function
function main(userPath){
  console.log(userPath);
}

// helper function which reads from the template dir
function readTemplate(name){
  return fs.readFileSync(path.join(__dirname + '/../templates/' + name),'utf-8');
}

// helper function which writes a file
function writeTemplate(pathInput,content){
  fs.writeFileSync(pathInput,content,{mode:0o644});
  return 'finished writing ' + pathInput;
}

// create a directory
function mkdir(pathInput){
  fs.mkdir(pathInput,0o644);
}

function printHelp(){
  var help = parser.help({includeEnv: true,indent:2,includeDefault:true}).trimRight();
  console.log('usage: kessel [options]\n' + help);
  process.exit(0);
}
