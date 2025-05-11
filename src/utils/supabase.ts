import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ytvlgxldubddmwvzwmsd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dmxneGxkdWJkZG13dnp3bXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MzUxMTcsImV4cCI6MjA2MjUxMTExN30.Pk8ElrdfMBTeijaELH7T_IlodQfyokze93AJqKcaQPg";
export const supabase = createClient(supabaseUrl, supabaseKey);
