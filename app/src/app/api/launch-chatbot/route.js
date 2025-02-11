// app/api/launch-chatbot/route.js
import { supabase } from '../../../utils/supabase';
import { NextResponse } from 'next/server';

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
    // const chatbotUrl = `https://deepsheep.io/${subdomain}`;
    // app/api/launch-chatbot/route.js
const chatbotUrl = `http://localhost:3000/${subdomain}`;

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