require('../common/src/muse/main.js');

var obtains = [
  `${__dirname}/src/driveWatch.js`,
  'child_process',
  'fs',
];

obtain([`${__dirname}/src/driveWatch.js`], ({ monitor }, { execSync, exec }, fs)=> {
  monitor.begin();
  console.log('start drivewatch');

  monitor.on('connected', (which)=> {
    console.log(which.device);
    monitor.mount(which);
  });

  monitor.on('mounted', (which)=> {
    console.log('just mounted');

    if (fs.existsSync(`${which.mountpoints[0]}/update/update.js`)) {
      var update = require(`${which.mountpoints[0]}/update/update.js`);
      console.log(update);
    } else monitor.unmount(which);
  });
});
