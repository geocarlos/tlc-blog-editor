const ch = require('child_process');
const fs = require('fs');

const ignored = [
	'deploy.js',
	'.git',
	'.gitignore',
	'node_modules', 
	'build'
]

const files = fs.readdirSync('./');

if (files.length) {
	ch.execSync(`rm -R ${files.filter(f => !ignored.includes(f)).join(' ')}`);
}

ch.execSync(`cp -R ./build/* ./`)