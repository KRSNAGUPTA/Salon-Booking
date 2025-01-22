import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast"; // Ensure this imports the toast component
import { useToast } from "@/hooks/use-toast"; // Ensure this imports the useToast hook
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const LoginSignupPage = () => {
  const { toast } = useToast(); // Ensure toast is correctly retrieved from useToast hook
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast({
        description: "Both email and password are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await login(email, password);
      if (res?.role) {
        toast({
          description: "Logged in successfully!",
          variant: "success",
        });
        navigate("/");
      } else {
        toast({
          description: "Login failed. Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      toast({
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await register(name, email, password);
      if (res?.role) {
        toast({
          description: "Signed up successfully!",
          variant: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Toaster /> {/* Ensure Toast component is rendered here */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="flex justify-center mb-6">
            <TabsTrigger value="login" className="flex-1 text-center">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1 text-center">
              Signup
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF6F61] text-white hover:bg-[#e85d51]"
              >
                Login
              </Button>
            </form>
          </TabsContent>

          {/* Signup Form */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF6F61] text-white hover:bg-[#e85d51]"
              >
                Signup
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LoginSignupPage;
