// Simple JWT decoder (without verification)
function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

// Check token from localStorage
const token = localStorage.getItem("token");
console.log("Token from localStorage:", token ? "Present" : "Missing");

if (token) {
  const decoded = decodeJWT(token);
  console.log("Decoded token:", decoded);

  if (decoded) {
    const now = Math.floor(Date.now() / 1000);
    console.log("Current time:", now);
    console.log("Token expires at:", decoded.exp);
    console.log("Token expired:", decoded.exp < now);
    console.log("User ID:", decoded.id);
    console.log("User role:", decoded.role);
  }
}
