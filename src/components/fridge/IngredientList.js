import IngredientCard from "./IngredientCard";

export default function IngredientList({
    ingredients,
    onUpdateQuantity,
    onDelete,
}) {
    if (ingredients.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🥬</div>
                <h3>등록된 식재료가 없습니다.</h3>
                <p>위에서 냉장고 속 재료를 추가해주세요.</p>
            </div>
        );
    }

    const sortedIngredients = [...ingredients].sort((a, b) => {
        // 소비기한이 없는 경우 맨 뒤로
        if (!a.expirationDate) return 1;
        if (!b.expirationDate) return -1;

        // 소비기한이 같은 경우 이름순 정렬
        if (a.expirationDate === b.expirationDate) {
            return a.name.localeCompare(b.name);
        }

        return new Date(a.expirationDate) - new Date(b.expirationDate);
    });

    return (
        <div className="ingredient-grid">
            {sortedIngredients.map((ingredient) => (
                <IngredientCard
                    key={ingredient.id}
                    ingredient={ingredient}
                    onUpdateQuantity={onUpdateQuantity}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
