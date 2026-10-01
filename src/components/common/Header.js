"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFridgeStore } from "@/store/useFridgeStore";

export default function Header() {
    const pathname = usePathname();

    const isFridgePage = pathname === "/";
    const isRecipePage = pathname.startsWith("/recipes");
    const isFavoritePage = pathname.startsWith("/favorites");

    const cartCount = useFridgeStore((state) => state.cart.length);

    return (
        <header className="header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    냉장고민
                </Link>

                <nav className="main-nav">
                    <Link
                        href="/"
                        className={`nav-item ${isFridgePage ? "active" : ""}`}
                    >
                        내 냉장고
                    </Link>
                    <Link
                        href="/recipes"
                        className={`nav-item ${isRecipePage ? "active" : ""}`}
                    >
                        오늘 뭐 먹지?
                    </Link>
                    <Link
                        href="/favorites"
                        className={`nav-item ${isFavoritePage ? "active" : ""}`}
                    >
                        찜한 레시피
                    </Link>
                </nav>

                <div className="header-right">
                    <Link
                        href="/cart"
                        className="profile-button"
                        aria-label="장바구니"
                    >
                        🛒
                        {cartCount > 0 && (
                            <span className="cart-count-badge">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
