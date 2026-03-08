const fs = require('fs');
const content = fs.readFileSync('src/data/events.ts', 'utf8');
const images = [...content.matchAll(/image:\s*['"](.*?)['"]/g)].map(m => m[1]);
const missing = [];
images.forEach(img => {
    const p = 'public' + decodeURIComponent(img);
    if (!fs.existsSync(p)) missing.push(img);
});
console.log('MISSING:', missing);
