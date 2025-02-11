// app/api/send-domain/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, subdomain, chatbotName } = await req.json();
    
    const response = await resend.emails.send({
      from: 'DeepSheep <onboarding@deepsheep.ai>',
      to: email,
      subject: 'Your DeepSheep AI Chatbot is Ready! 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to DeepSheep! 🐑</h1>
          
          <p>Great news! Your AI chatbot "${chatbotName}" is now live and ready to use.</p>
          
          <p>You can access your chatbot at:</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <a href="https://${subdomain}.deepsheep.ai" style="color: #3b82f6; text-decoration: none;">
              https://${subdomain}.deepsheep.ai
            </a>
          </div>

          <h2>What's Next?</h2>
          <ul>
            <li>Share your chatbot URL with your audience</li>
            <li>Monitor your chatbot's performance in the dashboard</li>
            <li>Customize your chatbot further anytime</li>
          </ul>

          <p>Need help? Reply to this email or contact our support team.</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
            <p style="color: #666; font-size: 14px;">Best regards,<br>The DeepSheep Team</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}