import { clsx, type ClassValue } from "clsx";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}


//eslint-disable-next-line
export const withErrorHandler = (handler: Function) => {
  //eslint-disable-next-line
  return async (request: NextRequest, context: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
};