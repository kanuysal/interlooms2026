import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const fontBase64 = fs.readFileSync('public/Prisma.woff2').toString('base64');

// Render SVG with letter O using Prisma font
const svgFavicon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'PrismaFont';
        src: url(data:font/woff2;charset=utf-8;base64,${fontBase64}) format('woff2');
      }
      .bg { fill: #f5efeb; }
      .letter {
        font-family: 'PrismaFont', sans-serif;
        font-size: 380px;
        fill: #1a1915;
        text-anchor: middle;
        dominant-baseline: central;
      }
    </style>
  </defs>
  <rect width="512" height="512" rx="96" class="bg" />
  <text x="256" y="270" class="letter">O</text>
</svg>
`;

fs.writeFileSync('public/favicon.svg', svgFavicon);

await Promise.all([
  sharp(Buffer.from(svgFavicon)).resize(32, 32).png().toFile('public/favicon-32.png'),
  sharp(Buffer.from(svgFavicon)).resize(16, 16).png().toFile('public/favicon-16.png'),
  sharp(Buffer.from(svgFavicon)).resize(180, 180).png().toFile('public/apple-touch-icon.png'),
  sharp(Buffer.from(svgFavicon)).resize(192, 192).png().toFile('public/icon-192.png'),
  sharp(Buffer.from(svgFavicon)).resize(512, 512).png().toFile('public/icon-512.png')
]);

console.log('Favicon letter O generated successfully from Prisma font!');
