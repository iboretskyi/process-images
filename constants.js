export const ROOT_DIRECTORY = './images';

export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tif', '.tiff'];

export const CONFIGURATIONS = [
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
    optionalTargetWidth: [],
    optionalTargetHeight: []
  },
  {
    fileName: 'main_original',
    targetWidth: 1000,
    targetHeight: 1388,
    optionalTargetWidth: [],
    optionalTargetHeight: []
  },
];
