import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware
  app.use(express.json());

  // API Route: Healthcheck for status validation
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route: Proxy Google Photos image to bypass CORS limitations in the browser
  app.get("/api/proxy-photo", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).json({ error: "Parâmetro 'url' é obrigatório." });
      }

      // Security validation: verify that the URL belongs to Google's content domains
      const googleDomains = [
        "https://lh3.googleusercontent.com",
        "https://lh4.googleusercontent.com",
        "https://lh5.googleusercontent.com",
        "https://lh6.googleusercontent.com",
        "https://lh2.googleusercontent.com",
        "https://photos.googleusercontent.com"
      ];
      
      const isValidDomain = googleDomains.some(domain => url.startsWith(domain));
      if (!isValidDomain) {
        return res.status(400).json({ error: "URL inválida. Somente imagens armazenadas no Google Photos são permitidas." });
      }

      const response = await fetch(url);
      if (!response.ok) {
        return res.status(response.status).json({ error: "Erro ao carregar a imagem do Google Photos." });
      }

      const contentType = response.headers.get("content-type") || "image/jpeg";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 24 hours

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return res.send(buffer);
    } catch (error: any) {
      console.error("Erro no proxy da imagem do Google Photos:", error);
      return res.status(500).json({ error: error.message || "Erro interno do servidor ao processar imagem." });
    }
  });

  // Integrate Vite for single-page applications depending on the environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve pre-built static directory in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Server] running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
