import RecipeIngredientList from "./RecipeIngredientList";

function stripHtml(html = "") {
    return html.replace(/<[^>]*>/g, "");
}

export default function RecipeDetail({
    recipe,
    ownedIngredients,
    onAddToCart,
    isFavorite,
    onToggleFavorite,
    hasHydrated,
}) {
    const instructions = recipe.analyzedInstructions?.[0]?.steps || [];

    return (
        <>
            <div className="recipe-detail">
                <div className="recipe-detail-image">
                    {recipe.image ? (
                        <img src={recipe.image} alt={recipe.title} />
                    ) : (
                        <span>🍳</span>
                    )}
                </div>

                <div className="recipe-detail-content">
                    <button
                        type="button"
                        className="favorite-detail-button"
                        disabled={!hasHydrated}
                        onClick={onToggleFavorite}
                    >
                        {isFavorite ? "❤️" : "🩶"}
                    </button>

                    <span className="recipe-category">오늘의 추천 레시피</span>
                    <h1>{recipe.title}</h1>
                    <p className="recipe-description">
                        {stripHtml(
                            recipe.summary || "추천 레시피를 확인해보세요.",
                        )}
                    </p>

                    <div className="recipe-meta">
                        <div>
                            <span>⏱</span>
                            <strong>{recipe.readyInMinutes ?? "-"}분</strong>
                            <small>조리시간</small>
                        </div>
                        <div>
                            <span>🍽</span>
                            <strong>{recipe.servings ?? "-"}인분</strong>
                            <small>인분</small>
                        </div>
                    </div>

                    <div className="recipe-detail-actions">
                        <button
                            type="button"
                            className="primary-button"
                            onClick={onAddToCart}
                        >
                            부족한 재료 장바구니 담기
                        </button>
                    </div>
                </div>
            </div>

            <div className="recipe-detail-grid">
                <section className="recipe-detail-section">
                    <h2>필요한 재료</h2>
                    <RecipeIngredientList
                        ingredients={recipe.extendedIngredients || []}
                        ownedIngredients={ownedIngredients}
                    />
                </section>

                <section className="recipe-detail-section">
                    <h2>만드는 방법</h2>
                    {instructions.length > 0 ? (
                        <ol className="cooking-steps">
                            {instructions.map((step) => (
                                <li key={step.number}>
                                    <span>{step.number}</span>
                                    <p>{step.step}</p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="no-data">
                            조리 방법이 제공되지 않았습니다.
                        </p>
                    )}
                </section>
            </div>
        </>
    );
}
