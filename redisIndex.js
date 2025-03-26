const express = require("express");
const axios = require("axios");
const Redis = require("redis");

const app = express();
const PORT = 3000;

// Create a Redis client
const redisClient = Redis.createClient();

// Handle Redis connection errors
redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Connect to Redis
redisClient.connect();

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/posts", async (req, res) => {
  try {
    // Check if posts are already cached in Redis
    const cachedPosts = await redisClient.get("posts");
    if (cachedPosts) {
      console.log("Returning cached posts");
      return res.status(200).json(JSON.parse(cachedPosts));
    }

    // Fetch posts from the API
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Cache the posts data in Redis for 3600 seconds (1 hour)
    await redisClient.set("posts", JSON.stringify(response.data), { EX: 3 });

    console.log("Returning new posts from API");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching posts: " + error.message);
  }
});
