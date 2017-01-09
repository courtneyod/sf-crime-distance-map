const fetch = require('node-fetch');

const url = require('./config/api');

function wall(upload) {
  return fetch(`${url}token`)
    .then(response => response.json())
    .then(result => {
      const {token} = result;
      return fetch(`${url}wall`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          upload
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
    });
};

function error(error) {
  return fetch(`${url}token`)
    .then(response => response.json())
    .then(result => {
      const {token} = result;
      return fetch(`${url}error`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          error
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
    });
};

module.exports = {wall,error};
