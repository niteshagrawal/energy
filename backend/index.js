require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const NREL_API_KEY = process.env.NREL_API_KEY;

app.get("/projects", async (req, res) => {
  const { page = 1, limit = 10, lat, lon } = req.query;

  // Use default lat/lon for Denver, CO if not provided
  const latitude = lat || 39.7392;
  const longitude = lon || -104.9903;

  let apiParams = [
    `lat=${latitude}`,
    `lon=${longitude}`,
    `api_key=${NREL_API_KEY}`,
    `page=${page}`,
    `per_page=${limit}`,
  ];

  let url = `https://developer.nrel.gov/api/pv-projects/data_query/v1.json?${apiParams.join(
    "&"
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("🚀 ~ index.js:28 ~ app.get ~ data:", data);

    // Transform data as needed
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
