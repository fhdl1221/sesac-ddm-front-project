"use client";

import { useEffect, useState } from "react";
import {
    createIngredient,
    deleteIngredient,
    getIngredients,
    updateIngredient,
} from "@/lib/fridgeApi";
import useStoreHydration from "@/store/useStoreHydration";
import IngredientForm from "@/components/fridge/IngredientForm";
import IngredientList from "@/components/fridge/IngredientList";
import StorageTabs from "@/components/fridge/StorageTabs";

export default function Home() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useStoreHydration();

    const loadIngredients = async () => {
        setIsLoading(true);
        setError("");

        try {
            const ingredients = await getIngredients();
            setIngredients(ingredients);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadIngredients();
    }, []);

    const handleAddIngredient = async (ingredient) => {
        await createIngredient(ingredient);
        await loadIngredients();
    };

    const handleUpdateQuantity = async (id, amount) => {
        const ingredient = ingredients.find(
            (item) => Number(item.id) === Number(id),
        );

        if (!ingredient) return;

        let minQuantity = 1;
        if (ingredient.unit === "g" || ingredient.unit === "ml")
            minQuantity = 50;
        else if (ingredient.unit === "kg" || ingredient.unit === "L")
            minQuantity = 0.5;

        const newQuantity = Math.max(
            minQuantity,
            Number(ingredient.quantity) + amount,
        );

        await updateIngredient(id, {
            quantity: newQuantity,
        });

        await loadIngredients();
    };

    const handleDelete = async (id) => {
        const ingredient = ingredients.find(
            (item) => Number(item.id) === Number(id),
        );

        if (!ingredient) return;

        const confirmed = window.confirm(
            `${ingredient.name}을 삭제하시겠습니까?`,
        );

        if (!confirmed) return;

        await deleteIngredient(id);
        await loadIngredients();
    };

    const filteredIngredients =
        selectedStorage === "all"
            ? ingredients
            : ingredients.filter(
                  (ingredient) => ingredient.storage === selectedStorage,
              );

    return (
        <section className="page-container">
            <div className="home-content-layout">
                <IngredientForm onAddIngredient={handleAddIngredient} />

                <section className="fridge-section">
                    <div className="section-title">
                        <h2>보관 중인 재료</h2>
                        <p>냉장고 속 재료들을 관리해보세요.</p>
                    </div>
                    <div className="storage-header">
                        <StorageTabs
                            selectedStorage={selectedStorage}
                            onChange={setSelectedStorage}
                        />
                        <div className="ingredient-count">
                            <strong>{ingredients.length}</strong>
                            <span>개의 재료</span>
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {isLoading ? (
                        <div className="loading-state">
                            데이터를 불러오는 중입니다...
                        </div>
                    ) : (
                        <IngredientList
                            ingredients={filteredIngredients}
                            onUpdateQuantity={handleUpdateQuantity}
                            onDelete={handleDelete}
                        />
                    )}
                </section>
            </div>
        </section>
    );
}
