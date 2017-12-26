obtain(['fs', `${__dirname}/utils.js`], (fs, utils)=> {
  var writeWPASupplicant = (ssid, pass)=> {
    utils.copyConfigFile(`${__dirname}/configFiles/wpa_supplicant_default.conf`,
                          '/etc/wpa_supplicant/wpa_supplicant.conf',
                          { SSID: ssid, PASSWORD: pass });
  };

  exports.configure = (cfgObj)=> {
    writeWPASupplicant(cfgObj.ssid, cfgObj.password);
  };

});
