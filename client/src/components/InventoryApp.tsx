import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import EditProductModal from "./EditProductModal";
import type { Product, InsertProduct } from "@shared/schema";

// API functions for product operations
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const createProduct = async (productData: InsertProduct): Promise<Product> => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  
  return response.json();
};

const updateProduct = async ({ id, updates }: { id: string; updates: InsertProduct }): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  
  return response.json();
};

const deleteProduct = async (productId: string): Promise<void> => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

export default function InventoryApp() {
  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = useState<"list" | "add">("list");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products using React Query
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    queryFn: fetchProducts,
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setCurrentView("list");
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setEditingProduct(null);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    },
  });

  const handleAddProduct = (productData: InsertProduct) => {
    createProductMutation.mutate(productData);
  };

  const handleEditProduct = (productId: string, updates: InsertProduct) => {
    updateProductMutation.mutate({ id: productId, updates });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      deleteProductMutation.mutate(productId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-destructive">Error loading products. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (currentView === "add") {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <AddProductForm
            onSubmit={handleAddProduct}
            onCancel={() => setCurrentView("list")}
            isSubmitting={createProductMutation.isPending}
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
          isSubmitting={updateProductMutation.isPending}
        />
      </div>
    </div>
  );
}