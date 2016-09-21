#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const dashdash = require('dashdash')
const pkg = require('../package.json')
const __opts = require('./kessel').options

const options = __opts 

let parser = dashdash.createParser({options:options})

// parses the options and looks for possible bad input
try{
  var opts = parser.parse(process.argv);
} catch(e){
  console.log('ERROR %s', e)
  printHelp()
}

// *** start ***
if(!opts.help && !opts.version){
  try{
    let _path = opts.directory || path.resolve()
    main(fs.realpathSync(_path))
  } catch(e){
    console.log('ERROR %s', e)
  }
} 
else {
  if(opts.version && !opts.help){
    console.log(pkg.version)
  } else {printHelp()}
}

// Main function
function main(userPath){
  buildTemplate(userPath)
}

// copys files and create dirs
function buildTemplate(userPath){
  if(opts.name){
    var dirName = (opts.name).toString()
  } else {
    var dirName = path.parse(userPath).name
  }

  // package.json - diff: script start, depend
  var pkg = { name: dirName, version: '0.0.0', dependencies: {'express':'^4.14.0'}}
  debugger
  if(opts.author){pkg.author = opts.author}
  if(opts.licence){pkg.licence = opts.licence}
  if(opts.private){pkg.private = true}

  // read template files
  if(opts.minimal){
    var appjs = readTemplate('min.js');
    pkg.scripts = {'start': 'node '+dirName}
  } else {
    var appjs = readTemplate('app.js')
    var binsrv = readTemplate('binsrv.js')
    var ctrljs = readTemplate('controller.js')
    pkg.scripts = {'start': 'node ./bin/'+dirName}, 
    pkg.dependencies = {'express':'^4.14.0','body-parser':'^1.15.2','cookie-parser':'^1.4.3','morgan': '^1.7.0'}

    mkdir(userPath,'bin')
    ctrljs = ctrljs.replace(/>name</g,dirName)
    writeTemplate(userPath,'/bin/'+dirName+'.js',binsrv)
    writeTemplate(userPath,'controller.js',ctrljs)
  }

  let cssf = readTemplate('main.css')

  // make dirs
  mkdir(userPath,'public')
  mkdir(userPath,'public/css')
  mkdir(userPath,'views')
  
  if(opts.ejs){
    pkg.dependencies['ejs'] = "^2.5.1"
    appjs = appjs.replace(/>view</g,'ejs')
    let ejsIndex = readTemplate('ejs/index.ejs')
    writeTemplate(userPath,'views/index.ejs', ejsIndex)
  } else if(opts.hbs){
    pkg.dependencies['hbs'] = "^4.0.1"
    appjs = appjs.replace(/>view</g,'hbs')
    let hbsIndex = readTemplate('hbs/index.hbs')
    let hbsLayout = readTemplate('hbs/layout.hbs')
    writeTemplate(userPath,'views/index.hbs', hbsIndex)
    writeTemplate(userPath,'views/layout.hbs', hbsIndex)
  } else {
    pkg.dependencies['pug'] = '^2.0.0-beta4'
    appjs = appjs.replace(/>view</g,'pug')
    let pugIndex = readTemplate('pug/index.pug')
    let pugLayout = readTemplate('pug/layout.pug')
    pugLayout = pugLayout.replace(/>title</,dirName)
    writeTemplate(userPath,'views/index.pug',pugIndex)
    writeTemplate(userPath,'views/layout.pug',pugLayout)
  }
  
  if(opts.minimal){
    appjs = appjs.replace(/>name</g,dirName)
    writeTemplate(userPath, dirName + '.js', appjs)
  } else {
    writeTemplate(userPath,'app.js',appjs)
  }

  //copy files
  writeTemplate(userPath,'package.json',JSON.stringify(pkg, null, 2) + '\n')
  writeTemplate(userPath,'/public/css/main.css',cssf)
  
  if(!opts.no_git){
    let gitign = readTemplate('gitignore')
    writeTemplate(userPath,'.gitignore',gitign)
  }
}

// helper function which reads from the template dir
function readTemplate(name){
  return fs.readFileSync(path.join(__dirname + '/../templates/' + name),'utf-8')
}

// helper function which writes a file
function writeTemplate(pathInput,filename, content){
  fs.writeFileSync(path.join(pathInput,filename),content,{mode:Number.parseInt(0755)})
  if(opts.verbose){
    console.log('write: ' + path.join(pathInput,filename))
  }
}

// create a directory
function mkdir(pathInput,newDir){
  try{
    fs.mkdirSync(path.join(pathInput,newDir),Number.parseInt(0755))
  } catch(e) {
    e.code === "EEXIST" ? null : console.log(e)
  }
}

// help function
function printHelp(){
  var help = parser.help({includeEnv: true,indent:2,includeDefault:true}).trimRight()
  console.log('usage: kessel [options]\n' + help)
  process.exit(0)
}
