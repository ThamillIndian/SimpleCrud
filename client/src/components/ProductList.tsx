import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAdd: () => void;
}

export default function ProductList({ products, onEdit, onDelete, onAdd }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity < 10) return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  return (
    <div className="space-y-6">
      {/* Header with search and add button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Product Inventory</h1>
          <p className="text-sm text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button 
          onClick={onAdd} 
          className="flex items-center gap-2"
          data-testid="button-add-product"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search bar */}
      <div className="flex gap-4">
        <input
          type="search"
          placeholder="Search products, SKU, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
          data-testid="input-search-products"
        />
      </div>

      {/* Products table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {products.length === 0 ? "No products found. Add your first product to get started." : "No products match your search."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Product</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">SKU</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Quantity</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product.quantity);
                    return (
                      <tr 
                        key={product.id} 
                        className="hover-elevate"
                        data-testid={`row-product-${product.id}`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-foreground" data-testid={`text-product-name-${product.id}`}>
                              {product.name}
                            </div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs" title={product.description}>
                              {product.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded" data-testid={`text-product-sku-${product.id}`}>
                            {product.sku}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium" data-testid={`text-product-quantity-${product.id}`}>
                            {product.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={stockStatus.variant} data-testid={`badge-stock-status-${product.id}`}>
                            {stockStatus.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onEdit(product)}
                              data-testid={`button-edit-${product.id}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onDelete(product.id)}
                              data-testid={`button-delete-${product.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}