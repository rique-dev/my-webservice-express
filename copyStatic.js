const shell = require('shelljs');

shell.cp('-R', 'src/public', 'dist/public');
shell.cp('-R', 'node_modules/errorhandler/public', 'build/node_modules/errorhandler/public')
