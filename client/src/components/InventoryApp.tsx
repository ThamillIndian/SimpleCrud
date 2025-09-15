import { useState } from "react";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import EditProductModal from "./EditProductModal";
import type { Product, InsertProduct } from "@shared/schema";

export default function InventoryApp() {
  // TODO: remove mock functionality - replace with real API calls
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Bluetooth Mouse",
      sku: "LOGI-MX-M123",
      quantity: 150,
      description: "Ergonomic wireless mouse with 6 programmable buttons and long battery life"
    },
    {
      id: "2", 
      name: "USB-C Hub",
      sku: "TECH-HUB-001",
      quantity: 75,
      description: "7-in-1 USB-C hub with HDMI, USB ports, SD card reader, and power delivery"
    },
    {
      id: "3",
      name: "Mechanical Keyboard",
      sku: "KEYS-MX-PRO",
      quantity: 5,
      description: "RGB backlit mechanical keyboard with Cherry MX switches"
    },
    {
      id: "4",
      name: "Webcam HD",
      sku: "CAM-HD-200",
      quantity: 0,
      description: "1080p HD webcam with built-in microphone for video conferencing"
    }
  ]);

  const [currentView, setCurrentView] = useState<"list" | "add">("list");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate simple ID for demo purposes
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddProduct = async (productData: InsertProduct) => {
    console.log('Adding product:', productData);
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProduct: Product = {
      id: generateId(),
      ...productData
    };
    
    setProducts(prev => [...prev, newProduct]);
    setCurrentView("list");
    setIsSubmitting(false);
    
    console.log('Product added successfully:', newProduct);
  };

  const handleEditProduct = async (productId: string, updates: InsertProduct) => {
    console.log('Editing product:', productId, updates);
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, ...updates }
        : product
    ));
    
    setEditingProduct(null);
    setIsSubmitting(false);
    
    console.log('Product updated successfully');
  };

  const handleDeleteProduct = async (productId: string) => {
    console.log('Deleting product:', productId);
    
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(prev => prev.filter(product => product.id !== productId));
      console.log('Product deleted successfully');
    }
  };

  if (currentView === "add") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <AddProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setCurrentView("list")}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <ProductList
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDeleteProduct}
          onAdd={() => setCurrentView("add")}
        />
        
        <EditProductModal
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleEditProduct}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}