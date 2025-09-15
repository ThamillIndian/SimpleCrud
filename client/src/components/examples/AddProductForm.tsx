import AddProductForm from '../AddProductForm';

export default function AddProductFormExample() {
  return (
    <div className="min-h-screen bg-background p-4">
      <AddProductForm
        onSubmit={(product) => console.log('Add product:', product)}
        onCancel={() => console.log('Add product cancelled')}
        isSubmitting={false}
      />
    </div>
  );
}