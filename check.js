import fs from 'fs/promises';
import path from 'path';
import ExcelJS from 'exceljs';

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function extractUniqueSegments(inputPath) {
  try {
    const data = await fs.readFile(inputPath, 'utf8');
    const jsonData = JSON.parse(data);
    const segments = new Set(jsonData.map(obj => obj.provider_title));
    return Array.from(segments);
  } catch (err) {
    console.error(`Error extracting segments from ${inputPath}:`, err);
    return [];
  }
}


async function filterJsonFile(inputPath, outputPath, segment) {
  if (!(await fileExists(inputPath))) {
    console.error(`File not found: ${inputPath}`);
    return;
  }

  try {
    console.log(inputPath, outputPath);

    const data = await fs.readFile(inputPath, 'utf8');
    const jsonData = JSON.parse(data);
    const filteredData = jsonData.filter(obj => obj.provider_title && obj.provider_title === segment);
    await fs.writeFile(outputPath, JSON.stringify(filteredData, null, 2));
    console.log(`Filtered data from ${path.basename(inputPath)} written to ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

async function findExclusiveObjects(data1, data2) {
  const data2ProviderTitles = new Set(data2.map(item => item.identifier));
  return data1.filter(item => !data2ProviderTitles.has(item.identifier));
}

async function writeDataToExcel(allData, filePath) {
  const workbook = new ExcelJS.Workbook();

  for (const [segment, data] of Object.entries(allData)) {
    const worksheet = workbook.addWorksheet(segment);
    worksheet.columns = [
      { header: 'Title', key: 'title', width: 100 },
      { header: 'Identifier', key: 'identifier', width: 100 },
      // Add more columns as needed
    ];
    worksheet.addRows(data);
  }

  await workbook.xlsx.writeFile(filePath);
  console.log(`Data successfully written to ${filePath}`);
}

async function processFiles(pathToSegments, files) {
  const segments = await extractUniqueSegments(pathToSegments);
  const allData = {};

  for (const segment of segments) {
    allData[segment] = [];

    for (const file of files) {
      const inputFilePath = `inputs/${file}.json`;
      const outputFilePath = `results/${file}-${segment}.json`;
      await filterJsonFile(inputFilePath, outputFilePath, segment);
    }

    const file1Path = `results/${files[0]}-${segment}.json`;
    const file2Path = `results/${files[1]}-${segment}.json`;
    const data1 = JSON.parse(await fs.readFile(file1Path, 'utf8'));
    const data2 = JSON.parse(await fs.readFile(file2Path, 'utf8'));

    allData[segment] = await findExclusiveObjects(data1, data2);
  }

  const excelOutputPath = 'results/consolidated-data.xlsx';
  await writeDataToExcel(allData, excelOutputPath);
}

const files = ['enabled', 'Result_2'];
const pathToSegments = 'inputs/enabled.json';
processFiles(pathToSegments, files);