const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const jsonServer = require("json-server");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Setup the json-server
const apiServer = jsonServer.create();
const router = jsonServer.router("db.json"); // Path to your db.json file
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
apiServer.use(router);

// Proxy API requests to json-server
app.use(
  "/api",
  createProxyMiddleware({
    target: `http://localhost:${PORT + 1}`,
    changeOrigin: true,
  })
);

// Serve the index.html for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the json-server on a different port
apiServer.listen(PORT + 1, () => {
  console.log(`JSON Server is running on port ${PORT + 1}`);
});
