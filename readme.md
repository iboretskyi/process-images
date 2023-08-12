# Image Renaming Utility 📸💼

A tailor-made utility designed for specific whims and needs, aiming to search through directories, identify, and then rename image files based on pre-defined configurations.

## 🌟 Features 
- **Recursive Directory Search**: No folder is too hidden; it dives deep!
- **Flexible Rules**: Define naming conventions and sizes with ease.
- **Variety of Image Formats**: Covers a broad spectrum from JPEG to WEBP.

## ⚙️ How It Operates 
1. Define your configurations in terms of `fileName`, `targetWidth`, `targetHeight`, and the optional sizes.
2. Point the script to your starting directory using `rootDirectory`.
3. Execute and witness the transformation!

## 🔧 Sample Configuration 
```javascript
const configurations = [
    {
        fileName: 'square_original',
        targetWidth: 1000,
        targetHeight: 1000,
        optionalTargetWidth: [],
        optionalTargetHeight: []
    },
    ...
];

## 📦 Required Dependencies 
- **sharp**: This powerful library enables the processing and extraction of metadata from images.

## 🚀 Usage Guide 
1. Clone the repository to your local machine.
2. Ensure the `sharp` library is properly installed.
3. Adjust the `configurations` and the `rootDirectory` as per your specifications.
4. Run the script and watch it perform its magic!
