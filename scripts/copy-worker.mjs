import { copyFileSync, readdirSync, existsSync } from 'fs';

const serverDir = 'dist/server';
const dest = 'dist/client/_worker.js';

if (!existsSync(serverDir)) {
  console.error(`ERROR: ${serverDir} not found after build.`);
  process.exit(1);
}

const jsFiles = readdirSync(serverDir).filter(f => f.endsWith('.js') && !f.endsWith('.map'));
if (jsFiles.length === 0) {
  console.error(`ERROR: no .js files in ${serverDir}. Found: ${readdirSync(serverDir).join(', ')}`);
  process.exit(1);
}

const filename = jsFiles.includes('server.js') ? 'server.js' : jsFiles[0];
copyFileSync(`${serverDir}/${filename}`, dest);
console.log(`✓ Worker ready: ${serverDir}/${filename} → ${dest}`);
