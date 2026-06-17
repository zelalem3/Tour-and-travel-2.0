import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@sanity/client";
import Inquiry from './models/Inquiry.js';

dotenv.config();

const app = express();
app.use(express.json());

// Allows your full-screen Vite/React chat page to connect safely
app.use(cors({ origin: 'http://localhost:5173' }));

// --- DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI;
if (mongoURI) {
  mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ DB Error:", err.message));
} else {
  console.warn("⚠️ MONGO_URI not found. Inquiry logging will fall back to memory.");
}

// --- SERVICES INITIALIZATION ---
const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-03-01",
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// FIX: Upgraded from deprecated/overloaded preview to stable, high-performance production model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function getAITravelAdvice(userQuery) {
  try {
    // Fetch destinations from Sanity CMS
    const query = `*[_type == "destination" || _type == "tourDestination"]{
      name,
      description,
      location,
      budget
    }`;

    const destinations = await sanity.fetch(query) || [];

    const context = destinations.length > 0
      ? destinations.map(d => `${d.name} in ${d.location || 'Ethiopia'}: ${d.description || 'No description available.'}`).join("\n")
      : "Currently, no specific destinations are listed in our database.";

    const prompt = `
You are an expert Ethiopia travel assistant. Be helpful, friendly, and engaging.

CONTEXT DATA FROM OUR DATABASE:
${context}

USER REQUEST: "${userQuery}"

INSTRUCTIONS:
- If context data is empty, use your general knowledge about Ethiopia tourism.
- Mention that official tour bookings and detailed packages are coming soon.
- Keep responses concise but informative (2-4 paragraphs max unless asked for more).
- Focus on practical travel advice: best time to visit, highlights, safety tips, culture, etc.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Generation Error:", error.message);
    throw error;
  }
}

// --- UNIFIED CHAT & LOGGING ROUTE ---
app.post('/api/ai/chat', async (req, res) => {
  const { userQuery } = req.body;
  
  if (!userQuery) {
    return res.status(400).json({ error: "Missing userQuery field in request body." });
  }

  try {
    // 1. Optimistically Log the interaction query to MongoDB if database is running
    if (mongoose.connection.readyState === 1) {
      try {
        const newInquiry = new Inquiry({
          query: userQuery,
          source: 'immersive-chat-page',
          createdAt: new Date()
        });
        await newInquiry.save();
        console.log("📥 Travel question logged to MongoDB");
      } catch (dbErr) {
        // Log locally but don't halt generation if saving failed
        console.error("⚠️ Failed to write log history hook:", dbErr.message);
      }
    }

    // 2. Query Gemini with contextual CMS hooks
    const advice = await getAITravelAdvice(userQuery);
    
    // 3. Return explicit success format that matching frontend state expect loops
    return res.status(200).json({ 
      success: true, 
      response: advice 
    });

  } catch (error) {
    console.error("System Route Processing Error:", error.message);
    return res.status(500).json({ 
      error: "The guide is resting right now. Please try again in a moment." 
    });
  }
});

// Debug tool fallback verification handler
app.get('/api/ai/test', async (req, res) => {
  try {
    const advice = await getAITravelAdvice("Recommend top places to visit in Ethiopia for a 7-day trip");
    res.status(200).json({ success: true, response: advice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🛡️ Shield Server Active on Port ${PORT}`);
  console.log(`   Unified Chat endpoint → http://localhost:${PORT}/api/ai/chat`);
});