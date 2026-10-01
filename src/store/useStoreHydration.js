"use client";

import { useEffect } from "react";
import { useFridgeStore } from "./useFridgeStore";

export default function useStoreHydration() {
    const hasHydrated = useFridgeStore((state) => state.hasHydrated);

    useEffect(() => {
        if (!hasHydrated) {
            useFridgeStore.persist.rehydrate();
        }
    }, [hasHydrated]);
    return hasHydrated;
}
