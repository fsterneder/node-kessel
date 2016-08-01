#!/usr/bin/env node

const dashdash = require('dashdash');

const options = [
  {
    names:['help','h'],
    type:'bool',
    help:'prints the usage and exit'
  },
  {
    names:['coin','c'],
    type:'bool',
    help:'output is either head or tail'
  },
  {
    names:['boolean','b'],
    type:'bool',
    help:'output is either 0 or 1'
  },
  {
    names:['list','s'],
    type:'string',
    help:'takes a list of at least two strings and returns one item'
  },
  {
    names:['length','l'],
    type:'integer',
    help:'defines the number of outputs',
    default: 1
  }
];

let parser = dashdash.createParser({options:options});
try{
  var opts = parser.parse(process.argv);
} catch(e){
  help()
}

// MAIN BODY

console.log("# opts:", opts);
console.log("# args:", opts._args);

if(opts.coin){
  for(let i=0;i<opts.length;i++){
	if(Math.floor(Math.random(2)*2)%2 == '0'){console.log('head');}
	else{console.log('tail');}
  }
}
else if(opts.boolean){
  for(let i=0;i<opts.length;i++){
	if(Math.floor(Math.random(2)*2)%2 == '0'){console.log('0');}
	else{console.log('1');}
  }
}
else if(opts.list){
  let argsArray = opts.list.split(' ');
  if(argsArray.length < 2){help()}
  for(let i=0;i<opts.length;i++){
    var decision = Math.floor(Math.random()*argsArray.length);
    console.log(argsArray[decision]);
  }
}
else help();

// FUNCTIONS
function help(){
  var help = parser.help({includeEnv: true,indent:2}).trimRight();
  console.log('usage: conflip [options]\n'
              + help);
  process.exit(0);
}
