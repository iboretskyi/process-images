import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDirectory = './images';

const configurations = [
    {
        fileName: 'square_original',
        targetWidth: 1000,
        targetHeight: 1000,
    },
    {
        fileName: 'wide_original',
        targetWidth: 998,
        targetHeight: 804,
    },
    {
        fileName: 'main_original',
        targetWidth: 1000,
        targetHeight: 1388,
    },
];

async function processDirectory(directory) {
    try {
        const entries = await fs.readdir(directory, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                await processDirectory(entryPath);
            } else if (entry.isFile()) {
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


async function processImage(imagePath, config) {
    try {
        const { width, height } = await sharp(imagePath).metadata();

        if (width === config.targetWidth && height === config.targetHeight) {
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
