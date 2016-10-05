const fs = require('fs')
const path = require('path')

// reads from the template dir
function readTemplate(name){
  return fs.readFileSync(path.join(__dirname + '/../templates/' + name),'utf-8')
}

// writes to a file
function writeTemplate(verbose=false,pathInput,filename, content){
  fs.writeFileSync(path.join(pathInput,filename),content,{mode:Number.parseInt(0755)})
  if(verbose) {
    console.log('write: ' + path.join(pathInput,filename))
  }
}

// create a directory
function mkdir(pathInput,newDir){
  try {
    fs.mkdirSync(path.join(pathInput,newDir),Number.parseInt(0755))
  } catch(e) {
    e.code === "EEXIST" ? null : console.log(e)
  }
}

// help function
function printHelp(parser){
  var help = parser.help({includeEnv: true,indent:2,includeDefault:true}).trimRight()
  console.log('usage: kessel [options]\n' + help)
  process.exit(0)
}

function exec(cmd,dir=null){
	return require('child_process').exec(cmd,{cwd:dir},function(e,stdout,stderr){
		if(e){console.log(e)}
		stdout ? console.log(stdout) : null
	})
}

function execSync(cmd,dir=null){
	return require('child_process').execSync(cmd,{cwd:dir})
}

module.exports = {
  readTemplate: readTemplate,
  writeTemplate: writeTemplate,
  mkdir: mkdir,
  printHelp: printHelp,
	exec: exec,
	execSync: execSync
}
