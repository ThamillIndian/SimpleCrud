import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product, InsertProduct } from "@shared/schema";

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productId: string, updates: InsertProduct) => void;
  isSubmitting?: boolean;
}

export default function EditProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onSave, 
  isSubmitting = false 
}: EditProductModalProps) {
  const [formData, setFormData] = useState<InsertProduct>({
    name: "",
    sku: "",
    quantity: 0,
    description: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InsertProduct, string>>>({});

  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        quantity: product.quantity,
        description: product.description
      });
      setErrors({});
    }
  }, [product]);

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
    console.log('Edit product form submitted', formData);
    
    if (!product) return;
    
    if (validateForm()) {
      const productData = {
        ...formData,
        sku: formData.sku.toUpperCase(),
        quantity: Number(formData.quantity)
      };
      onSave(product.id, productData);
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

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setErrors({});
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-sm font-medium">
              Product Name
            </Label>
            <Input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter product name..."
              className={errors.name ? "border-destructive" : ""}
              data-testid="input-edit-product-name"
            />
            {errors.name && (
              <p className="text-sm text-destructive" data-testid="error-edit-product-name">
                {errors.name}
              </p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="edit-sku" className="text-sm font-medium">
              SKU (Stock Keeping Unit)
            </Label>
            <Input
              id="edit-sku"
              type="text"
              value={formData.sku}
              onChange={(e) => handleChange("sku", e.target.value.toUpperCase())}
              placeholder="e.g., LOGI-MX-M123"
              className={errors.sku ? "border-destructive" : ""}
              data-testid="input-edit-product-sku"
            />
            {errors.sku && (
              <p className="text-sm text-destructive" data-testid="error-edit-product-sku">
                {errors.sku}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="edit-quantity" className="text-sm font-medium">
              Quantity
            </Label>
            <Input
              id="edit-quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 0)}
              className={errors.quantity ? "border-destructive" : ""}
              data-testid="input-edit-product-quantity"
            />
            {errors.quantity && (
              <p className="text-sm text-destructive" data-testid="error-edit-product-quantity">
                {errors.quantity}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter product description..."
              rows={3}
              className={errors.description ? "border-destructive" : ""}
              data-testid="input-edit-product-description"
            />
            {errors.description && (
              <p className="text-sm text-destructive" data-testid="error-edit-product-description">
                {errors.description}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="button-save-edit"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}