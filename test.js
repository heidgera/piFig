require('../common/src/muse/main.js');

obtain([`${__dirname}/src/driveWatch.js`], ({ monitor })=> {
  monitor.begin();
  console.log('start drivewatch');

  monitor.on('connected', (which)=> {
    console.log(which.device);
    monitor.mount(which);
  });

  monitor.on('mounted', (which)=> {
    console.log('just mounted');
    console.log(which);
  });
});
