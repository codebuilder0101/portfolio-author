import { copyFileSync, readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const serverDir = 'dist/server';
const clientDir = 'dist/client';

if (!existsSync(serverDir)) {
  console.error(`ERROR: ${serverDir} not found after build.`);
  process.exit(1);
}

// 1. Copy server entry as _worker.js
const jsFiles = readdirSync(serverDir).filter(f => f.endsWith('.js') && !f.endsWith('.map'));
if (jsFiles.length === 0) {
  console.error(`ERROR: no .js files in ${serverDir}. Found: ${readdirSync(serverDir).join(', ')}`);
  process.exit(1);
}
const entryFile = jsFiles.includes('index.js') ? 'index.js' : jsFiles[0];
copyFileSync(join(serverDir, entryFile), join(clientDir, '_worker.js'));
console.log(`✓ Worker: ${serverDir}/${entryFile} → ${clientDir}/_worker.js`);

// 2. Copy server assets alongside client assets so Worker imports resolve
const serverAssetsDir = join(serverDir, 'assets');
const clientAssetsDir = join(clientDir, 'assets');
if (existsSync(serverAssetsDir)) {
  if (!existsSync(clientAssetsDir)) mkdirSync(clientAssetsDir, { recursive: true });
  let copied = 0;
  for (const file of readdirSync(serverAssetsDir)) {
    const dst = join(clientAssetsDir, file);
    if (!existsSync(dst)) {
      copyFileSync(join(serverAssetsDir, file), dst);
      copied++;
    }
  }
  console.log(`✓ Server assets → ${clientAssetsDir} (${copied} new files)`);
}

