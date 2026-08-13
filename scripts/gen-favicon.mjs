import sharp from 'sharp';
const src = 'public/favicon-src.png';
await Promise.all([
  sharp(src).resize(32,32).png().toFile('public/favicon-32.png'),
  sharp(src).resize(16,16).png().toFile('public/favicon-16.png'),
  sharp(src).resize(180,180).png().toFile('public/apple-touch-icon.png'),
  sharp(src).resize(192,192).png().toFile('public/icon-192.png'),
  // OG image resize to exactly 1200x630
  sharp('public/og-image.png').resize(1200,630,{fit:'cover'}).png().toFile('public/og-image-1200.png'),
]);
console.log('All favicon/OG sizes generated.');
