#!/usr/bin/env node

const fs = require('fs'), path = require('path'), dashdash = require('dashdash')
const pkg = require('../package.json'), helpr = require('../lib/helpr')

const options = [
  { names:['help','h'], type:'bool', help:'print the usage and exits' },
  { names:['version','V'], type:'bool', help:'print the version and exits' },
  { names:['verbose','v'], type:'bool', help:'explain what is being done' },

  { names:['directory','d'], type:'string', help:'define the target directory', helpArg: 'PATH' },
  { names:['name','n'], type:'string', help:'define the name of the application', helpArg: 'STR' },

  { names:["express",'E'], type:'bool', help:'Express framework'},
  { names:["hapi",'H'], type:'bool', help:'Hapi.js framework', default: true},

  { names:['pug','p'], type:'bool', help:'add Pug (Jade) templating support', default: true },
  { names:['hbs'], type:'bool', help:'add Handlebars templating support'},
  { names:['ejs','e'], type:'bool', help:'add Embedded JavaScript templating support' },

  { name:'author', type:'string', env: 'KESSEL_AUTHOR', help:'specifiy the author of the project', helpArg: 'STR'},
  { name:'licence', type:'string', env: 'KESSEL_LICENCE', help:'specifiy the licence of the project', helpArg: 'STR'},
  { name:'private', type:'bool', env: 'KESSEL_PRIVATE', help:'specifies if the application should be flagged as private', default: false},

  { name:'minimal', type:'bool', help:'create a application with a minimal footprint' },
  { name:"no-git", type:'bool', help:'no .gitignore'}
]

let parser = dashdash.createParser({options:options})

  
// parses the options and looks for possible bad input
try {
  var opts = parser.parse(process.argv);
} catch(e){
  console.log('ERROR %s', e)
  printHelp()
}

// bindings for various functions
const printHelp = helpr.printHelp.bind(null,parser), readTemplate = helpr.readTemplate, mkdir = helpr.mkdir, writeTemplate = helpr.writeTemplate.bind(null,opts.verbose)

// *** start ***
if(!opts.help && !opts.version){
  try {
    let _path = opts.directory || path.resolve()
    main(fs.realpathSync(_path))
  } catch(e){
    console.log('ERROR %s', e)
  }
} 
else {
  if(opts.version && !opts.help){
    console.log(pkg.version)
  } else { printHelp() }
}

// Main function
function main(userPath){
  buildTemplate(userPath)
}

// copys files and create dirs
function buildTemplate(userPath){
  if(opts.name){ var dirName = (opts.name).toString() }
  else { var dirName = path.parse(userPath).name }

  // package.json - diff: script start, depend
  var pkg = { name: dirName, version: '0.0.0'}

  if(opts.author){pkg.author = opts.author}
  if(opts.licence){pkg.licence = opts.licence}
  if(opts.private){pkg.private = true}

  // read template files
  if(opts.minimal){
    if(opts.express){

      var appjs = readTemplate('/expr/min.js')
      pkg.dependencies = {'express':'^4.14.0'}

    } else {

      var appjs = readTemplate('/hapi/min.js')
      pkg.dependencies = {'hapi':'^15.0.3','vision':'^4.1.0','inert':'^4.0.2'}

    }
    pkg.scripts = {'start': 'node '+dirName+'.js'}
  } else {
    if(opts.express){

      var appjs = readTemplate('/expr/app.js')
      var binsrv = readTemplate('/expr/binsrv.js')
      var ctrljs = readTemplate('/expr/controller.js')
      pkg.scripts = {'start': 'node ./bin/'+dirName}, 
      pkg.dependencies = {'express':'^4.14.0','body-parser':'^1.15.2','cookie-parser':'^1.4.3','morgan': '^1.7.0'}

      mkdir(userPath,'bin')
      ctrljs = ctrljs.replace(/>name</g, dirName)
      writeTemplate(userPath,'/bin/'+dirName, binsrv)
      writeTemplate(userPath,'controller.js', ctrljs)

    } else {

      var appjs = readTemplate('/hapi/app.js')
      var ctrljs = readTemplate('/hapi/controller.js')
      var routesjs = readTemplate('/hapi/routes.js')
      pkg.scripts = {'start': 'node ./'+dirName+'.js'}, 
      pkg.dependencies = {'hapi':'^15.0.3','vision':'^4.1.0','inert':'^4.0.2'}

      ctrljs = ctrljs.replace(/>name</g,dirName)
      writeTemplate(userPath,'controller.js',ctrljs)
      writeTemplate(userPath,'routes.js',routesjs)

    }
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

    let hbsLayout = readTemplate('hbs/layout.hbs')
    if(opts.express){

      hbsLayout = hbsLayout.replace(/>layout</g,'body')
      pkg.dependencies['hbs'] = "^4.0.1"
      appjs = appjs.replace(/>view</g,'hbs')

    } else {

      hbsLayout = hbsLayout.replace(/>layout</g,'content')
      pkg.dependencies['handlebars'] = "^4.0.5"
      opts.minimal ? appjs = readTemplate('hapi/min-hbs.js') : appjs = readTemplate('hapi/app-hbs.js')

    }

    let hbsIndex = readTemplate('hbs/index.hbs')
    writeTemplate(userPath,'views/index.hbs', hbsIndex)
    writeTemplate(userPath,'views/layout.hbs', hbsLayout)

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
    if(opts.express){writeTemplate(userPath,'app.js',appjs)}
    else {writeTemplate(userPath,'/'+dirName+'.js',appjs)}
  }

  //copy files
  writeTemplate(userPath,'package.json',JSON.stringify(pkg, null, 2) + '\n')
  writeTemplate(userPath,'/public/css/main.css',cssf)
  
  if(!opts.no_git){
    let gitign = readTemplate('gitignore')
    writeTemplate(userPath,'.gitignore',gitign)
  }
}
