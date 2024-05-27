import express from "express";
import fetch from "node-fetch";

const app = express();
const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:9000";

console.log(jsonServerUrl);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the main application!");
});

app.get("/data", async (req, res) => {
  try {
    const response = await fetch(`${jsonServerUrl}/cities`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch data from json-server",
      url: jsonServerUrl,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Main app listening on port ${PORT}`);
});
