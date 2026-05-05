const fs = require('fs');
let c = fs.readFileSync('src/components/shared/SubjectModal.tsx', 'utf8');
c = c.replace(/\\r\\n/g, '\n');
c = c.replace(/\\n/g, '\n');
c = c.replace(/\\"/g, '"');
fs.writeFileSync('src/components/shared/SubjectModal.tsx', c);
