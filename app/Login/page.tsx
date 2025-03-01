"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; 
import { account } from "../../lib/appwrite";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get(); // Check if user is already logged in
        if (user) router.push("/dashboard");
      } catch (error) {
        //console.log("No active session");
      }
    };
    checkUser();
  }, [router]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await account.createEmailPasswordSession(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    try {
      await account.createOAuth2Session("google", `${window.location.origin}/dashboard`);
    } catch (err: any) {
      setError("Google login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-100 to-sky-300">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-96 bg-white shadow-2xl rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription className="text-gray-600">Welcome back! Please enter your details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input id="email" type="email" onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input id="password" type="password" onChange={handleChange} required className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button type="button" className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 mt-2" onClick={handleGoogleLogin}>
                <FcGoogle size={20} /> Login with Google
              </Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              New here? <Link href="/Register" className="text-blue-500 font-semibold hover:underline">Create an account</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
