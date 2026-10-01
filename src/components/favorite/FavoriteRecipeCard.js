"use client";
import Link from "next/link";
import { useFridgeStore } from "@/store/useFridgeStore";

export default function FavoriteRecipeCard({ recipe }) {
    const removeFavorite = useFridgeStore((state) => state.removeFavorite);

    return (
        <article className="recipe-card">
            <div className="recipe-image">
                {recipe.image ? (
                    <img src={recipe.image} alt={recipe.title} />
                ) : (
                    <span>이미지 없음</span>
                )}
            </div>
            <div className="recipe-content">
                <div className="recipe-title-row">
                    <h2>{recipe.title}</h2>
                    <button
                        type="button"
                        className="favorite-button"
                        onClick={() => {
                            removeFavorite(recipe.id);
                        }}
                        aria-label="찜 취소"
                    >
                        ❤️
                    </button>
                </div>

                <Link
                    href={`/recipes/${recipe.id}`}
                    className="detail-button"
                    style={{ marginTop: 8 }}
                >
                    레시피 보기
                </Link>
            </div>
        </article>
    );
}
