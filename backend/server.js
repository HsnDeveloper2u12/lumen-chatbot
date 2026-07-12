// Lumen AI Chatbot - Backend Server
// Talks to Groq's chat completion API and forwards clean responses to the frontend.

require("dotenv").config();

const express = require("express");
const cors = require("cors");
// Node 18+ (Vercel's runtime) has fetch built in — no need to import node-fetch.

const app = express();

const PORT = process.env.PORT || 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";


app.use(cors());
app.use(express.json());


// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    model: GROQ_MODEL,
    keyConfigured: Boolean(GROQ_API_KEY),
  });
});


// Chat API
app.post("/api/chat", async (req, res) => {
  try {

    if (!GROQ_API_KEY) {
      return res.status(500).json({
        error: "GROQ_API_KEY missing. Add it in Vercel Environment Variables.",
      });
    }


    const { messages } = req.body;


    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Request must include a non-empty messages array.",
      });
    }


    const systemPrompt = {
      role: "system",
      content:
        "You are Lumen, a warm, clear, and helpful AI assistant. Keep answers concise unless the user asks for detail.",
    };


    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },


      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          systemPrompt,
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });



    const data = await groqResponse.json();



    if (!groqResponse.ok) {
      console.error("Groq Error:", data);

      return res.status(groqResponse.status).json({
        error:
          data?.error?.message ||
          "Groq API request failed.",
      });
    }



    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";



    res.json({
      reply
    });



  } catch (error) {

    console.error("Server Error:", error);


    res.status(500).json({
      error: "Something went wrong on server."
    });

  }
});



// Export for Vercel
module.exports = app;


// Local testing only
if (require.main === module) {

  app.listen(PORT, () => {
    console.log(
      `Lumen backend running on http://localhost:${PORT}`
    );
  });

}