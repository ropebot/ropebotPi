const mqtt = require('mqtt'),
// client = mqtt.connect('mqtt://localhost'),
// client = mqtt.connect('mqtt:// broker.hivemq.com'),
// client = mqtt.connect('mqtt://csyberpi.local'),
client = mqtt.connect('mqtt://ropebot.cseco.co.ke'),
ropebot = require(__dirname+"/src/ropebot.js");

client.on('connect', () => {
    console.log('connected')
  client.subscribe('ropebot/motor1')
  client.subscribe('ropebot/motor2')
  client.subscribe('ropebot/motor3')
  client.subscribe('ropebot/motors23')
  client.subscribe('ropebot/goto')
})

client.on('message', (topic, message) => {
    // console.log(message)
    let msg
    // if(message === 'false') {
    //     msg = false;
    // } else if (message === 'true') {
    //     msg = true;
    // } else msg = message;
    msg = message;
    console.log('data coming in...')
    // console.log(topic)
    // console.log(msg)
  switch (topic) {
    case 'ropebot/motor1':
        ropebot.motor1 = parseInt(msg)
         ropebot.processQueue();
        break;
    case 'ropebot/motor2':
        ropebot.motor2 = parseInt(msg)
         ropebot.processQueue();
        break;
    case 'ropebot/motor3':
        ropebot.motor3 = parseInt(msg)
         ropebot.processQueue();
        break;
    case 'ropebot/motors23':
        ropebot.motors23 = parseInt(msg)
        // ropebot.motor3 = parseInt(msg)
         ropebot.processQueue();
        break;
    case 'ropebot/goto':
        ropebot.goto = parseInt(msg)
         ropebot.processQueue();
        break;
    default:
    console.log('No handler for topic %s', topic)
  }
})