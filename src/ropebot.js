const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 115200
  }); // assume it does not change
class ropebot {

    constructor () {
        let self = this;
        self.x = false;
        self.y = false;
        self.z = false;
        self.goto = false;
    }

    async processQueue() {
        console.log('processing..')
        let self = this
        // console.log(`sending x: ${self.x}`)
        // console.log(`sending y: ${self.y}`)
        // console.log(`sending z: ${self.z}`)
        // console.log(`sending goto: ${self.goto}`)

        //mov x and y independently
        let command;

        // moving x
        command = `MOV,${Math.abs(self.motor1) || 0},${self.motor1/Math.abs(self.motor1) || 0},0,0\n\r`
        // console.log(command)
        // port.write('MOV,11300,-1,0,0');
        // port.write(command, function(err) {
        //     if (err) {
        //       return console.log('Error on write: ', err.message);
        //     }
        //     console.log(command);
        // });
        // send that command
        // wait
        let command1 = `MOV,${Math.abs(self.motors23) || 0},0,${self.motors23/Math.abs(self.motors23) || 0},${self.motors23/Math.abs(self.motors23) || 0}\n\r`
        // console.log(command)
        if(self.motor1 === 0) command = command1;
        port.write(command, function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            console.log(command);
            if(self.motor1 === 0)self.motors23 = 0;
            else self.motor1 = 0
        });
        // setTimeout(function(){
        //     port.write(command1, function(err) {
        //         if (err) {
        //         return console.log('Error on write: ', err.message);
        //         }
        //         console.log(command1);
        //     });
        //     self.motor1 = 0
        //     self.motors23 = 0
        // },3000);
    }
}

port.on('error', function(err) {
    console.log('Error: ', err.message);
})
port.on('data', function (data) {
    console.log('Data:', data);
  });

module.exports = new ropebot