const axios = require("axios");

const API_URL = "http://localhost:5000/api";

async function testAPI() {
  try {
    console.log("Testing API endpoints...");

    // Test 1: Check if server is running
    console.log("\n1. Testing server connection...");
    const response = await axios.get(`${API_URL}/tasks`);
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.status, error.response?.data);
  }
}

testAPI();
