obtain(['fs', `${__dirname}/utils.js`, 'child_process'], (fs, { copyConfigFile }, { exec })=> {
  var writeInterfaceFile = ()=> {
    copyConfigFile(`${__dirname}/../configFiles/interfaces_wired`, '/etc/network/interfaces');
  };

  var writeHostsFile = (domainName)=> {
    copyConfigFile(`${__dirname}/../configFiles/hosts`, '/etc/hosts', { DOMAIN_NAME: domainName });
  };

  var writeDhcpcdConfFile = ()=> {
    copyConfigFile(`${__dirname}/../configFiles/dhcpcd_wired.conf`, '/etc/dhcpcd.conf');
  };

  var writeDnsmasqConfFile = (domainName)=> {
    copyConfigFile(`${__dirname}/../configFiles/dnsmasq_wired.conf`, '/etc/dnsmasq.conf', { DOMAIN_NAME: domainName });
  };

  exports.configure = (cfgObj)=> {
    if (cfgObj.domainName) {
      writeInterfaceFile();
      writeHostsFile(cfgObj.domainName);
      writeDhcpcdConfFile();
      writeDnsmasqConfFile(cfgObj.domainName);
    } else console.error('Error: Password must be 8 or more characters');
  };
});
