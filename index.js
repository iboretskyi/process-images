import { ROOT_DIRECTORY as defaultRootDirectory } from './constants.js';
import { processDirectory } from './imageProcessor.js';

const customConfigurations = [
  // Your custom configurations go here...
];

processDirectory(defaultRootDirectory); // Now uses custom configurations
