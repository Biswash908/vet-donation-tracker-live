import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase"; // Ensure this path is correct

const logo = "/JLT.png";

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Inside AdminLogin.tsx handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // We are forcing the login to your specific admin email 
    // regardless of what "username" is typed, as long as it's not empty.
    const loginEmail = "jltcatlovers77@gmail.com";

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: password,
    });

    if (authError) throw authError;
    
    // If successful, save the flag and move on
    localStorage.setItem("isAdmin", "true");
    onLogin();

  } catch (err: any) {
    console.error("Auth Error:", err.message);
    // Show the actual error so we know if it's "Invalid Credentials" or something else
    setError(err.message === "Invalid login credentials" 
      ? "Incorrect username or password" 
      : err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff] px-4 py-12">
      <div className="max-w-lg w-[480px] space-y-6">
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/70 rounded-lg"
          disabled={loading}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <div className="bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Admin Login</h1>
              <p className="text-sm text-slate-500">JLT Cat Lovers' Group</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 bg-slate-50"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-slate-50"
                disabled={loading}
              />
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#155dfc] hover:bg-[#1247d4] text-white font-medium"
            >
              {loading ? <Loader2 className="animate-spin size-5" /> : "Sign In"}
            </Button>
          </form>

          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Lock className="size-3.5" />
            Secure Cloud Authentication
          </p>
        </div>
      </div>
    </div>
  );
}