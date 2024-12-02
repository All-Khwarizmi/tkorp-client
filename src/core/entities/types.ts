/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export interface Animal {
  id: string;
  name: string;
  dateOfBirth: string;
  species: string;
  breed: string;
  color: string;
  weight: number;
  owner: Person;
  ownerId: number;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  animals: Animal[];
}

export interface AnimalSpeciesCount {
  species: string;
  count: number;
}

export interface OwnershipStats {
  owner: Person;
  animalCount: number;
}

export interface OwnerWeightStats {
  owner: Person;
  animalCount: number;
  totalWeight: number;
}

export interface OrderByInput {
  field: 'name' | 'dateOfBirth' | 'species' | 'breed' | 'weight';
  direction: 'ASC' | 'DESC';
}

// Using type aliases instead of empty interfaces
export type PaginatedAnimalResponse = PaginatedResponse<Animal>;
export type PaginatedPersonResponse = PaginatedResponse<Person>;
