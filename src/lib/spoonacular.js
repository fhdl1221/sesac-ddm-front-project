const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

function checkApiKey() {
    if (!API_KEY) throw new Error("API Key가 유효하지 않습니다");
}

function normalizeIngredientName(name = "") {
    return name.toLowerCase().replace(/\s+/g, " ").trim();
}

function getUniqueIngredientNames(ingredients) {
    return [
        ...new Set(
            ingredients
                .map((ingredient) => {
                    if (typeof ingredient === "string")
                        return normalizeIngredientName(ingredient);

                    return normalizeIngredientName(ingredient.name);
                })
                .filter(Boolean),
        ),
    ];
}

async function findByIngredients(ingredientNames, signal) {
    checkApiKey();

    const uniqueIngredients = getUniqueIngredientNames(ingredientNames);

    if (uniqueIngredients.length === 0) return [];

    const params = new URLSearchParams({
        apiKey: API_KEY,
        ingredients: uniqueIngredients.join(","),
        ranking: "2",
        ignorePantry: "true",
        number: 3,
    });

    const response = await fetch(
        `${BASE_URL}/recipes/findByIngredients?${params.toString()}`,
        { signal },
    );

    if (!response.ok) {
        throw new Error("재료를 불러오지 못했습니다");
    }

    return response.json();
}

export async function getRecipesByIngredients(ingredients, signal) {
    const data = await findByIngredients(ingredients, signal);

    data.sort((a, b) => {
        if (a.missedIngredientCount !== b.missedIngredientCount)
            return a.missedIngredientCount - b.missedIngredientCount;

        return b.usedIngredientCount - a.usedIngredientCount;
    });

    return data;
}

export async function getMissingIngredientsForRecipe(
    recipeId,
    ingredients,
    signal,
) {
    const data = await findByIngredients(ingredients, signal);

    const recipe = data.find((item) => Number(item.id) === Number(recipeId));

    if (!recipe) return [];

    return recipe?.missedIngredients;
}

export async function getRecipeDetail(recipeId, signal) {
    checkApiKey();

    const params = new URLSearchParams({
        apiKey: API_KEY,
        includeNurition: "false",
    });

    const response = await fetch(
        `${BASE_URL}/recipes/${recipeId}/information?${params.toString()}`,
        { signal },
    );

    if (!response.ok) throw new Error("레시피 정보를 불러오지 못했습니다");

    return response.json();
}
