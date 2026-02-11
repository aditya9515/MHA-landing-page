import { resend } from "@/lib/resend"
import { supabase } from "@/lib/supabase"
import crypto from "crypto"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        const token = crypto.randomUUID()
        const now = new Date()

        const { data: existingUser } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .eq("email", email)
        .maybeSingle()

        // Already verified
        if (existingUser?.status === "active") {
        return Response.json(
            { error: "You are already subscribed" },
            { status: 400 }
        )
        }

        // Update existing
        if (existingUser) {
        await supabase
            .from("newsletter_subscribers")
            .update({
            verification_token: token,
            created_at: now // 🔥 reset expiry timer
            })
            .eq("email", email)
        }

        // Insert new
        else {
        await supabase
            .from("newsletter_subscribers")
            .insert({
            email,
            verification_token: token,
            created_at: now
            })
        }

        const link =
        `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${token}`

        await resend.emails.send({
        from: "Rolcy <rolcy@mhalandingpage.adityakosuru.online>",
        to: email,
        subject: "Verify subscription",
        html: `
            <p>Hi,</p>

            <p>Thanks for subscribing to UniTrend.</p>

            <p>Your verification link expires in 2 minutes.</p>

            <p>
            <a href="${link}">Verify Email</a>
            </p>

            <p>If you did not request this, you can safely ignore this email.</p>

            <br/>
            <p>— Rolcy Team</p>
        `,
        text: `
            Hi,

            Thanks for subscribing to UniTrend.
            Your verification link expires in 2 minutes.

            Verify here:
            ${link}

            If you did not request this, ignore this email.

            - UniTrend Team
        `,
        headers: {
            "List-Unsubscribe": "<mailto:unsubscribe@mhalandingpage.adityakosuru.online>"
        }
        })

        return Response.json({ success: true })

    } catch (err) {
        console.error(err)
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}