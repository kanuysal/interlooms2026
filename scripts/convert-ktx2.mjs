/**
 * convert-ktx2.mjs
 * Her fields klasöründeki ktx1.jpg ve ktx2.jpg dosyalarını
 * Basis Universal (ETC1S) ile 1.ktx2 ve 2.ktx2 olarak kaydeder.
 * 
 * Kullanım: node scripts/convert-ktx2.mjs
 */

import { writeFileSync, readdirSync, statSync, readFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

// Dynamic ESM imports
const sharp = (await import('sharp')).default;

// ktx2-encoder uses ESM — import directly
const { NodeBasisEncoder } = await import('../node_modules/ktx2-encoder/dist/node/index.js');

const FIELDS_DIR = join(ROOT, 'public', 'fields');

const PAIRS = [
  { src: 'ktx1.jpg', dest: '1.ktx2' },
  { src: 'ktx2.jpg', dest: '2.ktx2' },
];

/**
 * sharp ile JPEG'i RGBA image data'ya çeviren imageDecoder fonksiyonu.
 * ktx2-encoder bunu encode sırasında çağırır.
 */
function makeImageDecoder() {
  return async (buffer) => {
    const { data, info } = await sharp(Buffer.from(buffer))
      .resize(1024, 1024, { fit: 'cover', position: 'center' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return {
      data: new Uint8ClampedArray(data.buffer),
      width:  info.width,
      height: info.height,
    };
  };
}

async function convertFile(srcPath, destPath, encoder) {
  const label = `${srcPath.split(/[/\\]/).slice(-2).join('/')}`;
  const jpgBuffer = readFileSync(srcPath);

  const ktx2Buffer = await encoder.encode(jpgBuffer, {
    imageDecoder:   makeImageDecoder(),
    uastc:          false,   // ETC1S (daha küçük, iyi uyumluluk)
    qualityLevel:   200,     // 1–255
    compressionLevel: 2,     // ETC1S: 0–6
    generateMipmap: true,
    srgb:           true,
  });

  writeFileSync(destPath, Buffer.from(ktx2Buffer));

  const kbIn  = Math.round(jpgBuffer.length / 1024);
  const kbOut = Math.round(ktx2Buffer.byteLength / 1024);
  console.log(`  ✓ ${label} → ${kbIn}KB → ${kbOut}KB`);
}

async function main() {
  console.log('🔄 KTX2 Dönüşüm Başlıyor...\n');

  const encoder = new NodeBasisEncoder();
  await encoder.init(); // WASM yükle

  const folders = readdirSync(FIELDS_DIR)
    .filter(f => statSync(join(FIELDS_DIR, f)).isDirectory())
    .sort();

  let ok = 0, skip = 0;

  for (const folder of folders) {
    const folderPath = join(FIELDS_DIR, folder);
    console.log(`📁 ${folder}`);

    for (const { src, dest } of PAIRS) {
      const srcPath  = join(folderPath, src);
      const destPath = join(folderPath, dest);

      try {
        statSync(srcPath); // var mı kontrol
        await convertFile(srcPath, destPath, encoder);
        ok++;
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`  ⚠ ${src} bulunamadı, atlandı`);
          skip++;
        } else {
          console.error(`  ✗ HATA (${src}): ${err.message}`);
          skip++;
        }
      }
    }
    console.log();
  }

  console.log(`✅ Tamamlandı: ${ok} dönüştürüldü, ${skip} atlandı`);
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
