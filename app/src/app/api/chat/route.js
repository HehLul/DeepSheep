// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const TOKEN_LIMIT = process.env.NODE_ENV === "development" ? 1000 : 50000;

// Simplified token estimation function
function estimateTokens(text) {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export async function POST(request) {
  try {
    const { messages, subdomain } = await request.json();

    // Get current token usage
    const { data: chatbot, error: fetchError } = await supabase
      .from("chatbots")
      .select("id, token_usage, status")
      .eq("subdomain", subdomain)
      .single();

    if (fetchError || !chatbot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    // Check if chatbot is active
    if (chatbot.status !== 'active') {
      return NextResponse.json({ error: "Chatbot is not active" }, { status: 403 });
    }

    // Estimate tokens for incoming messages
    const incomingTokens = messages.reduce((total, message) => {
      return total + estimateTokens(message.content);
    }, 0);

    // Check if we would exceed the limit
    if (chatbot.token_usage + incomingTokens > TOKEN_LIMIT) {
      return NextResponse.json(
        {
          error: "Token limit reached",
          message: `Token limit of ${TOKEN_LIMIT} reached. ${
            process.env.NODE_ENV === "development"
              ? "(Development mode - using reduced limit for testing)"
              : "Please upgrade to continue."
          }`,
          currentUsage: chatbot.token_usage,
          limit: TOKEN_LIMIT,
        },
        { status: 403 }
      );
    }

    // Process with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseMessage = completion.choices[0].message.content;
    
    // Get actual token usage from OpenAI response
    const totalTokensUsed = completion.usage.total_tokens;

    // Update token usage
    const { error: updateError } = await supabase
      .from("chatbots")
      .update({
        token_usage: chatbot.token_usage + totalTokensUsed,
      })
      .eq("id", chatbot.id)
      .eq("status", "active");

    if (updateError) {
      console.error("Error updating token usage:", updateError);
    }

    return NextResponse.json({
      message: responseMessage,
      usage: {
        current: chatbot.token_usage + totalTokensUsed,
        limit: TOKEN_LIMIT,
        remaining: TOKEN_LIMIT - (chatbot.token_usage + totalTokensUsed),
        isDevelopment: process.env.NODE_ENV === "development",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}