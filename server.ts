import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API constraints
  app.get("/api/oauth-config", (req, res) => {
    res.json({ clientId: process.env.OAUTH_CLIENT_ID || '' });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, dataContext } = req.body;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const systemPrompt = `Anda adalah asisten keuangan pribadi yang berbasa Indonesia. 
Pengguna sedang menggunakan aplikasi "Manajer Utang" dengan data yang diberikan berikut.
Berikan saran, informasi, atau semangat mengenai manajemen utang mereka. 
Bantu pengguna mengerti cicilan dan optimalkan pembayarannya.

Konteks Utang Pengguna:
${JSON.stringify(dataContext, null, 2)}`;

      // Gemini requires contents to start with role 'user'
      let validMessages = messages;
      while (validMessages.length > 0 && validMessages[0].role === 'model') {
        validMessages = validMessages.slice(1);
      }

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: validMessages,
        config: {
          systemInstruction: systemPrompt
        }
      });

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (error: any) {
      console.error(error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Gagal memproses permintaan: " + error.message });
      } else {
        res.end();
      }
    }
  });

  app.post("/api/drive/backup", async (req, res) => {
    try {
      const { accessToken, backupData } = req.body;
      if (!accessToken || !backupData) {
         return res.status(400).json({ error: "Missing required fields" });
      }

      const { google } = await import('googleapis');
      
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });
      
      const drive = google.drive({ version: 'v3', auth: oauth2Client });
      
      const fileMetadata = {
        name: `ManajerUtang_Backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
        mimeType: 'application/json',
      };
      
      const media = {
        mimeType: 'application/json',
        body: JSON.stringify(backupData, null, 2),
      };

      const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink',
      });
      
      res.json({ success: true, file: file.data });
    } catch (error: any) {
      console.error('Drive backup error:', error);
      res.status(500).json({ error: error.message || 'Failed to backup to Drive' });
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
