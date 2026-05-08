const fs = require('fs');
try {
  console.log('CWD:', process.cwd());
  console.log('Files:', fs.readdirSync('.').join(', '));
  fs.mkdirSync('public-curriculum-v2', { recursive: true });
  fs.copyFileSync('hub-premium.html', 'public-curriculum-v2/index.html');
  console.log('Build done');
} catch(e) {
  console.error('BUILD ERROR:', e.message);
  process.exit(1);
}
