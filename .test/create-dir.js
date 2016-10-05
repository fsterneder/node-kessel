#!/bin/node

'use strict'

const input = require('process').argv.splice(2)[0]
const pathj = require('path').join

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
			exec('cd ' + pathj(dir,optLayer[0][i][0],optLayer[1][j][0]) +
			' && ' +
			'mkdir ' + optLayer[2][k][0] + ' ' + 
			' && ' + 
			' cd ' + optLayer[2][k][0] +
			' && ' +
			'~/Projects/kessel/bin/kessel.js ' + 
			+ optLayer[0][i][1] + ' '
			+ optLayer[1][j][1] + ' '
			+ optLayer[2][k][1] + ' -v')
		}

	}

}

//helper function
function exec(cmd){
	return require('child_process').exec(cmd,function(e,stdout,stderr){
		if(e){ throw e}
		stdout ? console.log(stdout) : null
	})
}
