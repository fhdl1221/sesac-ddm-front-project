"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getIngredients } from "@/lib/fridgeApi";
import {
    getMissingIngredientsForRecipe,
    getRecipeDetail,
} from "@/lib/spoonacular";
import { useFridgeStore } from "@/store/useFridgeStore";
import useStoreHydration from "@/store/useStoreHydration";
import RecipeDetail from "@/components/recipe/RecipeDetail";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [ownedIngredients, setOwnedIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const hasHydrated = useStoreHydration();
    const favorites = useFridgeStore((state) => state.favorites);
    const addFavorite = useFridgeStore((state) => state.addFavorite);
    const removeFavorite = useFridgeStore((state) => state.removeFavorite);
    const addToCart = useFridgeStore((state) => state.addToCart);

    const isFavorite = favorites.some((item) => Number(item.id) === Number(id));

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();

        const loadData = async () => {
            try {
                setIsLoading(true);
                setError("");
                const recipeDetail = await getRecipeDetail(
                    id,
                    controller.signal,
                );
                const ingredients = await getIngredients();

                setRecipe(recipeDetail);
                setOwnedIngredients(ingredients);
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }

                console.error(error);
                setError("레시피 정보를 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadData();

        return () => {
            controller.abort();
        };
    }, [id]);

    const handleToggleFavorite = () => {
        if (!hasHydrated) return;

        if (isFavorite) {
            removeFavorite(id); 
        } else {
            addFavorite(recipe); 
        }
    };

    const handleAddToCart = async () => {
        const controller = new AbortController();

        try {
            const ingredients = await getIngredients();
            const missing = await getMissingIngredientsForRecipe(
                id,
                ingredients,
                controller.signal,
            );

            addToCart(missing);
        } catch (error) {
            if (error.name === "AbortError") {
                return;
            }
            console.error(error);
        }
    };

    return (
        <section className="page-container">
            <Link href="/recipes" className="back-button">
                ← 레시피 목록으로
            </Link>

            {isLoading && (
                <div className="loading-state">
                    레시피 정보를 불러오는 중...
                </div>
            )}
            {error && <div className="error-message">{error}</div>}

            {!isLoading && !error && recipe && (
                <RecipeDetail
                    recipe={recipe}
                    ownedIngredients={ownedIngredients}
                    onAddToCart={handleAddToCart}
                    isFavorite={isFavorite}
                    onToggleFavorite={handleToggleFavorite}
                    hasHydrated={hasHydrated}
                />
            )}
        </section>
    );
}
