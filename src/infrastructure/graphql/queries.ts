import { gql } from "@apollo/client";

export const ANIMALS_QUERY = gql`
  query GetAnimals($page: Int!, $take: Int!, $orderBy: OrderByInput) {
    animals(page: $page, take: $take, orderBy: $orderBy) {
      items {
        id
        name
        dateOfBirth
        species
        breed
        color
        weight
        owner {
          id
          firstName
          lastName
          email
        }
      }
      total
      hasMore
    }
  }
`;

export const ANIMAL_QUERY = gql`
  query GetAnimal($id: Int!) {
    animal(id: $id) {
      id
      name
      dateOfBirth
      species
      breed
      color
      weight
      owner {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;

export const PERSONS_QUERY = gql`
  query GetPersons($page: Int!, $take: Int!) {
    persons(page: $page, take: $take) {
      items {
        id
        firstName
        lastName
        email
        phoneNumber
        animals {
          id
          name
          species
        }
      }
      total
      hasMore
    }
  }
`;

export const PERSON_QUERY = gql`
  query GetPerson($id: Float!) {
    person(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        dateOfBirth
        species
        breed
        color
        weight
      }
    }
  }
`;

export const STATISTICS_QUERIES = {
  MOST_COMMON_SPECIES: gql`
    query GetMostCommonSpecies {
      mostCommonSpecies {
        species
        count
      }
    }
  `,

  TOP_OWNER: gql`
    query GetTopOwner {
      topOwner {
        owner {
          id
          firstName
          lastName
          email
        }
        animalCount
      }
    }
  `,

  TOP_CAT_OWNER: gql`
    query GetTopCatOwner {
      topCatOwner {
        owner {
          id
          firstName
          lastName
          email
        }
        animalCount
      }
    }
  `,

  HEAVIEST_ANIMAL: gql`
    query GetHeaviestAnimal {
      heaviestAnimal {
        id
        name
        species
        breed
        weight
        owner {
          firstName
          lastName
        }
      }
    }
  `,

  OLDEST_ANIMAL: gql`
    query GetOldestAnimal {
      oldestAnimal {
        id
        name
        dateOfBirth
        species
        breed
        owner {
          firstName
          lastName
        }
      }
    }
  `,

  OWNER_WITH_HEAVIEST_PETS: gql`
    query GetOwnerWithHeaviestPets {
      ownerWithHeaviestPets {
        owner {
          id
          firstName
          lastName
          email
        }
        animalCount
        totalWeight
      }
    }
  `,
};
