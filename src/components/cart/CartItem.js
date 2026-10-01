"use client";

import { useFridgeStore } from "@/store/useFridgeStore";

export default function CartItem({ ingredient }) {
    const removeFromCart = useFridgeStore((state) => state.removeFromCart);

    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <strong>{ingredient.name}</strong>
                <p>
                    {ingredient.amount ?? ""} {ingredient.unit ?? ""}
                </p>
            </div>
            <button
                type="button"
                className="cart-delete-button" 
                onClick={() => {
                    removeFromCart(ingredient.name);
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    );
}
