import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const errorCatcher = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.log("error", error);
      throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
  }
}

export function serializeData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}