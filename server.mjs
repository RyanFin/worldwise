import express from "express";
import fetch from "node-fetch";

const app = express();
const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:9000";

console.log(jsonServerUrl);

app.get("/cities", async (req, res) => {
  try {
    const response = await fetch(`${jsonServerUrl}/cities`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from json-server" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Main app listening on port ${PORT}`);
});
