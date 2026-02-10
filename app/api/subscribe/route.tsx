
import { resend } from "@/lib/resend"
import { supabase } from "@/lib/supabase"
import crypto from "crypto"

export async function POST(req: Request) {

    const { email } = await req.json()

    const token = crypto.randomUUID()

    await supabase
        .from("newsletter_subscribers")
        .insert({
        email,
        verification_token: token
        })

    const link =
        `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${token}`

    await resend.emails.send({
        from: "rolcy@mhalandingpage.adityakosuru.online",
        to: email,
        subject: "Verify subscription",
        html: `<a href="${link}">Verify Email</a>`
    })

    return Response.json({ success: true })
}
