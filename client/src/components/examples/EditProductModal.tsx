import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EditProductModal from '../EditProductModal';
import type { Product } from "@shared/schema";

// TODO: remove mock functionality
const mockProduct: Product = {
  id: "1",
  name: "Wireless Bluetooth Mouse",
  sku: "LOGI-MX-M123",
  quantity: 150,
  description: "Ergonomic wireless mouse with 6 programmable buttons and long battery life"
};

export default function EditProductModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Edit Modal
      </Button>
      
      <EditProductModal
        product={mockProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={(id, updates) => {
          console.log('Save product:', id, updates);
          setIsOpen(false);
        }}
        isSubmitting={false}
      />
    </div>
  );
}