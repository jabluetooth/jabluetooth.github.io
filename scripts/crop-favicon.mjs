import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '../src/components/image/IgniteLogo.png');
const outputPath = path.join(__dirname, '../public/favicon.png');

async function cropAndResize() {
  try {
    // First, trim whitespace and get the trimmed image
    const trimmed = await sharp(inputPath)
      .trim()  // Remove whitespace
      .toBuffer();

    // Get metadata of trimmed image
    const metadata = await sharp(trimmed).metadata();
    console.log(`Trimmed size: ${metadata.width}x${metadata.height}`);

    // Make it square by using the larger dimension
    const size = Math.max(metadata.width, metadata.height);

    // Extend to square with transparent background, then resize to 128x128
    await sharp(trimmed)
      .extend({
        top: Math.floor((size - metadata.height) / 2),
        bottom: Math.ceil((size - metadata.height) / 2),
        left: Math.floor((size - metadata.width) / 2),
        right: Math.ceil((size - metadata.width) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outputPath);

    console.log(`Favicon created at: ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

cropAndResize();
