
import Product from "./Product.jsx";

export default function ProductsGrid({
  products,
  loadCart,
  wishlist = [],
  toggleWishlist
}) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          loadCart={loadCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}
