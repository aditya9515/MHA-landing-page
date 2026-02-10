import { supabase } from "@/lib/supabase"
import { resend } from "@/lib/resend"

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token")

        if (!token) {
        return Response.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/error`
        )
        }

        // Find subscriber
        const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .eq("verification_token", token)
        .single()

        if (error || !data) {
        return Response.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/error`
        )
        }

        // Activate subscriber
        await supabase
        .from("newsletter_subscribers")
        .update({
            status: "active",
            verification_token: null
        })
        .eq("id", data.id)

        // Add to resend audience
        await resend.contacts.create({
        email: data.email,
        audienceId: process.env.RESEND_AUDIENCE_ID!
        })

        return Response.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/success`
        )

    } catch (err) {
        console.error(err)

        return Response.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/error`
        )
    }
}