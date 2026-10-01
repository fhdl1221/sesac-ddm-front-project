"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFridgeStore = create(
    persist(
        (set, get) => ({
            favorites: [],
            cart: [],
            hasHydrated: false,

            setHasHydrated: (value) => {
                set({ hasHydrated: value });
            },

            addFavorite: (recipe) => {
                set((state) => {
                    const hasLike = state.favorites.some(
                        (item) => Number(item.id) === Number(recipe.id),
                    );

                    if (hasLike) {
                        return state;
                    }

                    const list = [
                        ...state.favorites,
                        {
                            id: recipe.id,
                            title: recipe.title,
                            image: recipe.image || "",
                        },
                    ];

                    return { favorites: list };
                });
            },

            removeFavorite: (recipeId) => {
                set((state) => ({
                    favorites: state.favorites.filter(
                        (item) => Number(item.id) !== Number(recipeId),
                    ),
                }));
            },

            isFavorite: (recipeId) => {
                return get().favorites.some(
                    (item) => Number(item.id) === Number(recipeId),
                );
            },

            addToCart: (ingredients) => {
                set((state) => {
                    const newCart = [...state.cart];

                    ingredients.forEach((ingredient) => {
                        const hasIngredient = newCart.some(
                            (item) => item.name === ingredient.name,
                        );

                        if (!hasIngredient) {
                            newCart.push(ingredient);
                        }
                    });

                    return { cart: newCart };
                });
            },

            removeFromCart: (name) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.name !== name),
                }));
            },

            clearCart: () => {
                set({ cart: [] });
            },
        }),
        {
            name: "fridge-storage",
            partialize: (state) => ({
                favorites: state.favorites,
                cart: state.cart,
            }),
            skipHydration: true,
            onRehydrateStorage: () => {
                return (state) => {
                    state?.setHasHydrated(true);
                };
            },
        },
    ),
);
