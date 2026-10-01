const API_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
const INGREDIENT_URL = `${API_URL}/ingredients`;

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error("응답을 불러오지 못했습니다");
    }
    return response.json();
}

// GET
export async function getIngredients() {
    // TODO
    const response = await fetch(INGREDIENT_URL);

    return handleResponse(response);
}

// POST
export async function createIngredient(ingredient) {
    const response = await fetch(INGREDIENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredient),
    });

    return handleResponse(response);
}

// PATCH
export async function updateIngredient(id, data) {
    const response = await fetch(`${INGREDIENT_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return handleResponse(response);
}

// DELETE
export async function deleteIngredient(id) {
    const response = await fetch(`${INGREDIENT_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("재료를 삭제하지 못했습니다");
    }

    return true;
}
