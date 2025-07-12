const http = require("http");

function makeRequest(path, method = "GET", data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 5000,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsedBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  try {
    console.log("🧪 Testing API endpoints...\n");

    // Test 1: Server connection
    console.log("1. Testing server connection...");
    const testResponse = await makeRequest("/api/test");
    console.log("✅ Server response:", testResponse.data);

    // Test 2: Tasks endpoint without auth (should fail)
    console.log("\n2. Testing tasks without auth...");
    const tasksResponse = await makeRequest("/api/tasks");
    console.log("✅ Expected unauthorized:", tasksResponse.data);

    console.log("\n🎉 Basic API test completed!");
    console.log(
      "Now try signing up in the browser and check the console logs."
    );
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testAPI();
