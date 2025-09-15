import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import type { InsertProduct } from "@shared/schema";

interface AddProductFormProps {
  onSubmit: (product: InsertProduct) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function AddProductForm({ onSubmit, onCancel, isSubmitting = false }: AddProductFormProps) {
  const [formData, setFormData] = useState<InsertProduct>({
    name: "",
    sku: "",
    quantity: 0,
    description: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InsertProduct, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InsertProduct, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    } else if (!/^[A-Z0-9-]+$/.test(formData.sku.toUpperCase())) {
      newErrors.sku = "SKU should contain only letters, numbers, and hyphens";
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add product form submitted', formData);
    
    if (validateForm()) {
      // Convert SKU to uppercase for consistency
      const productData = {
        ...formData,
        sku: formData.sku.toUpperCase(),
        quantity: Number(formData.quantity)
      };
      onSubmit(productData);
    }
  };

  const handleChange = (field: keyof InsertProduct, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold">Add New Product</CardTitle>
        <Button
          size="icon"
          variant="ghost"
          onClick={onCancel}
          data-testid="button-cancel-add"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Product Name
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter product name..."
              className={errors.name ? "border-destructive" : ""}
              data-testid="input-product-name"
            />
            {errors.name && (
              <p className="text-sm text-destructive" data-testid="error-product-name">
                {errors.name}
              </p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku" className="text-sm font-medium">
              SKU (Stock Keeping Unit)
            </Label>
            <Input
              id="sku"
              type="text"
              value={formData.sku}
              onChange={(e) => handleChange("sku", e.target.value.toUpperCase())}
              placeholder="e.g., LOGI-MX-M123"
              className={errors.sku ? "border-destructive" : ""}
              data-testid="input-product-sku"
            />
            {errors.sku && (
              <p className="text-sm text-destructive" data-testid="error-product-sku">
                {errors.sku}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 0)}
              placeholder="0"
              className={errors.quantity ? "border-destructive" : ""}
              data-testid="input-product-quantity"
            />
            {errors.quantity && (
              <p className="text-sm text-destructive" data-testid="error-product-quantity">
                {errors.quantity}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description..."
              rows={3}
              className={errors.description ? "border-destructive" : ""}
              data-testid="input-product-description"
            />
            {errors.description && (
              <p className="text-sm text-destructive" data-testid="error-product-description">
                {errors.description}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="button-submit-add"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}