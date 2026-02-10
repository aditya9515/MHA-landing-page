import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("BODY:", body);

        const { email } = body;

        if (!email) {
        return NextResponse.json(
            { error: "Email required" },
            { status: 400 }
        );
        }

        const { data, error } = await supabase.auth.signUp({
        email,
        password: crypto.randomUUID(),
        });

        console.log("SUPABASE RESPONSE:", data, error);

        if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
        }

        return NextResponse.json({
        message: "Verification email sent!",
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);

        return NextResponse.json(
        { error: String(err) },
        { status: 500 }
        );
    }
}