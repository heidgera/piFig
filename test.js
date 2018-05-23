require('../common/src/muse/main.js');

obtain([`${__dirname}/src/driveWatch.js`], ({ monitor })=> {
  monitor.begin();

  monitor.on('connected', (which)=> {
    monitor.mount(which);
  });

  monitor.on('mounted', (which)=> {
    console.log('just mounted');
    console.log(which);
  });
});
