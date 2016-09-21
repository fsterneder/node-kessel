#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const dashdash = require('dashdash')
const pkg = require('../package.json')
const __opts = require('./kessel').options

const options = __opts 
