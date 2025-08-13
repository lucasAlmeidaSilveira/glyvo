import { ReadingRequest, ReadingResponse, ReadingsResponse } from "../types/reading";

export async function getUser(email: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}`);
    const { data } = await response.json();
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