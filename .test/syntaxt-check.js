#!/bin/node

const input = require('process').argv.splice(2)[0]
const pathj = require('path').join
const exec = require('../lib/helpr').exec
const opts = require('./options'), optLayer = opts.layer, testFolder = opts.testFolder, projDir = opts.projectDir

for(let [i,el] of optLayer[0].entries()){

	for(let [j,el] of optLayer[1].entries()){

		for(let [k,el] of optLayer[2].entries()){
			let path = pathj(input,testFolder,optLayer[0][i][0],optLayer[1][j][0],optLayer[2][k][0])
			try{ exec('node -c ' + optLayer[2][k][0] +'.js',path) }
			catch (e){ exec('echo ' + e.toString() + ' >> ' + pathj(projDir,'.test') + '/error.log') }
		}

	}

}
