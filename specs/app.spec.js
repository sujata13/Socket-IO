var expect = require("chai").expect,
  server = require("../src/app").server,
  io = require("socket.io-client"),
  ioOptions = {
    transports: ["websocket"],
    forceNew: true,
    reconnection: false
  },
  testMsg = "HelloWorld",
  sender,
  receiver;

describe("Chat Events #start_test", function() {
  beforeEach(function(done) {
    console.log(server);
    // start the io server
    server.on("listening", function() {
      console.log("HTTP listening:" + port);
    });
    // connect two io clients
    sender = io("http://localhost:3000/", ioOptions);
    receiver = io("http://localhost:3000/", ioOptions);

    // finish beforeEach setup
    done();
  });
  afterEach(function(done) {
    // disconnect io clients after each test
    sender.disconnect();
    receiver.disconnect();
    done();
    process.exit(0);
  });

  describe("Message Events", function() {
    it("Clients should receive a message when the `message` event is emited. #end_test", function(done) {
      sender.emit("chat_message", testMsg);
      receiver.on("new_message", function(msg) {
        expect(msg).to.equal(testMsg);
        done();
      });
    });
  });
});
