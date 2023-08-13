import { ROOT_DIRECTORY } from './constants';
import { processDirectory } from './imageProcessor';

const customConfigurations = [
  // Your custom configurations go here...
];

processDirectory(ROOT_DIRECTORY, customConfigurations); // Now uses custom configurations
