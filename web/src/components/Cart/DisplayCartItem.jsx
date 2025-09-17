import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";


export default function DisplayCartItem({ cartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
   <div className={styles.cartItem}>
      <img
        src={cartItem.imageUrl}
        alt={cartItem.name}
        className={styles.cartItemImage}
      />

      <div className={styles.cartItemDetails}>
        <p className={styles.cartItemName}>
          {cartItem.name} - {cartItem.price} DKK
        </p>
        <p>Quantity: {cartItem.quantity}</p>

        <div className={styles.cartItemActions}>
          <button onClick={() => updateQuantity(cartItem.id, -1)}>-</button>
          <button onClick={() => updateQuantity(cartItem.id, 1)}>+</button>
          <button onClick={() => removeFromCart(cartItem.id)}>Remove</button>
        </div>

        <p className={styles.cartItemSubtotal}>
          Subtotal: {cartItem.quantity * cartItem.price} DKK
        </p>
      </div>
    </div>

  );
}
