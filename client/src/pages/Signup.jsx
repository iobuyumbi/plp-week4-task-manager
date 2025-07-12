import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import API from "../services/api";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      console.log("Signing up with:", { name, email });
      const response = await API.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup response:", response.data);
      localStorage.setItem("token", response.data.token);
      console.log("Token stored:", response.data.token ? "Yes" : "No");
      toast.success("Account created successfully ✅");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      console.error("Error response:", error.response?.data);
      toast.error("Signup failed ❌. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create an Account
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3 items-center mt-4">
            <Button
              type="submit"
              className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline"
              >
                Log in
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
