import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import { isImageFile, getNewImagePath } from './utils';
import { ROOT_DIRECTORY, CONFIGURATIONS } from './constants';
import { Configuration } from './types';

export async function processDirectory(
  directory: string = ROOT_DIRECTORY,
  configurations: Configuration[] = CONFIGURATIONS
) {
  console.log(configurations[2]);
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(entryPath, configurations);
      } else if (entry.isFile() && isImageFile(entry.name)) {
        for (const config of configurations) {
          await processImage(entryPath, config);
        }
      }
    }
  } catch (err) {
    console.error(`❌ Error reading directory: ${err}`);
  }
}

export async function processImage(imagePath: string, config: Configuration) {
  try {
    const { width, height } = await sharp(imagePath).metadata();

    if (!(width && height)) return;

    const widthMatches = width === config.targetWidth || config.optionalTargetWidth.includes(width);
    const heightMatches = height === config.targetHeight || config.optionalTargetHeight.includes(height);

    if (widthMatches && heightMatches) {
      const newImagePath = getNewImagePath(imagePath, config.fileName);
      await fs.rename(imagePath, newImagePath);
      console.log('\x1b[32m%s\x1b[0m',`✔ Image '${imagePath}' renamed to '${newImagePath}'`);
    }
  } catch (err) {
    console.error(`❗ Error processing image: ${err}`);
  }
}
