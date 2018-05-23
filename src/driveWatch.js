if (!window) var window = global;

var obtains = [
  'drivelist',
  'µ//events.js',
  'child_process',
  //'node-usb-detection',
];

obtain(obtains, (drivelist, { Emitter }, { exec, execSync })=> {
  if (!window.usbMonitor) {
    class Monitor extends Emitter {
      constructor() {
        super();

        this.drives = [];
      }

      begin() {
        var _this = this;
        this.interval = setInterval(()=> {
          drivelist.list((error, drives) => {
            if (error) {
              throw error;
            }

            var usb = drives.filter(drive=>drive.isUSB);
            usb.forEach((drive, ind, arr)=> {
              let exists = this.drives.find(drv=>drv.device == drive.device);
              if (!exists) {
                this.emit('connected', drive);
                if (drive.mountpoints.length) this.emit('mounted', drive);
              } else {
                if (exists && exists.mountpoints.length && !drive.mountpoints.length) {
                  this.emit('mounted', drive);
                }
              }
            });

            _this.drives = usb;
          });
        }, 1000);
      }

      mount(drive) {

        console.log(list[1]);
        if (process.platform == 'linux') {
          //get the label in capture[1], UUID in capture[2], and type in 3
          var match = /[^:]+: LABEL="([^"]+)" UUID="([^"]+)" TYPE="([^"]+)"/g;
          var list = match.exec(execSync(`sudo blkid ${drive.device}`));
          execSync(`sudo mkdir /mnt/${list[2]}`);
          exec(`sudo mount -t ${list[3]} ${drive.device} /mnt/${list[2]}`, (err, stdout, stderr)=> {
            console.log(`mounted ${list[1]}`);
          });
        }
      }
    }
    window.usbMonitor = new Monitor();
  }

  exports.monitor = window.usbMonitor;

});
