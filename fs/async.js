const fs = require('fs').promises;
const path = require('path');

/** Запись в файл */
async function writeFileAsync(file, data) {
  await fs.writeFile(file, data, 'utf-8');
}

/** Чтение из файла */
async function readFileAsync(file) {
  return await fs.readFile(file, 'utf-8');
}

/** Полная замена содержимого файла */
async function overwriteFileAsync(file, data) {
  await fs.writeFile(file, data, 'utf-8');
}

/** Очистка файла и удаление "шума" */
async function cleanFileAsync(file) {
  const text = await fs.readFile(file, 'utf-8');
  const cleaned = text.replace(/\d/g, '').toLowerCase();
  await fs.writeFile(file, cleaned, 'utf-8');
}

/** Копирование файла */
async function copyFileAsync(src, dest) {
  await fs.copyFile(src, dest);
}

/** Создание папки */
async function createFolderAsync(folder) {
  try {
    await fs.mkdir(folder, { recursive: true });
  } catch (err) {
    console.log('Ошибка создания папки:', err);
  }
}

/** Удаление папки */
async function removeFolderAsync(folder) {
  try {
    await fs.rm(folder, { recursive: true, force: true });
  } catch (err) {
    console.log('Ошибка удаления папки:', err);
  }
}

/** Вывод всех файлов в проекте, кроме служебных */
async function listAllFilesAsync(dir = '.', result = []) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await listAllFilesAsync(fullPath, result);
    } else if (!['.env', '.env.development', '.env.production', '.env.domain'].includes(file)) {
      result.push(fullPath);
    }
  }
  return result;
}

/** Удаление всех файлов и папок, кроме служебных */
async function clearProjectAsync(dir = '.') {
  const items = await fs.readdir(dir);
  for (const item of items) {
    if (!['.env', '.env.development', '.env.production', '.env.domain', 'node_modules', '.git'].includes(item)) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await fs.rm(fullPath, { recursive: true, force: true });
      } else {
        await fs.unlink(fullPath);
      }
    }
  }
}

module.exports = {
  writeFileAsync,
  readFileAsync,
  overwriteFileAsync,
  cleanFileAsync,
  copyFileAsync,
  createFolderAsync,
  removeFolderAsync,
  listAllFilesAsync,
  clearProjectAsync,
};
