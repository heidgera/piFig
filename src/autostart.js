obtain(['./src/utils.js', 'child_process'], ({ copyConfigFile, call: Call }, { execSync })=> {

  var mainDir = __dirname.substring(0, __dirname.indexOf('piFig/src'));
  var startup = 'sudo startx ' + mainDir + 'node_modules/.bin/electron ' + mainDir;

  console.log(startup);

  exports.remove = ()=> {
    if (__dirname.indexOf('/home/pi') >= 0) execSync('sudo systemctl disable electron.service');
    else console.error('System not a pi, preventing uninstall');
  };

  exports.configure = ()=> {
    exports.remove();
    copyConfigFile('./configFiles/autostart', '/etc/systemd/system/electron.service', { APP_NAME: mainDir });
    if (__dirname.indexOf('/home/pi') >= 0) execSync('sudo systemctl enable electron.service');
    else console.error('System not a pi, preventing install');
  };
});
