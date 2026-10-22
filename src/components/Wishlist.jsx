
import "./Wishlist.css";
import Header from "./Header.jsx";

export default function Wishlist({ wishlist, dispatch }) {
  return (
    <div className="wishlist-page">
      <Header />
      <h2>My Wishlist ❤️ ({wishlist.length})</h2>

      {wishlist.length === 0 ? (
        <p>No products added to your wishlist yet.</p>
      ) : (
        <>
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
          >
            Clear Wishlist
          </button>

          <div className="wishlist-grid">
            {wishlist.map(product => (
              <div className="wishlist-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <button
                  onClick={() =>
                    dispatch({
                      type: "REMOVE",
                      id: product.id
                    })
                  }
                >
                  ❤️ Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
