import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Create a favicon directory if it doesn't exist
const faviconDir = path.resolve('public/favicon');

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function generateFavicons() {
  await ensureDirectoryExists(faviconDir);
  
  // Source image path (you can change this to your actual image path)
  const sourceImagePath = path.resolve('src/assets/images/profilebeach.jpg');
  
  try {
    // Check if source image exists
    await fs.access(sourceImagePath);
    console.log(`Using source image: ${sourceImagePath}`);
    
    // Define sizes to generate
    const sizes = [16, 32, 48, 64, 192, 512];
    
    // Create rounded square favicons with transparent background
    for (const size of sizes) {
      const outputFilename = size === 180 
        ? 'apple-touch-icon.png' 
        : size >= 192 
          ? `android-chrome-${size}x${size}.png` 
          : `favicon-${size}x${size}.png`;
          
      const outputPath = path.join(faviconDir, outputFilename);
      
      // Create a rounded square icon
      await sharp(sourceImagePath)
        .resize(size, size, { fit: 'cover', position: 'center' })
        .composite([{
          input: Buffer.from(`<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${size/5}" ry="${size/5}" /></svg>`),
          blend: 'dest-in'
        }])
        .png()
        .toFile(outputPath);
        
      console.log(`Generated: ${outputPath}`);
    }
    
    // Create a specific apple-touch-icon (180x180)
    await sharp(sourceImagePath)
      .resize(180, 180, { fit: 'cover', position: 'center' })
      .composite([{
        input: Buffer.from(`<svg><rect x="0" y="0" width="180" height="180" rx="36" ry="36" /></svg>`),
        blend: 'dest-in'
      }])
      .png()
      .toFile(path.join(faviconDir, 'apple-touch-icon.png'));
    
    console.log('Generated: apple-touch-icon.png');
    
    // Create a favicon.ico file (combination of 16x16, 32x32 and 48x48)
    await sharp(sourceImagePath)
      .resize(32, 32, { fit: 'cover', position: 'center' })
      .composite([{
        input: Buffer.from(`<svg><rect x="0" y="0" width="32" height="32" rx="6" ry="6" /></svg>`),
        blend: 'dest-in'
      }])
      .toFormat('ico')
      .toFile(path.join('public', 'favicon.ico'));
    
    console.log('Generated: favicon.ico');
    
    console.log('All favicons generated successfully!');
    
  } catch (error) {
    console.error(`Error generating favicons:`, error);
    process.exit(1);
  }
}

generateFavicons().catch(console.error);