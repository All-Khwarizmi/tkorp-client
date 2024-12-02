import { apolloClient } from '../graphql/apollo-client';
import { ANIMALS_QUERY, ANIMAL_QUERY, STATISTICS_QUERIES } from '../graphql/queries';
import type {
  Animal,
  PaginatedAnimalResponse,
  AnimalSpeciesCount,
  OrderByInput,
} from '../../core/entities/types';

export class AnimalRepository {
  async getAnimals(
    page: number,
    take: number,
    orderBy?: OrderByInput
  ): Promise<PaginatedAnimalResponse> {
    const { data } = await apolloClient.query({
      query: ANIMALS_QUERY,
      variables: { page, take, orderBy },
    });
    return data.animals;
  }

  async getAnimal(id: number): Promise<Animal> {
    const { data } = await apolloClient.query({
      query: ANIMAL_QUERY,
      variables: { id },
    });
    return data.animal;
  }

  async getMostCommonSpecies(): Promise<AnimalSpeciesCount[]> {
    const { data } = await apolloClient.query({
      query: STATISTICS_QUERIES.MOST_COMMON_SPECIES,
    });
    return data.mostCommonSpecies;
  }

  async getHeaviestAnimal(): Promise<Animal> {
    const { data } = await apolloClient.query({
      query: STATISTICS_QUERIES.HEAVIEST_ANIMAL,
    });
    return data.heaviestAnimal;
  }

  async getOldestAnimal(): Promise<Animal> {
    const { data } = await apolloClient.query({
      query: STATISTICS_QUERIES.OLDEST_ANIMAL,
    });
    return data.oldestAnimal;
  }
}
