const sync = require('./sync');
const asyncFs = require('./async');

module.exports = {
  ...sync,
  ...asyncFs,
};
