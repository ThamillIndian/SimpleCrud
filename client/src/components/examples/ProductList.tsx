import ProductList from '../ProductList';
import type { Product } from "@shared/schema";

// TODO: remove mock functionality
const mockProducts: Product[] = [
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
    quantity: 8,
    description: "7-in-1 USB-C hub with HDMI, USB ports, SD card reader, and power delivery"
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    sku: "KEYS-MX-PRO", 
    quantity: 0,
    description: "RGB backlit mechanical keyboard with Cherry MX switches"
  }
];

export default function ProductListExample() {
  return (
    <div className="p-4">
      <ProductList
        products={mockProducts}
        onEdit={(product) => console.log('Edit product:', product)}
        onDelete={(id) => console.log('Delete product:', id)} 
        onAdd={() => console.log('Add product clicked')}
      />
    </div>
  );
}