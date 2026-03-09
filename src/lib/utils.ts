import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % chars.length];
    }
    return result;
}

export function snakeCaseToTitleCase(str: string): string {
    if (!str) return "";
    return str.split("_").map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}