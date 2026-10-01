import { getExpirationInfo } from "@/lib/dateUtils";

const storageLabels = {
    refrigerator: "냉장실",
    freezer: "냉동실",
    room: "실온",
};

const unitLabels = {
    ea: "개",
    g: "g",
    kg: "kg",
    pack: "팩",
    bottle: "병",
    can: "캔",
};

function getIngredientEmoji(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("egg")) return "🥚";
    if (lowerName.includes("tomato")) return "🍅";
    if (lowerName.includes("chicken")) return "🍗";
    if (lowerName.includes("onion")) return "🧅";
    if (lowerName.includes("milk")) return "🥛";
    if (lowerName.includes("potato")) return "🥔";
    if (lowerName.includes("carrot")) return "🥕";
    if (lowerName.includes("apple")) return "🍎";
    if (lowerName.includes("banana")) return "🍌";
    if (lowerName.includes("beef")) return "🥩";
    if (lowerName.includes("pork")) return "🥓";
    if (lowerName.includes("fish")) return "🐟";
    return "🥬";
}

export default function IngredientCard({
    ingredient,
    onUpdateQuantity,
    onDelete,
}) {
    const expirationInfo = getExpirationInfo(ingredient.expirationDate);

    return (
        <article className="ingredient-card">
            <div className="ingredient-card-top">
                <div className="ingredient-icon">
                    {getIngredientEmoji(ingredient.name)}
                </div>
                <button
                    type="button"
                    className="delete-button"
                    onClick={() => {
                        onDelete(ingredient.id);
                    }}
                    aria-label={`${ingredient.name} 삭제`}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>

            <div className="ingredient-info">
                <h3>{ingredient.name}</h3>
                <span className={`storage-badge ${ingredient.storage}`}>
                    {storageLabels[ingredient.storage]}
                </span>
                <p className={`expiration ${expirationInfo.className}`}>
                    {expirationInfo.text}
                </p>
            </div>

            <div className="quantity-control">
                <button
                    type="button"
                    disabled={ingredient.quantity <= 1}
                    onClick={() => {
                        onUpdateQuantity(ingredient.id, -1);
                    }}
                >
                    -
                </button>
                <span>
                    {ingredient.quantity}
                    {unitLabels[ingredient.unit] || ingredient.unit}
                </span>
                <button
                    type="button"
                    onClick={() => {
                        onUpdateQuantity(ingredient.id, 1);
                    }}
                >
                    +
                </button>
            </div>
        </article>
    );
}
