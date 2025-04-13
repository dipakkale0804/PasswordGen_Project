import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Basic health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SecureVault API is running' });
  });

  // This application primarily runs client-side for security purposes
  // We only need minimal server endpoints

  const httpServer = createServer(app);
  return httpServer;
}
