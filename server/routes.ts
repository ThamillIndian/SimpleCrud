import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  /**
   * GET /api/products - Fetches and returns the entire list of products from db.json
   */
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  /**
   * POST /api/products - Receives product data in the request body, adds a new product with a unique ID to db.json, and returns the newly created product
   */
  app.post("/api/products", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertProductSchema.parse(req.body);
      
      // Create the product
      const newProduct = await storage.createProduct(validatedData);
      
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
      }
    }
  });

  /**
   * PUT /api/products/:id - Receives updated product data in the request body, finds the product with the matching :id in db.json, updates it, and returns the updated product
   */
  app.put("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate request body using Zod schema
      const validatedData = insertProductSchema.parse(req.body);
      
      // Update the product
      const updatedProduct = await storage.updateProduct(id, validatedData);
      
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
      }
    }
  });

  /**
   * DELETE /api/products/:id - Finds the product with the matching :id in db.json, removes it, and returns a confirmation message
   */
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Delete the product
      const deleted = await storage.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
