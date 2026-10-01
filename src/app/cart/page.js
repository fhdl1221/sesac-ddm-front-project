"use client";

import useStoreHydration from "@/store/useStoreHydration";
import { useFridgeStore } from "@/store/useFridgeStore";
import CartList from "@/components/cart/CartList";

export default function CartPage() {
    const hasHydrated = useStoreHydration();
    const cart = useFridgeStore((state) => state.cart);
    const clearCart = useFridgeStore((state) => state.clearCart);

    if (!hasHydrated) {
        return <div className="loading-state">장바구니를 불러오는 중...</div>;
    }

    return (
        <section className="page-container">
            <div className="page-header cart-header">
                <div>
                    <h2>장바구니</h2>
                    <p>
                        레시피를 만들기 위해 필요한 부족한 재료를 확인해보세요
                    </p>
                </div>
                {cart.length > 0 && (
                    <button
                        type="button"
                        className="refresh-button"
                        onClick={() => {
                            clearCart();
                        }}
                    >
                        전체 삭제
                    </button>
                )}
            </div>

            {cart.length === 0 ? (
                <div className="empty-state cart-empty-state">
                    <div className="empty-icon">🛒</div>
                    <h3>장바구니가 비어 있습니다.</h3>
                    <p>레시피 상세 페이지에서 부족한 재료를 담아보세요.</p>
                </div>
            ) : (
                <CartList cart={cart} />
            )}
        </section>
    );
}
