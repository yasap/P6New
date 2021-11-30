const http = require("http");
const app = require("./app");
var server = http.createServer(app);
server.listen(3000, function () {
    console.log("listening of port3000")
})
