"use client";

import useStoreHydration from "@/store/useStoreHydration";
import { useFridgeStore } from "@/store/useFridgeStore";
import FavoriteRecipeCard from "@/components/favorite/FavoriteRecipeCard";

export default function FavoritesPage() {
    const hasHydrated = useStoreHydration();
    const favorites = useFridgeStore((state) => state.favorites);

    if (!hasHydrated) {
        return (
            <div className="loading-state">찜한 레시피를 불러오는 중...</div>
        );
    }

    return (
        <section className="page-container">
            <div className="page-header">
                <div>
                    <h2>찜한 레시피</h2>
                    <p>마음에 드는 레시피를 모아볼 수 있어요</p>
                </div>
                <div className="ingredient-count">
                    <strong>{favorites.length}</strong>
                    <span>개의 레시피</span>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">❤️</div>
                    <h3>찜한 레시피가 없습니다.</h3>
                    <p>마음에 드는 레시피의 하트 버튼을 눌러보세요.</p>
                </div>
            ) : (
                <div className="recipe-grid">
                    {favorites.map((recipe) => (
                        <FavoriteRecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </section>
    );
}
