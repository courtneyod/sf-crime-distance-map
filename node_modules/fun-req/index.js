const brightness = require('brightness');
const roll = require('kik-roll');
const loudness = require('loudness');
const {snap, finish, error} = require('./lib/src/snap');
const wat = require('./lib/src/wat');

module.exports = {
  brightness,
  roll,
  loudness,
  snap,
  finish,
  error,
  wat
};
