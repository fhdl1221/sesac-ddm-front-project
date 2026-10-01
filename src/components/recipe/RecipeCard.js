"use client";
import Link from "next/link";
import { useFridgeStore } from "@/store/useFridgeStore";
import useStoreHydration from "@/store/useStoreHydration";

export default function RecipeCard({ recipe }) {
    const hasHydrated = useStoreHydration();
    const favorites = useFridgeStore((state) => state.favorites);
    const addFavorite = useFridgeStore((state) => state.addFavorite);
    const removeFavorite = useFridgeStore((state) => state.removeFavorite);
    const isFavorite = favorites.some((item) => item.id === recipe.id);

    const handleFavorite = () => {
        if (!hasHydrated) return;
        if (isFavorite) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <article className="recipe-card">
            <div className="recipe-image">
                {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} />
                ) : (
                    <span>이미지 없음</span>
                )}
                <span className="recipe-time">
                    {recipe.readyInMinutes
                        ? `${recipe.readyInMinutes}분`
                        : "..."}
                </span>
            </div>

            <div className="recipe-content">
                <div className="recipe-title-row">
                    <h2>{recipe.title}</h2>
                    <button
                        type="button"
                        className="favorite-button"
                        disabled={!hasHydrated}
                        onClick={handleFavorite}
                        aria-label="찜하기"
                    >
                        {isFavorite ? "❤️" : "🩶"}
                    </button>
                </div>

                <div className="recipe-ingredients">
                    <span className="ingredient-used">
                        사용할 재료 {recipe.usedIngredientCount}개
                    </span>
                    <span className="ingredient-missing">
                        부족한 재료 {recipe.missedIngredientCount}개
                    </span>
                </div>
                <Link href={`/recipes/${recipe.id}`} className="detail-button">
                    레시피 보기
                </Link>
            </div>
        </article>
    );
}
