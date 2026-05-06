const fs = require('fs');
try {
  console.log('CWD:', process.cwd());
  console.log('Files:', fs.readdirSync('.').join(', '));
  fs.mkdirSync('dist', { recursive: true });
  fs.copyFileSync('index.html', 'dist/index.html');
  console.log('Build done');
} catch(e) {
  console.error('BUILD ERROR:', e.message);
  process.exit(1);
}
