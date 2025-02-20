// app/api/launch-chatbot/route.js
import { supabase } from '../../../utils/supabase';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Near the top of your route.js
const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const CHATBOT_LIMIT = 300;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const requestBody = await request.json();
    console.log('🚀 Received Request Body:', JSON.stringify(requestBody, null, 2));

    const { 
      email, 
      chatbotConfig, 
      customization,
      subdomain 
    } = requestBody;

    // Validate input
    if (!chatbotConfig || !customization || !email || !subdomain) {
      const missingFields = [];
      if (!chatbotConfig) missingFields.push('chatbot configuration');
      if (!customization) missingFields.push('customization');
      if (!email) missingFields.push('email');
      if (!subdomain) missingFields.push('subdomain');
      
      console.error(`❌ Missing fields: ${missingFields.join(', ')}`);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` }, 
        { status: 400 }
      );
    }

    // Check total number of chatbots
    console.log('🔢 Checking total chatbot count');
    const { count: totalChatbots, error: countError } = await supabase
      .from('chatbots')
      .select('*', { count: 'exact' });

    if (countError) {
      console.error('❌ Error checking chatbot count:', countError);
      throw countError;
    }

    console.log('📊 Total chatbots:', totalChatbots);
    if (totalChatbots >= CHATBOT_LIMIT) {
      console.error('❌ Chatbot limit reached');
      return NextResponse.json(
        { 
          error: 'Maximum chatbot limit reached',
          message: 'Due to high demand, we have reached our current limit of chatbots. Please try again later or contact support for enterprise access.'
        }, 
        { status: 403 }
      );
    }

    // Check subdomain uniqueness
    console.log('🔍 Checking subdomain uniqueness');
    const { count: subdomainCount, error: subdomainError } = await supabase
      .from('chatbots')
      .select('*', { count: 'exact' })
      .eq('subdomain', subdomain);

    if (subdomainError) {
      console.error('❌ Error checking subdomain:', subdomainError);
      throw subdomainError;
    }

    if (subdomainCount > 0) {
      console.error('❌ Subdomain already exists');
      return NextResponse.json(
        { error: 'Subdomain already exists' }, 
        { status: 400 }
      );
    }

    // Prepare and insert data
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

    const { data, error } = await supabase
      .from('chatbots')
      .insert(insertData)
      .select();

    if (error) {
      console.error('❌ Supabase Insertion Error:', error);
      throw error;
    }

    console.log('✅ Successfully inserted chatbot:', data);

// Then when constructing the URL:
const productionUrl = `https://${subdomain}.deepsheep.io`;
const developmentUrl = `http://localhost:3000/${subdomain}`;
if (isDevelopment) {
  console.log('Development URL:', developmentUrl);
  console.log('Production URL (for reference):', productionUrl);
}

const chatbotUrl = isDevelopment ? developmentUrl : productionUrl;


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