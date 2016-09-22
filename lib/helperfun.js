// reads from the template dir
function readTemplate(name){
  return fs.readFileSync(path.join(__dirname + '/../templates/' + name),'utf-8')
}

// writes to a file
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

module.exports = {
  readTemplate: readTemplate,
  writeTemplate: writeTemplate,
  mkdir: mkdir,
  printHelp: printHelp
}
