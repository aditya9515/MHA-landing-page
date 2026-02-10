import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");    
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function POST(req: NextRequest) {
    const { email } = await req.json();

    const { error } = await supabase
        .from("subscribers")
        .insert([{ email }]);

    if (error) {
        return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
}