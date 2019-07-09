const fs = require('fs-extra');

fs.copySync('./src', './tmp');
fs.copySync(process.env.CUSTOMISATIONS_DIR, './tmp/public');
