import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, ArrowLeft } from "lucide-react";
import logo from "../../JLT.png";

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff] px-4 py-12">
      
      {/* Container */}
      <div className="max-w-lg w-[480px] space-y-6">

        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/70 rounded-lg"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-8 rounded-lg object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Admin Login
              </h1>
              <p className="text-sm text-slate-500">
                JLT Cat Lovers' Group
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#155dfc] hover:bg-[#1247d4] text-white font-medium shadow-md hover:shadow-lg transition"
            >
              Sign In
            </Button>
          </form>

          {/* Footer Note */}
          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Lock className="size-3.5" />
            Any email & password works for demo
          </p>

        </div>
      </div>
    </div>
  );
}
