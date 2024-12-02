import { apolloClient } from '../graphql/apollo-client';
import { PERSONS_QUERY, PERSON_QUERY, STATISTICS_QUERIES } from '../graphql/queries';
import type {
  Person,
  PaginatedPersonResponse,
  OwnershipStats,
  OwnerWeightStats,
} from '../../core/entities/types';

export class PersonRepository {
  async getPersons(page: number, take: number): Promise<PaginatedPersonResponse> {
    const { data } = await apolloClient.query({
      query: PERSONS_QUERY,
      variables: { page, take },
    });
    return data.persons;
  }

  async getPerson(id: number): Promise<Person> {
    const { data } = await apolloClient.query({
      query: PERSON_QUERY,
      variables: { id },
    });
    return data.person;
  }

  async getTopOwner(): Promise<OwnershipStats> {
    const { data } = await apolloClient.query({
      query: STATISTICS_QUERIES.TOP_OWNER,
    });
    return data.topOwner;
  }

  async getTopCatOwner(): Promise<OwnershipStats> {
    const { data } = await apolloClient.query({
      query: STATISTICS_QUERIES.TOP_CAT_OWNER,
    });
    return data.topCatOwner;
  }

  async getOwnerWithHeaviestPets(): Promise<OwnerWeightStats> {
    const { data } = await apolloClient.query({
      query: STATISTICS_QUERIES.OWNER_WITH_HEAVIEST_PETS,
    });
    return data.ownerWithHeaviestPets;
  }
}
