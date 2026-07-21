import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const url  = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const svc  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // ── 1. Parse body ──────────────────────────────────────────────────────
    const { name, bar_council_number, email, password } = await req.json();

    if (!name || !email || !password) {
      return json({ error: "name, email and password are required" }, 400);
    }

    // ── 2. Verify caller is an admin ───────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Missing authorization token" }, 401);
    }

    const callerToken = authHeader.slice(7);
    const anonClient  = createClient(url, anon, {
      global: { headers: { Authorization: `Bearer ${callerToken}` } },
    });

    const { data: callerUser, error: callerErr } = await anonClient.auth.getUser();
    if (callerErr || !callerUser.user) {
      return json({ error: "Invalid token" }, 401);
    }

    const { data: roleRow, error: roleErr } = await anonClient
      .from("user_roles")
      .select("role")
      .eq("user_id", callerUser.user.id)
      .single();

    if (roleErr || roleRow?.role !== "admin") {
      return json({ error: "Forbidden: admin access required" }, 403);
    }

    // ── 3. Create auth user with service role ──────────────────────────────
    const svcClient = createClient(url, svc, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: created, error: createErr } = await svcClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createErr || !created.user) {
      return json({ error: createErr?.message ?? "Failed to create user" }, 400);
    }

    // ── 4. Insert user_roles row ───────────────────────────────────────────
    const { error: insertErr } = await svcClient
      .from("user_roles")
      .insert({
        user_id:           created.user.id,
        role:              "advocate",
        name,
        bar_council_number: bar_council_number ?? null,
      });

    if (insertErr) {
      // Roll back: delete the auth user so we don't leave orphans
      await svcClient.auth.admin.deleteUser(created.user.id);
      return json({ error: insertErr.message }, 500);
    }

    // ── 5. Success ─────────────────────────────────────────────────────────
    return json({ success: true, user_id: created.user.id });

  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Unexpected error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
