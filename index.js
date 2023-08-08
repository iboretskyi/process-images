import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDirectory = './images/bsg';

const configurations = [
    {
        fileName: 'square_original',
        targetWidth: 1000,
        targetHeight: 1000,
        optionalTargetWidth: [],  // Empty array indicates no optional widths
        optionalTargetHeight: []  // Empty array indicates no optional heights
    },
    {
        fileName: 'wide_original',
        targetWidth: 998,
        targetHeight: 804,
        optionalTargetWidth: [1000],
        optionalTargetHeight: [806]
    },
    {
        fileName: 'main_original',
        targetWidth: 1000,
        targetHeight: 1388,
        optionalTargetWidth: [1001],
        optionalTargetHeight: [1389]
    },
];

/**
 * Processes a directory recursively to find and rename image files based on configurations.
 *
 * @param {string} directory - The path to the directory that needs to be processed.
 * @returns {void}
 */
async function processDirectory(directory) {
    try {
        const entries = await fs.readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                await processDirectory(entryPath);
            } else if (entry.isFile() && isImageFile(entry.name)) {
                for (const config of configurations) {
                    try {
                        await fs.access(entryPath);
                        await processImage(entryPath, config);
                    } catch (err) {
                        if (err.code !== 'ENOENT') {
                            console.error(`Error processing image: ${err}`);
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory: ${err}`);
    }
}

/**
 * Determines if the provided file name is an image based on its extension.
 *
 * @param {string} fileName - The name of the file to check.
 * @returns {boolean} - Returns true if the file is an image, false otherwise.
 */
function isImageFile(fileName) {
  const lowercasedName = fileName.toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tif', '.tiff'];
  return imageExtensions.some(ext => lowercasedName.endsWith(ext));
}

/**
 * Processes an image file to potentially rename it based on configurations.
 * 
 * @param {string} imagePath - The path to the image file.
 * @param {object} config - The configuration object used to determine renaming.
 * @param {string} config.fileName - The target file name.
 * @param {number} config.targetWidth - The target width of the image.
 * @param {number} config.targetHeight - The target height of the image.
 * @param {number[]} [config.optionalTargetWidth=[]] - Optional widths that are also acceptable.
 * @param {number[]} [config.optionalTargetHeight=[]] - Optional heights that are also acceptable.
 * @returns {void}
 */
async function processImage(imagePath, config) {
  try {
      const { width, height } = await sharp(imagePath).metadata();

      const widthMatches = width === config.targetWidth || config.optionalTargetWidth.includes(width);
      const heightMatches = height === config.targetHeight || config.optionalTargetHeight.includes(height);

      if (widthMatches && heightMatches) {
          const fileExtension = path.extname(imagePath);
          const newFileName = `${config.fileName}${fileExtension}`;
          const newImagePath = path.join(path.dirname(imagePath), newFileName);
          await fs.rename(imagePath, newImagePath);
          console.log(`Image '${imagePath}' renamed to '${newImagePath}'`);
      }
  } catch (err) {
      console.error(`Error processing image: ${err}`);
  }
}

processDirectory(rootDirectory);
