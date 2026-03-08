import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendApiKeyEmail(email: string, apiKey: string): Promise<void> {
  await resend.emails.send({
    from: 'CommitCraft AI <noreply@commitcraft.ai>',
    to: email,
    subject: 'Your CommitCraft API Key',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #1a1a1a;">Welcome to CommitCraft AI! 🎉</h1>
        <p style="color: #555; font-size: 16px;">Your API key is ready. Copy it and paste it into VS Code when prompted.</p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <code style="font-size: 18px; color: #1a1a1a; word-break: break-all;">${apiKey}</code>
        </div>
        <p style="color: #555;">You have <strong>20 free generations per month</strong>.</p>
        <p style="color: #555;">Need unlimited? <a href="https://commitcraft.ai/upgrade" style="color: #6366f1;">Upgrade to Pro for $4.99/month →</a></p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
        <p style="color: #999; font-size: 14px;">Keep this key safe. If you lose it, just register again with the same email to get it back.</p>
      </div>
    `
  })
}
