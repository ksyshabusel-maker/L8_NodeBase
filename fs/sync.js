const fs = require('fs');
const path = require('path');

/** Запись в файл */
function writeFileSyncCustom(file, data) {
  fs.writeFileSync(file, data, 'utf-8');
}

/** Чтение из файла */
function readFileSyncCustom(file) {
  return fs.readFileSync(file, 'utf-8');
}

/** Полная замена содержимого файла */
function overwriteFileSync(file, data) {
  fs.writeFileSync(file, data, 'utf-8');
}

/** Очистка файла и удаление "шума" (цифр, заглавных букв) */
function cleanFileSync(file) {
  const text = fs.readFileSync(file, 'utf-8');
  const cleaned = text.replace(/\d/g, '').toLowerCase();
  fs.writeFileSync(file, cleaned, 'utf-8');
}

/** Копирование файла */
function copyFileSync(src, dest) {
  fs.copyFileSync(src, dest);
}

/** Создание папки */
function createFolderSync(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

/** Удаление папки */
function removeFolderSync(folder) {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
}

/** Вывод всех файлов в проекте, кроме служебных */
function listAllFilesSync(dir = '.', result = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      listAllFilesSync(fullPath, result);
    } else if (!['.env', '.env.development', '.env.production', '.env.domain'].includes(file)) {
      result.push(fullPath);
    }
  });
  return result;
}

/** Удаление всех файлов и папок, кроме служебных */
function clearProjectSync(dir = '.') {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    if (!['.env', '.env.development', '.env.production', '.env.domain', 'node_modules', '.git'].includes(item)) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
    }
  });
}

module.exports = {
  writeFileSyncCustom,
  readFileSyncCustom,
  overwriteFileSync,
  cleanFileSync,
  copyFileSync,
  createFolderSync,
  removeFolderSync,
  listAllFilesSync,
  clearProjectSync,
};
