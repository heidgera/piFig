var obs = [
  './src/hotspot.js',
   './src/wifi.js',
   './src/softShutdown.js',
   '/boot/piConfig.js',
   './src/createService.js',
   'fs',
];

obtain(obs, (hotspot, wifi, soft, { config }, services, fs)=> {
  var pfg = config.piFig;
  if (pfg) {
    var confDir = './currentConfig.json';
    let curCfg = {};
    if (fs.existsSync(confDir)) {
      let data = fs.readFileSync(confDir); //file exists, get the contents
      curCfg = JSON.parse(data);
    }

    function configsMatch(cur, cfg) {
      if (!cur) return false;
      else {
        let ret = true;
        for (key in cfg) {
          if (cfg.hasOwnProperty(key)) {
            if (!cur[key] || cur[key] != cfg[key]) ret = false;
          }
        }

        return ret;
      }
    }

    var serviceFolder = __dirname.substring(0, __dirname.indexOf('/src')) + '/services';
    var mainDir = __dirname.substring(0, __dirname.indexOf('/piFig/src'));

    if (pfg.wifiHotspot && !configsMatch(curCfg.wifiHotspot, pfg.wifiHotspot)) {
      console.log('Configuring wifi hotspot...');
      hotspot.configure(pfg.wifiHotspot);
      curCfg.wifiHotspot = pfg.wifiHotspot;
    }

    if (pfg.wifi && !configsMatch(curCfg.wifi, pfg.wifi)) {
      console.log('Configuring wifi...');
      wifi.configure(pfg.wifi);
      curCfg.wifi = pfg.wifi;
    }

    if (!configsMatch(curCfg.autostart, pfg.autostart)) {
      console.log('Configuring autostart...');
      if (pfg.autostart) services.configure(
        'electron',
        'Autostart main application',
        `/usr/bin/startx ${mainDir}/node_modules/.bin/electron ${mainDir}`
      );
      else services.disable('electron');
      curCfg.autostart = pfg.autostart;
    }

    if (!configsMatch(curCfg.softShutdown, pfg.softShutdown)) {
      if (pfg.softShutdown) {
        var shtd = pfg.softShutdown;
        soft.configure(shtd.controlPin);
        services.configure('powerCheck',
          'Control soft shutdown',
          `/usr/bin/node ${serviceFolder}/powerCheck.js ${shtd.monitorPin} ${shtd.delayTime}`
        );
      } else {
        services.disable('powerCheck');
      }

      curCfg.softShutdown = pfg.softShutdown;
    }

    if (!configsMatch(curCfg.gitWatch, pfg.gitWatch)) {
      if (pfg.gitWatch) services.configure(
        'gitTrack',
        'Autotrack git repo',
        `/usr/bin/node ${serviceFolder}/gitCheck.js ${mainDir}`
      );
      else services.disable('gitTrack');

      curCfg.gitWatch = pfg.gitWatch;
    }

    fs.writeFileSync(confDir, JSON.stringify(curCfg));
  }
});
