const fs = require('fs');
let c = fs.readFileSync('src/pages/HubPage.tsx', 'utf8');
c = c.replace(/\\r\\n/g, '\n');
c = c.replace(/\\"/g, '"');
fs.writeFileSync('src/pages/HubPage.tsx', c);
