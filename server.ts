import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // API endpoints
  app.post("/api/photo-to-text", async (req, res) => {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "OPENROUTER_API_KEY is missing in the environment." });
      }

      const { imageBase64, prompt } = req.body;
      if (!imageBase64) {
          return res.status(400).json({ error: "Image base64 is required." });
      }

      // OpenRouter chat completions API
      const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o", // A solid vision model on openrouter, or could use default
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt || "What is in this image?" },
                { type: "image_url", image_url: { url: imageBase64 } }
              ]
            }
          ]
        })
      });

      if (!aiResponse.ok) {
         const err = await aiResponse.text();
         throw new Error(`OpenRouter API error: ${err}`);
      }

      const data = await aiResponse.json();
      res.json({ text: data.choices[0].message.content });

    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || "Failed to process image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
