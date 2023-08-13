import path from 'path';
import { IMAGE_EXTENSIONS as imageExtensions } from './constants.js';

/**
 * Determines if the provided file name is an image based on its extension.
 *
 * @param {string} fileName - The name of the file to check.
 * @returns {boolean} - Returns true if the file is an image, false otherwise.
 */
export function isImageFile(fileName) {
  const lowercasedName = fileName.toLowerCase();
  return imageExtensions.some(ext => lowercasedName.endsWith(ext));
}

export function getNewImagePath(imagePath, configFileName) {
  const fileExtension = path.extname(imagePath);
  return path.join(path.dirname(imagePath), `${configFileName}${fileExtension}`);
}
