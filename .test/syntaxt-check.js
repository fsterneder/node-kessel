#!/bin/node

'use strict'

const input = require('process').argv.splice(2)[0]
const pathj = require('path').join

const projDir = '~/Projects/kessel/'

const optLayer = [ 
	[['min','--minimal'],['max',''],['colon','-s']],
	[['hapi','-H'],['expr','-E']],
	[['hbs','--hbs'],['ejs','-e'],['pug','-p']] 
]

let dir = pathj(input,'hapi-test')

for(let [i,el] of optLayer[0].entries()){
	exec('mkdir -p ' + pathj(dir,optLayer[0][i][0]))

	for(let [j,el] of optLayer[1].entries()){
		exec('mkdir -p ' + pathj(dir,optLayer[0][i][0],optLayer[1][j][0]))

		for(let [k,el] of optLayer[2].entries()){

			let path = pathj(dir,optLayer[0][i][0],optLayer[1][j][0])
			exec('mkdir -p ' + optLayer[2][k][0], path)

			path = pathj(path,optLayer[2][k][0])

			exec(projDir + 'bin/kessel.js ' + + optLayer[0][i][1] + ' ' + optLayer[1][j][1] + ' ' + optLayer[2][k][1] + ' -v', path)

			exec('node -c ' + optLayer[2][k][0] +'.js' + ' > ' + projDir + '.test/error.log',path)
		}

	}
}

//helper function
function exec(cmd,dir=null){
	return require('child_process').execSync(cmd,{cwd:dir})
}
