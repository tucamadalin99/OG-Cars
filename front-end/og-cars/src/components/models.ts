export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Review{
  userId: string,
  message: string,
  rating: number
}

export interface Car{
  make: string,
  model: string,
  type: string,
  fuel: string,
  reviews: Review[]
}
