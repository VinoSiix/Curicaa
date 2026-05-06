const fs = require('fs');
const path = require('path');
try {
  console.log('CWD:', process.cwd());
  console.log('Files:', fs.readdirSync('.').join(', '));
  fs.mkdirSync('dist', { recursive: true });
  fs.copyFileSync('hub-premium.html', 'dist/hub-premium.html');
  console.log('Done');
} catch(e) {
  console.error('BUILD ERROR:', e.message);
  process.exit(1);
}
