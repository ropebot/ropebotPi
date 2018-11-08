const mqtt = require('mqtt'),
// client = mqtt.connect('mqtt://localhost')
// client = mqtt.connect('mqtt://csyberpi.local')
client = mqtt.connect('mqtt://ropebot.cseco.co.ke')

client.publish('ropebot/yz', 'true')