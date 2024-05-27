const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data/cities.json");
const middlewares = jsonServer.defaults({ static: "./build" });
// on Heroku port if defined or port 9000 by default
const port = process.env.PORT || 9000;

// assign values to the server
server.use(middlewares);
server.use(router);

// run json-server at target port
server.listen(port);
