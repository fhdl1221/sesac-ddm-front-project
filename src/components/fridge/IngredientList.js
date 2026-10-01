import IngredientCard from "./IngredientCard";

export default function IngredientList({ ingredients, onUpdateQuantity, onDelete }) {
    if (ingredients.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🥬</div>
                <h3>등록된 식재료가 없습니다.</h3>
                <p>위에서 냉장고 속 재료를 추가해주세요.</p>
            </div>
        );
    }

    return (
        <div className="ingredient-grid">
            {ingredients.map((ingredient) => (
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
