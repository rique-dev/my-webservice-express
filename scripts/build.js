const shell = require('shelljs');

shell.cp('-R', 'pm2.json', 'build');
shell.cp('-R', 'Dockerfile', 'build');
shell.cp('-R', 'package.json', 'build');
shell.mkdir('build/server');
shell.mv('build/index.js', 'build/server/index.js');
shell.cp('-R', 'src/public', 'build/public');
