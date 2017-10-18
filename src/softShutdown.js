obtain(['fs', './src/utils.js', 'child_process'], (fs, { copyConfigFile }, { exec })=> {

  exports.configure = (pin)=> {
    copyConfigFile('./configFiles/shutdownBlob.dts', 'newBlob.dts', { SHUTDOWN_PIN: pin });
    execSync('sudo dtc -I dts -O dtb -o /boot/dt-blob.bin newBlob.dts');
    console.log('Configured soft shutdown.');
  };

});
