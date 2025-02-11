// app/api/launch-chatbot/route.js
import { supabase } from '../../../utils/supabase';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Log the entire request body for debugging
    const requestBody = await request.json();
    console.log('🚀 Received Request Body:', JSON.stringify(requestBody, null, 2));

    const { 
      email, 
      chatbotConfig, 
      customization,
      subdomain 
    } = requestBody;

    // Detailed input validation logging
    console.log('📋 Received Data:');
    console.log('Email:', email);
    console.log('Subdomain:', subdomain);
    console.log('Chatbot Config Exists:', !!chatbotConfig);
    console.log('Customization Exists:', !!customization);

    // Validate input with more detailed error reporting
    if (!chatbotConfig) {
      console.error('❌ Missing chatbot configuration');
      return NextResponse.json(
        { error: 'Missing chatbot configuration' }, 
        { status: 400 }
      );
    }
    if (!customization) {
      console.error('❌ Missing customization');
      return NextResponse.json(
        { error: 'Missing customization' }, 
        { status: 400 }
      );
    }
    if (!email) {
      console.error('❌ Missing email');
      return NextResponse.json(
        { error: 'Missing email' }, 
        { status: 400 }
      );
    }
    if (!subdomain) {
      console.error('❌ Missing subdomain');
      return NextResponse.json(
        { error: 'Missing subdomain' }, 
        { status: 400 }
      );
    }

    // Log subdomain check
    console.log('🔍 Checking subdomain uniqueness');
    const { count, error: countError } = await supabase
      .from('chatbots')
      .select('*', { count: 'exact' })
      .eq('subdomain', subdomain);

    if (countError) {
      console.error('❌ Error checking subdomain:', countError);
      throw countError;
    }

    console.log('📊 Subdomain count:', count);
    if (count > 0) {
      console.error('❌ Subdomain already exists');
      return NextResponse.json(
        { error: 'Subdomain already exists' }, 
        { status: 400 }
      );
    }

    // Prepare insertion data
    const insertData = {
      name: chatbotConfig.name,
      description: chatbotConfig.description,
      main_prompt: chatbotConfig.mainPrompt,
      examples: chatbotConfig.examples,
      customization: customization,
      subdomain: subdomain,
      user_email: email,
      status: 'active'
    };

    console.log('📝 Insertion Data:', JSON.stringify(insertData, null, 2));

    // Insert chatbot configuration
    const { data, error } = await supabase
      .from('chatbots')
      .insert(insertData)
      .select();

    if (error) {
      console.error('❌ Supabase Insertion Error:', error);
      throw error;
    }

    console.log('✅ Successfully inserted chatbot:', data);

    // Construct chatbot URL
    const chatbotUrl = `http://localhost:3000/${subdomain}`;

    // Send Email
    try {
      console.log('📧 Starting email send process...');
      
      const emailResponse = await resend.emails.send({
        from: 'DeepSheep <noreply@prodevstudios.com>',
        to: email,
        subject: 'Your DeepSheep AI Chatbot is Ready! 🎉',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Welcome to DeepSheep! 🐑</h1>
            
            <p>Great news! Your AI chatbot "${chatbotConfig.name}" is now live and ready to use.</p>
            
            <p>You can access your chatbot at:</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <a href="${chatbotUrl}" style="color: #3b82f6; text-decoration: none;">
                ${chatbotUrl}
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

      console.log('📬 Email API Response:', emailResponse);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      // Not throwing an error to allow the chatbot creation to still succeed
    }

    return NextResponse.json({ 
      message: 'Chatbot launched successfully',
      subdomain: subdomain,
      url: chatbotUrl
    });

  } catch (error) {
    console.error('🔥 Complete Launch Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to launch chatbot',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}