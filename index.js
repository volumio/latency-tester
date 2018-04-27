const io = require('socket.io-client');
const fs = require('fs-extra');

try {
  let endpointConf = fs.readJsonSync(__dirname + '/endpoint.json');
  let endpoint = endpointConf.endpoint;
  if (endpoint.length === 0) {
    exitOnError()
  } else {
    pinger(endpoint)
  }
  } catch(e) {
  exitOnError()
}

function pinger(endpoint) {
  const socket = io.connect(endpoint);

  socket.on('connect', function(){
    console.log('Connected');

    setInterval(()=>{
      var start =  Date.now();
      socket.emit('pinger', start);
    },1000)
  })

  socket.on('ponger', function(data) {
    latency = Date.now() - data;
    console.log(latency);
  });
}

function exitOnError() {
  console.log('Please specify a valid endpoint in endpoint.json file');
  process.exit(0);
}
