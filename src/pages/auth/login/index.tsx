import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement authentication logic
    console.log("Login attempt:", { email, password });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-col gap-3 text-center pb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 text-sm mt-1">
              Sign in to access your autism assessment dashboard
            </p>
          </div>
        </CardHeader>

        <CardBody className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="bordered"
                classNames={{
                  input: "text-sm",
                  label: "text-sm font-medium"
                }}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="bordered"
                classNames={{
                  input: "text-sm",
                  label: "text-sm font-medium"
                }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-medium"
              isLoading={isLoading}
              disabled={!email || !password}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}