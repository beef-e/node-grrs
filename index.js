#!/usr/bin/env node
const { readFile, readFileSync } = require('fs');
//const { cpuUsage } = require('process');
const args = process.argv;

try {
	if (args[2] === '-?' || args[2] === '--help' || args[2] === '-h') {
		info();
	}

	if (args[2] === undefined) {
		throw new Error('No file specified.');
	}

	if (args[2] !== undefined) {
		var file;
		if (args[4] === undefined) {
			file = readFileSync(args[2], 'utf8');
		} else {
			file = readFileSync(args[2], args[4]);
		}
		const pattern = args[3];

		if (pattern === undefined) {
			throw new Error('No pattern specified.');
		}

		const lines = file.split('\n');
		let lineNum = 0;

		for (const line of lines) {
			lineNum++;
			if (line.includes(pattern)) {
				if (line.length < 50) {
					console.log(`${lineNum}: ${line}`);
				} else {
					const lineArr = line.split(pattern);
					const lineArrLen = lineArr.length;
					let lineArrIndex = 0;
					for (const linePart of lineArr) {
						lineArrIndex++;
						if (lineArrIndex != lineArrLen) {
							console.log(`${lineNum}: ${linePart}${pattern} [+ ${lineArr[1].length}]`);
						}
					}
				}
			}
		}
	}
} catch (error) {
	console.log(error);
	console.log('Error: ' + error.message);
	info();
}

function info() {
	console.log('grrs: A simple grep clone written (badly) in JS.');
	console.log('Usage: grrs [options] [file] [pattern] [encoding]\n');

	console.log('Arguments:');
	console.log('[file]\t\t\tSpecify the file to search in.');
	console.log('[pattern]\t\tSpecify the pattern to search for.');
	console.log('[encoding]\t\tSpecify the encoding of the file. Default is utf8.\n');

	console.log('Options:');
	console.log('-h, --help, -?\t\tShow this help message and exit.');
}
