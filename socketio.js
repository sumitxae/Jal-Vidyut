const { resolveInclude } = require("ejs");
const { spawn }= require('child_process');

const io = require( "socket.io" )();
const socketapi = {
    io: io
};

function generateDynamicDecreasingValues(start, end, count) {
  const values = [start];

  while (values.length < count) {
    const nextValue = Math.max(values[values.length - 1] - Math.random() * ((start - end) / count), end);
    values.push(parseFloat(nextValue.toFixed(2)));
  }

  return values;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateValues() {
  while (true) {
    const values = generateDynamicDecreasingValues(5.0, 1.0, 6).concat(generateDynamicDecreasingValues(5.0, 1.0, 6));
    io.emit('randomValues', { values });
    await sleep(6000);
  }
}





// Add your socket.io logic here!
io.on( "connection", function( socket ) {
  console.log("A User Connected")
  
  generateValues();

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


// end of socket.io logic

module.exports = socketapi;