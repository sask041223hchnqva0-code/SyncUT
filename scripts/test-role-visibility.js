import { spawnSync } from "node:child_process";
import fs from "node:fs";

import { createClient } from "@supabase/supabase-js";

function getEnvValue(name) {
  const line = fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${name}=`));

  return line?.slice(name.length + 1).trim().replace(/^"|"$/g, "");
}

function getPublishableKey() {
  const envKey = getEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (envKey) {
    return envKey;
  }

  const command =
    "pnpm dlx supabase@latest projects api-keys --project-ref vvbzhrxfshillhkyunje --output-format json";
  const result = spawnSync(
    process.platform === "win32" ? "cmd.exe" : "sh",
    process.platform === "win32"
      ? ["/d", "/s", "/c", command]
      : ["-c", command],
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
  );

  if (result.status !== 0 && !result.stdout) {
    throw new Error(result.stderr || "No fue posible obtener publishable key.");
  }

  const keys = JSON.parse(result.stdout).keys;
  return keys.find((key) => key.type === "publishable")?.api_key;
}

async function signIn(email, password) {
  const client = createClient(getEnvValue("NEXT_PUBLIC_SUPABASE_URL"), getPublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(`No se pudo iniciar sesión como ${email}: ${error.message}`);
  }

  return client;
}

async function countVisible(client, table) {
  const { count, error } = await client
    .from(table)
    .select("id", { count: "exact", head: true });

  if (error) {
    throw new Error(`${table}: ${error.message}`);
  }

  return count ?? 0;
}

const password = "SyncUT2026!";
const tutor = await signIn("tutor@syncut.test", password);
const teacher = await signIn("docente@syncut.test", password);

const tutorAppointments = await countVisible(tutor, "appointments");
const tutorJustifications = await countVisible(tutor, "justifications");
const teacherJustifications = await countVisible(teacher, "justifications");

console.log(`✅ Tutor ve ${tutorAppointments} cita(s).`);
console.log(`✅ Tutor ve ${tutorJustifications} justificación(es).`);
console.log(`✅ Docente ve ${teacherJustifications} justificación(es).`);

if (tutorAppointments < 1) {
  throw new Error("El tutor demo no ve citas.");
}

if (tutorJustifications < 1) {
  throw new Error("El tutor demo no ve justificaciones.");
}

if (teacherJustifications < 1) {
  throw new Error("El docente demo no ve justificaciones.");
}
