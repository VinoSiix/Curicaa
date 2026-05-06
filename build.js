const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('hub-premium.html', 'dist/hub-premium.html');
