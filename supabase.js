import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://smtuzdpsxzmgwlkhsism.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdHV6ZHBzeHptZ3dsa2hzaXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MjM4NjAsImV4cCI6MjA5MDQ5OTg2MH0.6ljN_5JBhGEVclMUtIUgbhRJbztRNAsi7vRuKzBS46c";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function guardarProducto(producto, precio) {
  return await supabase.from("compras").insert([{ producto, precio }]);
}

export async function obtenerProductos() {
  const { data } = await supabase.from("compras").select("*");
  return data || [];
}

export async function limpiarProductos() {
  return await supabase.from("compras").delete().neq("id", 0);
}