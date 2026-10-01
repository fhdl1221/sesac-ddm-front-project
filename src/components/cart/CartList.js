import CartItem from "./CartItem";

export default function CartList({ cart }) {
    return (
        <div className="cart-list">
            {cart.map((ingredient, index) => (
                <CartItem key={`${ingredient.name}-${index}`} ingredient={ingredient} />
            ))}
        </div>
    );
}
