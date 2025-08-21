export type MealProps = {
  id: number;
  name: string;
};

export interface MealsResponse {
  message: string;
  data: MealProps[];
}
