'use server';

// src/app/[subdomain]/page.js
import { createClient } from '@supabase/supabase-js';
import ChatbotClient from './ChatbotClient';


export default async function ChatbotPage({ params }) {
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_KEY  // Use service key for server component
  );
  
  // Fetch chatbot configuration
  const { data, error } = await supabase
    .from('chatbots')
    .select('*')
    .eq('subdomain', params.subdomain)
    .single();

  if (error || !data) {
    return <div>Chatbot not found</div>;
  }

  return <ChatbotClient 
    initialConfig={data}
    subdomain={params.subdomain}
  />;
}