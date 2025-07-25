import * as fs from 'fs';
import * as path from 'path';

const INDEX_FILE_NAME = 'index.ts';

const makeIndex = async (directory: string) => {
  const dirPath = path.join(__dirname, '..', directory);
  console.log(`Making index file in ${directory}`);

  const files = fs.readdirSync(dirPath).filter((file) => file !== INDEX_FILE_NAME);
  console.log(`Found ${files.length} ${files.length > 1 ? 'files' : 'file'}`);

  if (!files.length) return;

  const indexFileContent = files.map((file) => `export * from './${file.replace(/\.ts$/g, '')}';`).join('\n');
  const indexPath = path.join(__dirname, '..', directory, INDEX_FILE_NAME);
  console.log(`Writing to file ${directory}/index.ts`);

  fs.writeFileSync(indexPath, indexFileContent.concat('\n'), { flag: 'w' });
};

const paths = [
  'src/rdb/entities',
  'src/rdb/repositories',
  'src/util',
  'src/users/dto',
  'src/auth',
  'src/auth/constants',
  'src/auth/decorators',
  'src/auth/dto',
  'src/auth/guards',
  'src/auth/strategies',
  'src/creator-profiles',
  'src/creator-profiles/dto',
  'src/fan-profiles/dto',
  'src/fan-profiles',
  'src/posts',
  'src/posts/dto',
  'src/uploads',
  'src/users',
  'src/assets',
  'src/assets/dto',
  'src/messages',
  'src/post-comments',
  'src/post-comments/dto',
  'src/message-channel-participants',
  'src/message-channel-participants/dto',
];

(async () => {
  for (const path of paths) await makeIndex(path);
})();
