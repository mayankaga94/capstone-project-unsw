var zmq = require('zeromq');

// Socket to talk to server
console.log("Connecting to recommender server…");
var requester = zmq.socket('req');
requester.connect("tcp://localhost:5555");

// Handle replies received
requester.on("message", function(reply) {
  console.log("Received reply", reply.toString());
});

// Example requests
for (var i = 0; i < 10; i++) {
  console.log("Sending request", i, '…');
  requester.send('{"book_ids": [1, 2], "tag_ids": [100], "count": 5}');
}

// Close client when ctrl+c pressed
process.on('SIGINT', function() {
  console.log("Client closed.")
  requester.close();
  process.exit(0);
});