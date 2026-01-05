require('dotenv').config();
const fsModule = require('./fs'); // модуль работы с файлами
const sortStrings = require('./modules/sortStrings'); // модуль сортировки строк

// Исправленный fetch для Node.js v22 + CommonJS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

(async () => {
  try {
    // 1Загружаем пользователей с JSONPlaceholder
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    // 2 Берём имена и emails
    const names = users.map(u => u.name);
    const emails = users.map(u => u.email);

    // 3Сортируем имена
    const sortedNames = sortStrings(names);

    // 4Создаём папку users
    fsModule.createFolderSync('./users');

    // 5 Записываем данные в файлы
    fsModule.writeFileSyncCustom('./users/names.txt', sortedNames.join('\n'));
    fsModule.writeFileSyncCustom('./users/emails.txt', emails.join('\n'));

    console.log('Пользователи загружены, папка и файлы созданы!');

    // 6Читаем файлы и выводим содержимое для проверки
    console.log('Содержимое names.txt:');
    console.log(fsModule.readFileSyncCustom('./users/names.txt'));

    console.log('Содержимое emails.txt:');
    console.log(fsModule.readFileSyncCustom('./users/emails.txt'));

  } catch (err) {
    console.error('Ошибка:', err);
  }
})();
