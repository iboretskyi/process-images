import { ROOT_DIRECTORY as defaultRootDirectory } from './constants';
import { processDirectory } from './imageProcessor';
import { Configuration } from './types';

const customConfigurations: Configuration[] = [
  // Your custom configurations go here...
];

const rootDirectory = process.argv[2] || defaultRootDirectory;

console.log(`Using directory: ${rootDirectory}`);

processDirectory(rootDirectory); // Now uses custom configurations
