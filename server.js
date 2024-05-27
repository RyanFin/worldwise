import path from "path";
import jsonServer from "json-server";
const { create, defaults, router } = jsonServer;

const server = create();
const dataPath = path.join(__dirname, "data", "cities.json");
const jsonRouter = router(dataPath);
const middlewares = defaults();
const port = process.env.PORT || 9000;

server.use(middlewares);
server.use(jsonRouter);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
