// /api/test-mail
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "YOUR_EMAIL@gmail.com",
        subject: "Test Email",
        html: "<p>Hello test</p>",
    })

    console.log(data, error)

    return Response.json({ data, error })
}