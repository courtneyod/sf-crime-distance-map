const fs = require('fs');
const opn = require('opn');

module.exports = function() {
  fs.readdir(__dirname + '/images', (err, files) => {
    files.forEach(file => {
      opn(`${__dirname}/images/${file}`);
    });
  });
};
