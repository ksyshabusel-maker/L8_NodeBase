const os = require('os');

/**
 * Функция возвращает основную информацию об ОС
 */
function getOSInfo() {
  return {
    platform: os.platform(),
    freeMemoryGB: (os.freemem() / 1024 ** 3).toFixed(2),
    homeDirectory: os.homedir(),
    hostName: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
  };
}

/**
 * Проверяет, что свободной памяти больше 4GB
 */
function hasMoreThan4GBMemory() {
  const freeMemoryGB = os.freemem() / 1024 ** 3;
  return freeMemoryGB > 4;
}

/**
 * Выводит информацию об ОС ТОЛЬКО если MODE = admin
 */
function showOSInfoWithAccess() {
  if (process.env.MODE !== 'admin') {
    console.log('❌ Доступ запрещён. Недостаточно прав.');
    return;
  }

  console.log('✅ Доступ разрешён. Информация об ОС:');
  console.log(getOSInfo());
}

module.exports = {
  getOSInfo,
  hasMoreThan4GBMemory,
  showOSInfoWithAccess,
};
