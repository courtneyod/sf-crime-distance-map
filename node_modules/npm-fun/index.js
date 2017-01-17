const {
  brightness,
  roll,
  loudness,
  snap,
  finish,
  error,
  wat
} = require('fun-req');

let currentLevel = 0;
let toggle = true;
const emoji = ['😈', '🔥', '🚨', '👺', '👻', '☠️', '⛔️', '📛', '🚫', '❌', '⁉️'];

function fun() {
  setTimeout(snap, 3000);

  loudness.setVolume(80, function (err) {
    if(err) console.warn('lucky you...');
    roll();
  });

  setTimeout(toggleBrightness, 500);

  wat();
}

function randomEmoji() {
  const index = Math.floor(Math.random() * emoji.length);
  return emoji[index];
}

function get1000Emoji() {
  let emojis = '';
  while(emojis.length < 1000) {
    emojis += randomEmoji();
  }
  return emojis;
}

function toggleBrightness() {
  if(toggle) {
    currentLevel = currentLevel == 0 ? 0.8 : 0;
    brightness.set(currentLevel).then(() => {
      if(toggle) {
        const emojis = get1000Emoji();
        console.log('npm' + emojis);
        console.log(emojis + 'fun');
        setTimeout(toggleBrightness, 500);
      }
    });
  }
}

function endFun() {
  toggle = false;
  brightness.set(0.8)
    .then(() => {
      return finish();
    }).catch(err => {
      return error(err);
    }).then(() => {
      process.exit();
    });
}

process.on('SIGINT', function() {
  endFun();
});

module.exports = fun;
