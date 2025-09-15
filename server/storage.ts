import { type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Storage interface for product CRUD operations
export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export class JSONFileStorage implements IStorage {
  private dbFilePath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    this.dbFilePath = join(__dirname, "db.json");
  }

  /**
   * Read the JSON database file and return parsed data
   */
  private async readDatabase(): Promise<{ products: Product[] }> {
    try {
      const data = await readFile(this.dbFilePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty structure
      return { products: [] };
    }
  }

  /**
   * Write data to the JSON database file
   */
  private async writeDatabase(data: { products: Product[] }): Promise<void> {
    await writeFile(this.dbFilePath, JSON.stringify(data, null, 2), "utf8");
  }

  /**
   * Get all products from the database
   */
  async getAllProducts(): Promise<Product[]> {
    const db = await this.readDatabase();
    return db.products;
  }

  /**
   * Get a single product by ID
   */
  async getProduct(id: string): Promise<Product | undefined> {
    const db = await this.readDatabase();
    return db.products.find(product => product.id === id);
  }

  /**
   * Create a new product and add it to the database
   */
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const db = await this.readDatabase();
    const id = randomUUID();
    const newProduct: Product = { ...insertProduct, id };
    
    db.products.push(newProduct);
    await this.writeDatabase(db);
    
    return newProduct;
  }

  /**
   * Update an existing product by ID
   */
  async updateProduct(id: string, updates: InsertProduct): Promise<Product | undefined> {
    const db = await this.readDatabase();
    const productIndex = db.products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return undefined;
    }
    
    const updatedProduct: Product = { 
      ...db.products[productIndex], 
      ...updates 
    };
    
    db.products[productIndex] = updatedProduct;
    await this.writeDatabase(db);
    
    return updatedProduct;
  }

  /**
   * Delete a product by ID
   */
  async deleteProduct(id: string): Promise<boolean> {
    const db = await this.readDatabase();
    const initialLength = db.products.length;
    
    db.products = db.products.filter(product => product.id !== id);
    
    if (db.products.length < initialLength) {
      await this.writeDatabase(db);
      return true;
    }
    
    return false;
  }
}

export const storage = new JSONFileStorage();
