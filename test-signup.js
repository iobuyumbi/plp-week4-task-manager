const axios = require("axios");

const API_URL = "http://localhost:5000/api";

async function testSignupAndTasks() {
  try {
    console.log("🧪 Testing signup and tasks flow...\n");

    // Step 1: Test server connection
    console.log("1. Testing server connection...");
    const testResponse = await axios.get(`${API_URL}/test`);
    console.log("✅ Server is running:", testResponse.data.message);

    // Step 2: Test signup
    console.log("\n2. Testing signup...");
    const signupData = {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "password123",
    };

    const signupResponse = await axios.post(
      `${API_URL}/auth/signup`,
      signupData
    );
    console.log("✅ Signup successful");
    console.log("Token received:", signupResponse.data.token ? "Yes" : "No");

    const token = signupResponse.data.token;

    // Step 3: Test tasks endpoint with token
    console.log("\n3. Testing tasks endpoint with token...");
    const tasksResponse = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Tasks endpoint working");
    console.log("Tasks received:", tasksResponse.data);
    console.log(
      "Number of tasks:",
      Array.isArray(tasksResponse.data)
        ? tasksResponse.data.length
        : "Not an array"
    );

    // Step 4: Test creating a task
    console.log("\n4. Testing task creation...");
    const newTask = {
      title: "Test Task",
      description: "This is a test task",
    };

    const createResponse = await axios.post(`${API_URL}/tasks`, newTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Task created successfully");
    console.log("Created task:", createResponse.data);

    // Step 5: Test fetching tasks again
    console.log("\n5. Testing tasks fetch after creation...");
    const tasksResponse2 = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Tasks fetch after creation");
    console.log("Tasks received:", tasksResponse2.data);
    console.log(
      "Number of tasks:",
      Array.isArray(tasksResponse2.data)
        ? tasksResponse2.data.length
        : "Not an array"
    );

    console.log("\n🎉 All tests passed! The API is working correctly.");
  } catch (error) {
    console.error(
      "❌ Test failed:",
      error.response?.status,
      error.response?.data
    );
    console.error("Error details:", error.message);
  }
}

testSignupAndTasks();
