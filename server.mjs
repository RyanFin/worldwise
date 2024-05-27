// server.mjs
import jsonServer from "json-server";
import express from "express";
import path from "path";

const app = express();
const router = jsonServer.router(path.join(__dirname, "data", "cities.json"));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 9000;

app.use(middlewares);
app.use(router);

app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
