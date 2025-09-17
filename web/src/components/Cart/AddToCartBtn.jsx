import { useCart } from "../../context/CartContext";
import styles from "./page.module.css";

export default function AddToCartBtn({ id, name, price, imageUrl }) {
  const { addToCart, removeFromCart, cart } = useCart();

  // Check if this product is already in cart
  const inCart = cart.some((item) => item.id === id);

  function toggleCart() {
    if (inCart) {
      removeFromCart(id);
    } else {
      addToCart({ id, name, price, imageUrl });
    }
  }
  return (
    <button
      onClick={toggleCart}
      className={`${styles.cartBtn} ${styles.cartBtn_mobile} ${
        inCart ? styles.in_cart_button : styles.add_to_cart_button
      } `}
    >
      {inCart ? "In Cart" : "Add to Cart"}
    </button>
  );
}
