export interface Hero {
  id: string;
  name: string;
  nickname: string;
  dateOfBirth: string;
  universe: string;
  mainPower: string;
  avatarUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedHeroes {
  data: Hero[];
  total: number;
  page: number;
  limit: number;
}