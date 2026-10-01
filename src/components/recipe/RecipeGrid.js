import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }) {
    if (recipes.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🍳</div>
                <h3>추천할 레시피가 없습니다.</h3>
                <p>냉장고에 재료를 추가한 뒤 다시 확인해주세요.</p>
            </div>
        );
    }

    return (
        <div className="recipe-grid">
            {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
    );
}
