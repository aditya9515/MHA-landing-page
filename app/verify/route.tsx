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

        // ✅ Expiry check
        const createdAt = new Date(data.token_created_at)
        const now = new Date()

        const diffMs = now.getTime() - createdAt.getTime()
        const diffMinutes = diffMs / 60000

        if (diffMinutes > 2) {
        return Response.redirect(
            `${process.env.NEXT_PUBLIC_SITE_URL}/error`
        )
        }

        // ✅ Activate subscriber
        await supabase
        .from("newsletter_subscribers")
        .update({
            status: "active",
            verification_token: null,
            verified_at: new Date()
        })
        .eq("id", data.id)

        // ✅ Add to resend audience
        try {
            await resend.contacts.create({
                email: data.email,
                unsubscribed: false,
            });
            } catch (resendError: any) {

            // Prevent duplicate crash
            if (!resendError.message?.includes("already exists")) {
                throw resendError
            }

            console.log("Contact already exists in Resend")
            }

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