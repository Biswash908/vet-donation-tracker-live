import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, data.password_hash);

  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({ success: true });
}