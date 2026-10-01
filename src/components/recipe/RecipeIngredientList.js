function normalizeIngredientName(name = "") {
    return name.toLowerCase().replace(/\s+/g, " ").trim();
}

// 기본적으로 보유하고 있다고 간주할 팬트리 키워드 목록
const PANTRY_KEYWORDS = [
    "oil",
    "salt",
    "pepper",
    "water",
    "sugar",
    "butter",
    "flour",
    "vinegar",
    "soy sauce",
    "garlic",
];

export default function RecipeIngredientList({
    ingredients,
    ownedIngredients,
}) {
    return (
        <div className="ingredient-list">
            {ingredients.map((ingredient) => {
                const recipeName = normalizeIngredientName(ingredient.name);
                const recipeCleanName = normalizeIngredientName(
                    ingredient.nameClean,
                );

                const inFridge = ownedIngredients.some((owned) => {
                    const ownedName = normalizeIngredientName(owned.name);
                    if (!ownedName) return false;

                    return (
                        recipeName.includes(ownedName) ||
                        recipeCleanName.includes(ownedName)
                    );
                });

                const isPantry = PANTRY_KEYWORDS.some(
                    (keyword) =>
                        recipeName.includes(keyword) ||
                        recipeCleanName.includes(keyword),
                );

                const isOwned = inFridge || isPantry;

                return (
                    <div
                        className="detail-ingredient"
                        key={`${ingredient.name}-${ingredient.id}`}
                    >
                        <span>🛒</span>
                        <span className="detail-name">{ingredient.name}</span>
                        <span className="detail-quantity">
                            {ingredient.amount} {ingredient.unit}
                        </span>
                        <span
                            className={`ingredient-status ${isOwned ? "have" : "missing"}`}
                        >
                            {isOwned ? "보유" : "부족"}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
