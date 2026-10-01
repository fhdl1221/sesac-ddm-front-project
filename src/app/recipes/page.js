"use client";

import { useEffect, useState } from "react";
import { getIngredients } from "@/lib/fridgeApi";
import { getRecipeDetail, getRecipesByIngredients } from "@/lib/spoonacular";
import RecipeGrid from "@/components/recipe/RecipeGrid";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [time, setTime] = useState("");
    const [ingredientCount, setIngredientCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        const loadingIngredients = async () => {
            try {
                setIsLoading(true);
                setError("");

                const ingredients = await getIngredients();

                setIngredientCount(ingredients.length);

                if (ingredients.length === 0) {
                    setRecipes([]);
                    return;
                }

                const ingredientNames = ingredients.map((item) => item.name);
                const recipeData = await getRecipesByIngredients(
                    ingredientNames,
                    controller.signal,
                );
                setRecipes(recipeData);

                const recipesWithTime = await Promise.all(
                    recipeData.map(async (recipe) => {
                        try {
                            const detail = await getRecipeDetail(
                                recipe.id,
                                controller.signal,
                            );
                            return {
                                ...recipe,
                                readyInMinutes: detail.readyInMinutes,
                            };
                        } catch (err) {
                            return recipe;
                        }
                    }),
                );

                setRecipes(recipesWithTime);
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }

                setError("레시피를 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        };
        loadingIngredients();

        return () => {
            controller.abort();
        };
    }, [reload]);

    const handleRefresh = () => {
        setReload((value) => value + 1);
    };

    return (
        <section className="page-container">
            <div className="recipe-page-header">
                <div>
                    <h2>추천 레시피</h2>
                    <p>냉장고 속 재료를 활용할 수 있는 레시피를 추천해드려요</p>
                </div>
                <button
                    type="button"
                    className="refresh-button"
                    onClick={handleRefresh}
                >
                    ↻ 다시 추천받기
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <div className="loading-state">레시피를 불러오는 중...</div>
            ) : (
                <RecipeGrid recipes={recipes} />
            )}
        </section>
    );
}
