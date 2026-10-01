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

    // 유제품
    if (lowerName.includes("egg")) return "🥚";
    if (lowerName.includes("milk")) return "🥛";
    if (lowerName.includes("cheese")) return "🧀";
    if (lowerName.includes("butter") || lowerName.includes("margarine")) return "🧈";

    // 고기류
    if (lowerName.includes("chicken") || lowerName.includes("poultry")) return "🍗";
    if (lowerName.includes("beef") || lowerName.includes("steak") || lowerName.includes("meat")) return "🥩";
    if (lowerName.includes("pork") || lowerName.includes("bacon")) return "🥓";
    if (lowerName.includes("ham") || lowerName.includes("sausage")) return "🌭";

    // 해산물
    if (lowerName.includes("fish") || lowerName.includes("salmon") || lowerName.includes("tuna")) return "🐟";
    if (lowerName.includes("shrimp") || lowerName.includes("prawn")) return "🍤";
    if (lowerName.includes("crab")) return "🦀";
    if (lowerName.includes("squid") || lowerName.includes("octopus")) return "🦑";
    if (lowerName.includes("lobster")) return "🦞";
    if (lowerName.includes("oyster") || lowerName.includes("clam")) return "🦪";

    // 채소류
    if (lowerName.includes("tomato")) return "🍅";
    if (lowerName.includes("onion")) return "🧅";
    if (lowerName.includes("potato")) return "🥔";
    if (lowerName.includes("carrot")) return "🥕";
    if (lowerName.includes("garlic")) return "🧄";
    if (lowerName.includes("broccoli")) return "🥦";
    if (lowerName.includes("cucumber")) return "🥒";
    if (lowerName.includes("corn")) return "🌽";
    if (lowerName.includes("mushroom")) return "🍄";
    if (lowerName.includes("pepper") || lowerName.includes("chili")) return "🌶️";
    if (lowerName.includes("bell pepper") || lowerName.includes("paprika")) return "🫑";
    if (lowerName.includes("eggplant")) return "🍆";
    if (lowerName.includes("sweet potato")) return "🍠";
    if (lowerName.includes("cabbage") || lowerName.includes("lettuce")) return "🥬";
    if (lowerName.includes("avocado")) return "🥑";
    if (lowerName.includes("pea")) return "🫛";
    if (lowerName.includes("bean") || lowerName.includes("soy")) return "🫘";

    // 과일류
    if (lowerName.includes("apple")) return "🍎";
    if (lowerName.includes("banana")) return "🍌";
    if (lowerName.includes("orange") || lowerName.includes("tangerine")) return "🍊";
    if (lowerName.includes("lemon") || lowerName.includes("lime")) return "🍋";
    if (lowerName.includes("strawberry")) return "🍓";
    if (lowerName.includes("grape")) return "🍇";
    if (lowerName.includes("watermelon")) return "🍉";
    if (lowerName.includes("melon")) return "🍈";
    if (lowerName.includes("peach")) return "🍑";
    if (lowerName.includes("cherry")) return "🍒";
    if (lowerName.includes("pineapple")) return "🍍";
    if (lowerName.includes("mango")) return "🥭";
    if (lowerName.includes("kiwi")) return "🥝";
    if (lowerName.includes("pear")) return "🍐";
    if (lowerName.includes("blueberry") || lowerName.includes("berry")) return "🫐";
    if (lowerName.includes("coconut")) return "🥥";

    // 곡물/탄수화물 
    if (lowerName.includes("bread") || lowerName.includes("toast")) return "🍞";
    if (lowerName.includes("rice")) return "🍚";
    if (lowerName.includes("noodle") || lowerName.includes("ramen")) return "🍜";
    if (lowerName.includes("pasta") || lowerName.includes("spaghetti")) return "🍝";
    if (lowerName.includes("flour") || lowerName.includes("wheat")) return "🌾";

    // 양념 및 기타
    if (lowerName.includes("salt") || lowerName.includes("sugar") || lowerName.includes("powder")) return "🧂";
    if (lowerName.includes("honey")) return "🍯";
    if (lowerName.includes("oil") || lowerName.includes("olive")) return "🫒";
    if (lowerName.includes("sauce") || lowerName.includes("ketchup") || lowerName.includes("paste")) return "🥫";
    if (lowerName.includes("chocolate") || lowerName.includes("cacao")) return "🍫";
    if (lowerName.includes("ice")) return "🧊"; 

    return "🥣";
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
