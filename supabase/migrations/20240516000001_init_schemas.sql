-- Initial database schema for authentication and user roles
-- Created: 2024-05-16
-- This is the CORE schema for Squad 2 (Auditoría)

-- ============ TABLA: profiles (Perfiles de Usuario) ============
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'student',
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT role_check CHECK (role IN ('student', 'teacher', 'tutor', 'admin', 'coordinator'))
);

-- Índices para optimizar búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ============ TABLA: role_permissions (Control de Acceso RBAC) ============
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  permission text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role, permission),
  CONSTRAINT role_check CHECK (role IN ('student', 'teacher', 'tutor', 'admin', 'coordinator'))
);

-- ============ TABLA: audit_logs (Auditoría Inmutable de Eventos) ============
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);

-- ============ TABLA: session_tokens (Gestión de Sesiones) ============
CREATE TABLE IF NOT EXISTS public.session_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  device_name text,
  ip_address inet,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  revoked_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_session_tokens_user_id ON public.session_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_session_tokens_expires_at ON public.session_tokens(expires_at);

-- ============ ENABLE RLS ============
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- ============ RLS POLICY: profiles ============
DROP POLICY IF EXISTS "profiles_self_view" ON public.profiles;
CREATE POLICY "profiles_self_view"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id
    OR role = 'admin'
  );

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR role = 'admin')
  WITH CHECK (auth.uid() = id OR role = 'admin');

-- ============ RLS POLICY: audit_logs ============
DROP POLICY IF EXISTS "audit_logs_view" ON public.audit_logs;
CREATE POLICY "audit_logs_view"
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "audit_logs_no_delete" ON public.audit_logs;
CREATE POLICY "audit_logs_no_delete"
  ON public.audit_logs
  FOR DELETE
  TO authenticated
  USING (false);

-- ============ RLS POLICY: session_tokens ============
DROP POLICY IF EXISTS "session_tokens_view" ON public.session_tokens;
CREATE POLICY "session_tokens_view"
  ON public.session_tokens
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============ RLS POLICY: role_permissions ============
DROP POLICY IF EXISTS "role_permissions_view" ON public.role_permissions;
CREATE POLICY "role_permissions_view"
  ON public.role_permissions
  FOR SELECT
  TO authenticated
  USING (true);
