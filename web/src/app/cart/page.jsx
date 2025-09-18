"use client";
import { useCart } from "@/context/CartContext";
import DisplayCartItem from "@/components/Cart/DisplayCartItem";
import styles from "./page.module.css";
import Link from "next/link";

export default function CartPage() {
  const { cart, total } = useCart();

  return (
    <div style={{ padding: "2rem" }}>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your Cart Is Empty</p>
          <Link href="/plants">
            <button type="button" className={styles.backBtn}>
              Back To All Plants Page
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartFullPage}>
          <h1 className={styles.cartTitle}>Your Shopping Cart</h1>
          <div className={styles.cartPage}>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <DisplayCartItem cartItem={item} key={item.id} />
              ))}
            </div>
            <div className={styles.cartSummary}>
              <h2>Total: {total.toFixed(2)} DKK</h2>

              <button type="button" className={styles.purchaseBtn}>
                Purchase
              </button>
              <Link href="/plants">
                <button type="button" className={styles.backBtn}>
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
