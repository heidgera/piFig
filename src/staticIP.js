obtain(['fs', `${__dirname}/utils.js`], (fs, utils)=> {
  var writeDHCPConf = (ip)=> {
    utils.copyConfigFile(`${__dirname}/../configFiles/dhcpcd_staticIP.conf`,
                          '/etc/dhcpcd.conf',
                          { STATIC_IP: ip });
  };

  exports.configure = (cfgObj)=> {
    writeDHCPConf(cfgObj.staticIP);
  };

});
