// ✅ name에 기본값 할당 (에러 방지)
function normalizeIngredientName(name = "") {
    return name.toLowerCase().replace(/\s+/g, " ").trim();
}

// ✅ 기본적으로 보유하고 있다고 간주할 팬트리(양념/필수류) 키워드 목록
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

                // 1. 내 냉장고에 있는 재료인지 확인 (이전의 유연한 포함 검사 로직)
                const inFridge = ownedIngredients.some((owned) => {
                    const ownedName = normalizeIngredientName(owned.name);
                    if (!ownedName) return false;

                    return (
                        recipeName.includes(ownedName) ||
                        recipeCleanName.includes(ownedName)
                    );
                });

                // 2. 기본 팬트리 재료인지 확인
                const isPantry = PANTRY_KEYWORDS.some(
                    (keyword) =>
                        recipeName.includes(keyword) ||
                        recipeCleanName.includes(keyword),
                );

                // ✅ 냉장고에 있거나(inFridge) 기본 양념류(isPantry)라면 '보유'로 처리
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
