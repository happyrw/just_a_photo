import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `
            <h1>Confirm your email</h1>
            <a href="${confirmLink}">Confirm your email</a>`
    })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/reset-your-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Password reset",
        html: `<h1>Change your password</h1>
              <a href="${confirmLink}">Change your password</a>`
    })
}