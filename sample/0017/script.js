
// Node.js では CommonJS 方式でモジュールを読み込むのがわかりやすい
const os = require('os');

// os モジュールを使って各種情報を取得
const info = {
    arch: os.arch(),
    cpus: os.cpus(),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    platform: os.platform(),
    release: os.release(),
    networkInterfaces: os.networkInterfaces(),
    homedir: os.homedir(),
    tmpdir: os.tmpdir(),
};

// そのままでは見づらいので整形した JSON で出力
console.log(JSON.stringify(info, null, '  '));

