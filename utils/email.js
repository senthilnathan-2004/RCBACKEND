import { Resend } from "resend"
import logger from "./logger.js"

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Verify Resend configuration on startup
if (process.env.RESEND_API_KEY) {
  logger.info("Resend API key configured - Email service ready")
  console.log("✓ Resend email service ready")
} else {
  console.warn("⚠️  RESEND_API_KEY not configured. Emails will not be sent.")
  console.warn("   Get your API key from: https://resend.com/api-keys")
}

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      logger.warn("Resend API key not configured. Skipping email send.")
      return { id: "skipped-no-config", warning: "Email not configured" }
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
      text: text || undefined, // Only include text if provided
    })

    if (error) {
      logger.error(`Resend email error: ${error.message}`)
      console.error("Resend Error:", error)
      return { error: error.message, id: null }
    }

    logger.info(`Email sent via Resend: ${data.id}`)
    return data
  } catch (error) {
    logger.error(`Email sending failed: ${error.message}`)
    console.error("Email Error:", error.message)
    return { error: error.message, id: null }
  }
}
// Email templates
export const emailTemplates = {
  welcome: (name, memberId) => ({
    subject: "Welcome to Rotaract Club - Your Login Credentials",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0066cc;">Welcome to Rotaract Club!</h1>
        <p>Dear ${name},</p>
        <p>Welcome to our Rotaract family! Your membership has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0066cc; margin-top: 0;">Your Login Credentials</h2>
          <p><strong>Member ID:</strong> <span style="font-family: monospace; font-size: 18px; color: #0066cc;">${memberId}</span></p>
        </div>
        <p><strong>How to Login:</strong></p>
        <ol>
          <li>Go to the member login page</li>
          <li>Enter your <strong>EMAIL</strong>  in the login field</li>
          <li>Enter your <strong>MEMBER ID(PASSWORD)</strong> in the password field</li>
          <li>Click "Sign In"</li>
        </ol>
        <p style="color: #dc3545;"><strong>Important:</strong> Please change your password after first login for security.</p>
        <p>We're excited to have you join us in our mission of service above self.</p>
        <br>
        <p>Best regards,<br>Rotaract Club of AIHT</p>
      </div>
    `,
    text: `Welcome to Rotaract Club! Dear ${name}, Your Member ID: ${memberId}. Use your Member ID(PASSWORD) to login.`,
  }),

  expenseSubmitted: (name, amount, event) => ({
    subject: "Expense Submitted Successfully",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc;">Expense Submitted</h2>
        <p>Dear ${name},</p>
        <p>Your expense has been submitted successfully.</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Event:</strong> ${event}</p>
        <p><strong>Status:</strong> Pending Approval</p>
        <p>You will be notified once it's reviewed.</p>
      </div>
    `,
    text: `Expense Submitted - Amount: ₹${amount}, Event: ${event}`,
  }),

  expenseApproved: (name, amount, event) => ({
    subject: "Expense Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #28a745;">Expense Approved ✓</h2>
        <p>Dear ${name},</p>
        <p>Your expense has been approved!</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Event:</strong> ${event}</p>
      </div>
    `,
    text: `Expense Approved - Amount: ₹${amount}, Event: ${event}`,
  }),

  expenseRejected: (name, amount, event, reason) => ({
    subject: "Expense Rejected",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Expense Rejected</h2>
        <p>Dear ${name},</p>
        <p>Unfortunately, your expense has been rejected.</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Event:</strong> ${event}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      </div>
    `,
    text: `Expense Rejected - Amount: ₹${amount}, Reason: ${reason}`,
  }),

  passwordReset: (name, resetUrl) => ({
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066cc;">Password Reset</h2>
        <p>Dear ${name},</p>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
    text: `Password Reset - Visit: ${resetUrl}`,
  }),

  newExpenseAlert: (treasurerName, memberName, amount, event) => ({
    subject: "New Expense Submission - Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff9800;">New Expense Submission</h2>
        <p>Dear ${treasurerName},</p>
        <p>A new expense has been submitted and requires your review.</p>
        <p><strong>Submitted by:</strong> ${memberName}</p>
        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Event:</strong> ${event}</p>
        <p>Please login to review and approve/reject this expense.</p>
      </div>
    `,
    text: `New Expense from ${memberName} - Amount: ₹${amount}`,
  }),
}

export default { sendEmail, emailTemplates }
