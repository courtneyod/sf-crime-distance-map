const {cap,gif,fs,uploader,del,wall,error} = require('./requirements');

const dir = '/tmp/snaps';
let dirEnsured = false;
let count = 0;
let wait = {};

let when = new Promise((resolve, reject) => {
  wait = {resolve, reject};
});

function snap() {
  if(!dirEnsured) {
    return fs.ensureDir(dir, () => {
      dirEnsured = true;
      snap();
    });
  }

  cap(`${dir}/image${count}.png`, { cliflags: '-w 1'}, (err) => {
    count++;
    if(count < 10 && !wait.begin) {
      snap();
    } else if (!wait.begin) {
      finish();
    }
  });
}

function finish() {
  if(!wait.begin) {
    count = 11;
    wait.begin = true;
    return create()
      .then(upload)
      .then(wall)
      .then(clean)
      .then(wait.resolve)
      .catch(wait.reject);
  } else {
    return when;
  }

}

function create() {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) return reject(err);
      try {
        files = files
          .filter(f => f.substr(-3, 3) == 'png')
          .map(f => `${dir}/${f}`);

        const output = `${dir}/output.gif`;

        gif(files, output, {
          repeat: true,
          fps: 4,
          quality: 10
        }).then(() => {
          resolve(output);
        }).catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  });
}

function upload(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, function(error, buffer) {
      uploader(buffer)
        .then(resolve)
        .catch(reject);
    });
  });
}

function clean() {
  return del([`${dir}/*.png`, `${dir}/output.gif`], {force: true});
}

module.exports = {
  snap,
  finish,
  error
};
