import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(
  email: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "DUYI Store - Email Verification Code",
      html: `
        <div style="max-width: 480px; margin: 0 auto; padding: 32px; font-family: Arial, sans-serif; background: #ffffff; border-radius: 8px; border: 1px solid #eee;">
          <h2 style="color: #333; text-align: center; margin-bottom: 24px;">DUYI Store</h2>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">Your verification code is:</p>
          <div style="text-align: center; margin: 32px 0;">
            <span style="display: inline-block; padding: 16px 40px; background: #f5f5f5; border-radius: 6px; font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #333;">${code}</span>
          </div>
          <p style="color: #999; font-size: 12px; line-height: 1.6;">This code is valid for 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    })
    return { success: true, message: "Verification code sent" }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, message: "Failed to send verification code" }
  }
}
