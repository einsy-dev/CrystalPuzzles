/* eslint-disable no-console */
require('dotenv').config();
const ejs = require('ejs');
const fs = require('fs');
const { exit } = require('process');

fs.existsSync('./build/index.html') || exit('build/index.html does not exist');

console.log('reading build/index.html');
let originHtml = fs.readFileSync('./build/index.html', 'utf8');

console.log('rendering new build/index.html');
let newHtml = ejs.render(originHtml, {
	REACT_APP_SERVER_API: process.env.REACT_APP_SERVER_API,
	REACT_APP_TAG: process.env.REACT_APP_TAG
});

console.log(
	'writing build/index.html',
	process.env.REACT_APP_TAG,
	process.env.REACT_APP_SERVER_API
);
fs.writeFileSync('./build/index.html', newHtml);
