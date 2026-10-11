import { expect } from "vitest";

// Congela un valor y todo lo que tiene dentro (objetos y arrays anidados)
export const deepFreeze = <T>(value: T): T => {
    if (value !== null && typeof value === "object") {
        Object.values(value).forEach(deepFreeze);
        Object.freeze(value);
    }
    return value;
};

// Llama a fn con una copia congelada de input y comprueba que:
// - no intenta mutarla (si lo hace, lanza un TypeError)
// - la copia sigue igual que el original
export const expectNoMutation = <T>(input: T, fn: (frozen: T) => unknown): void => {
    const before = structuredClone(input);
    const frozen = deepFreeze(structuredClone(input));
    expect(() => fn(frozen)).not.toThrow();
    expect(frozen).toEqual(before);
};
