export const ROOT_DIRECTORY = './images';

export const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.tif', '.tiff'];

export const CONFIGURATIONS = [
  {
    fileName: 'main_square',
    targetWidth: 1000,
    targetHeight: 1000,
    optionalTargetWidth: [],  // Empty array indicates no optional widths
    optionalTargetHeight: []  // Empty array indicates no optional heights
  },
  {
    fileName: 'main_wide',
    targetWidth: 998,
    targetHeight: 804,
    optionalTargetWidth: [1000, 1001],
    optionalTargetHeight: [806, 807]
  },
  {
    fileName: 'main_original',
    targetWidth: 1000,
    targetHeight: 1388,
    optionalTargetWidth: [1001],
    optionalTargetHeight: []
  },
];
