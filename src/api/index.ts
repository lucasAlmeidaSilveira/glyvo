import { ReadingRequest, ReadingResponse, ReadingsResponse } from "../types/reading";
import type { UserDB, UserRequest, UserResponse } from "@/types/user";

export async function getUser(email: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}`);
    if(response.status === 404) {
      return null;
    }
    const { data }: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(body: UserRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const { data }: UserResponse = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function registerReading(body: ReadingRequest) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });   

    const data: ReadingResponse = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getReadings(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/readings/${userId}`);
    const data: ReadingsResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteReading(readingId: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/readings/${readingId}`, {
      method: 'DELETE',
    });
    const data: ReadingResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}