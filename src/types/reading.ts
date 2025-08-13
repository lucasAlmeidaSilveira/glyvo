export type ReadingRequest = {
  userId: string;
  date: Date;
  value: number;
}

export type ReadingsResponse = {
  message: string;
  data: Reading[]
}

export type ReadingResponse = {
  message: string;
  data: Reading
}

export type Reading = {
  id: number,
  date: Date,
  meal: string,
  value: number,
}