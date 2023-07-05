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
		const file = readFileSync(args[2], 'utf8');
		const pattern = args[3];

		if (pattern === undefined) {
			throw new Error('No pattern specified.');
		}

		const lines = file.split('\n');
		let lineNum = 0;

		for (const line of lines) {
			lineNum++;
			if (line.includes(pattern)) {
				console.log(`${lineNum}: ${line}`);
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
	console.log('Usage: grrs [options] [file] [pattern]');

	console.log('Options:\n');
	console.log('-h, --help, -?\t\tShow this help message and exit.');
}
