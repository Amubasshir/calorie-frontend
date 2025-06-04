import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vdhlfgyfbiglybzcbzpa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkaGxmZ3lmYmlnbHliemNienBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzMzODQsImV4cCI6MjA1NzkwOTM4NH0.vAulof-9NE6d9jcKmgdGO5Ytr_-JHwmAygdOavV3XbQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
export type DbResultErr = { error: Error };
